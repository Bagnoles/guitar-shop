import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Component } from '../shared/types/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI, getFullServerPath } from '../shared/helpers/index.js';
import { Controller } from '../shared/libs/rest/controller/index.js';

@injectable()
export class RestApplication {
    private readonly server: Express = express();

    constructor (
        @inject(Component.Logger) private readonly logger: Logger,
        @inject(Component.Config) private readonly config: Config<RestSchema>,
        @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
        @inject(Component.GuitarController) private readonly guitarController: Controller,
    ) {}

    private initDb() {
        const mongoUri = getMongoURI({
          username: this.config.get('DB_USER'),
          password: this.config.get('DB_PASSWORD'),
          host: this.config.get('DB_HOST'),
          port: this.config.get('DB_PORT'),
          databaseName: this.config.get('DB_NAME')
        });
    
        return this.databaseClient.connect(mongoUri);
    }

    private async initServer() {
        const port = this.config.get('PORT');
        this.server.listen(port);
    }

    private async initControllers() {
        this.server.use('/guitars', this.guitarController.router);
        this.logger.info('Controller initialization completed');
    }

    private async initMiddlewares() {
        this.server.use(express.json());
    }

    public async init() {
        this.logger.info('Application initialized');
        await this.initDb();
        await this.initMiddlewares();
        await this.initControllers();
        await this.initServer();
        this.logger.info(`Server started on ${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}`);
    }

}