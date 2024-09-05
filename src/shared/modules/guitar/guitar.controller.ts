import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { BaseController } from '../../libs/rest/controller/index.js';
import { Component, HttpMethod } from '../../types/index.js';
import { CreateGuitarDto, GuitarRdo, GuitarService, UpdateGuitarDto } from './index.js';
import { Logger } from '../../libs/logger/index.js';
import { fillDTO } from '../../helpers/index.js';

@injectable()
export class GuitarController extends BaseController {
    constructor(
        @inject(Component.Logger) protected readonly logger: Logger,
        @inject(Component.GuitarService) private readonly guitarService: GuitarService
    ) {
        super(logger);
        this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
        this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
        this.addRoute({ path: '/:guitarId', method: HttpMethod.Patch, handler: this.update });
        this.addRoute({ path: '/:guitarId', method: HttpMethod.Delete, handler: this.delete });
        this.addRoute({ path: '/:guitarId', method: HttpMethod.Get, handler: this.getInfo });
    }

    public async index(_req: Request, res: Response): Promise<void> {
        const guitars = await this.guitarService.findAll();
        this.ok(res, fillDTO(GuitarRdo, guitars));
    }

    public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateGuitarDto>, res: Response): Promise<void> {
        const result = await this.guitarService.create(body);
        this.created(res, fillDTO(GuitarRdo, result));
    }

    public async update({body, params}: Request<Record<string, string>, Record<string, unknown>, UpdateGuitarDto>, res: Response): Promise<void> {
        const result = await this.guitarService.updateById(params.guitarId, body);
        this.ok(res, fillDTO(GuitarRdo, result));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const result = await this.guitarService.deleteById(req.params.guitarId);
        this.noContent(res, result);
    }

    public async getInfo(req: Request, res: Response): Promise<void> {
        const result = await this.guitarService.findById(req.params.guitarId);
        this.ok(res, fillDTO(GuitarRdo, result));
    }
}