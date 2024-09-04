import { MongoDatabaseClient } from "../../shared/libs/database-client/mongo.database-client.js";
import { PinoLogger } from "../../shared/libs/logger/pino-logger.js";
import { GuitarGenerator } from "../../shared/libs/product-generator/index.js";
import { GuitarModel, GuitarService } from "../../shared/modules/guitar/index.js";
import { Guitar } from "../../shared/types/guitar.type.js";
import { Command } from "./command.interface.js";
import { CommandName } from "./commands.enum.js";

export class GenerateCommand implements Command {
    private data: Guitar[];
    private logger = new PinoLogger();
    private databaseClient = new MongoDatabaseClient(this.logger);
    private guitarService = new GuitarService(this.logger, GuitarModel);

    private generateData(amount: number) {
        const guitarGenerator = new GuitarGenerator();
        this.data = guitarGenerator.generate(amount);
    }

    private async saveGuitarRecord(data: Guitar) {
        await this.guitarService.create(data);
    }

    public getName(): string {
        return CommandName.Generate;
    }

    public async execute(...parameters: string[]): Promise<void> {
        const [count, connectionString] = parameters;
        this.generateData(+count);
        await this.databaseClient.connect(connectionString);
        this.data.forEach((item) => this.saveGuitarRecord(item));
        //this.databaseClient.disconnect();
    }
}