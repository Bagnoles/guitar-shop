import { inject, injectable } from "inversify";
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateGuitarDto, GuitarEntity, UpdateGuitarDto } from "./index.js";
import { Component } from "../../types/index.js";
import { Logger } from "../../libs/logger/index.js";


@injectable()
export class GuitarService {
    constructor(
        @inject(Component.Logger) private readonly logger: Logger,
        @inject(Component.GuitarModel) private readonly guitarModel: types.ModelType<GuitarEntity>
    ) {}

    public async create(dto: CreateGuitarDto): Promise<DocumentType<GuitarEntity> | null> {
        const result = await this.guitarModel.create(dto);
        this.logger.info(`A new record was successfully created`);
        return result;
    }

    public async findById(id: string): Promise<DocumentType<GuitarEntity> | null> {
        return this.guitarModel.findById(id);
    }

    public async updateById(userId: string, dto: UpdateGuitarDto): Promise<DocumentType<GuitarEntity> | null> {
        return this.guitarModel.findByIdAndUpdate(userId, dto, { new: true });
    }

    public async findAll(): Promise<DocumentType<GuitarEntity>[]> {
        return this.guitarModel.find();
    }

    public async deleteById(id: string): Promise<DocumentType<GuitarEntity> | null> {
        return this.guitarModel.findByIdAndDelete(id).exec();
    }
}