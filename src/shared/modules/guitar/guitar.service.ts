import { inject, injectable } from "inversify";
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateGuitarDto, GuitarEntity, UpdateGuitarDto } from "./index.js";
import { Component } from "../../types/index.js";
import { Logger } from "../../libs/logger/index.js";
import { DEFAULT_GUITAR_LIMIT, SortDirection, SortType } from "./guitar.const.js";

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

    public async findAll(count: number = DEFAULT_GUITAR_LIMIT, page?: number, sort?: SortType, direction?: SortDirection): Promise<DocumentType<GuitarEntity>[]> {
        const skip = page && count ? (page - 1) * count : undefined;
        if (skip) {
            return this.guitarModel.find().sort({date: SortDirection.Down}).skip(skip).limit(count);
        }
        if (sort && direction) {
            const sortObj = {
                [sort]: +direction as SortDirection
            };
            return this.guitarModel.aggregate([
                { $addFields: {
                    id: { $toString: '$_id'}
                } },
                { $sort: sortObj },
                { $limit: count }
            ]).exec();
        }
        
        return this.guitarModel.find().sort({date: SortDirection.Down}).limit(count);
    }

    public async deleteById(id: string): Promise<DocumentType<GuitarEntity> | null> {
        return this.guitarModel.findByIdAndDelete(id).exec();
    }

    public async getTotalPages() {
        const guitars = await this.guitarModel.find();
        return Math.ceil(guitars.length / DEFAULT_GUITAR_LIMIT);
    }
}