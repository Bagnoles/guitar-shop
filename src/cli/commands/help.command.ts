import { Command } from "./command.interface.js";
import { CommandName } from "./commands.enum.js";


export class HelpCommand implements Command {
    public getName(): string {
        return CommandName.Help;
    }

    public execute(..._parameters: string[]): void {
        console.info(`
            Программа для начального заполнения базы данных тестовыми данными.

            Пример: 'npm run cli -- --<command> [--arguments]'

            Команды:
            ${CommandName.Help}:                                    # печатает этот текст
            ${CommandName.Generate} <n> <connection string>:        # заполняет базу данных (n - количество товаров, connection string — строка с параметрами для подключения к базе данных)

            Пример connection string:
            mongodb://[username]:[password]@[host]:[port]/[databaseName]?authSource=admin
    
        `);
    }
}