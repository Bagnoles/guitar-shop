import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { BaseController } from '../../libs/rest/controller/index.js';
import { Component, HttpMethod, RequestQuery } from '../../types/index.js';
import { CreateGuitarDto, GuitarRdo, GuitarService, UpdateGuitarDto } from './index.js';
import { Logger } from '../../libs/logger/index.js';
import { fillDTO } from '../../helpers/index.js';
import { PrivateRouteMiddleware, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/middleware/index.js';

@injectable()
export class GuitarController extends BaseController {
    constructor(
        @inject(Component.Logger) protected readonly logger: Logger,
        @inject(Component.GuitarService) private readonly guitarService: GuitarService
    ) {
        super(logger);
        this.addRoute({ 
            path: '/', 
            method: HttpMethod.Get, 
            handler: this.index,
            middlewares: [new PrivateRouteMiddleware()]
        });
        this.addRoute({ 
            path: '/', 
            method: HttpMethod.Post, 
            handler: this.create,
            middlewares: [
                new PrivateRouteMiddleware(), 
                new ValidateDtoMiddleware(CreateGuitarDto)
            ]
        });
        this.addRoute({ 
            path: '/pages', 
            method: HttpMethod.Get, 
            handler: this.getPages
        });
        this.addRoute({ 
            path: '/:guitarId', 
            method: HttpMethod.Patch, 
            handler: this.update,
            middlewares: [
                new PrivateRouteMiddleware(),
                new ValidateObjectIdMiddleware('guitarId'), 
                new ValidateDtoMiddleware(UpdateGuitarDto)
            ]
        });
        this.addRoute({ 
            path: '/:guitarId', 
            method: HttpMethod.Delete, 
            handler: this.delete,
            middlewares: [
                new PrivateRouteMiddleware(),
                new ValidateObjectIdMiddleware('guitarId')
            ]
        });
        this.addRoute({ 
            path: '/:guitarId', 
            method: HttpMethod.Get, 
            handler: this.getInfo,
            middlewares: [
                new PrivateRouteMiddleware(),
                new ValidateObjectIdMiddleware('guitarId')
            ]
        });
    }

    public async index(req: Request<unknown, unknown, unknown, RequestQuery>, res: Response): Promise<void> {
        const guitars = await this.guitarService.findAll(req.query.limit, req.query.page, req.query.sort, req.query.sortDirection);
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

    public async getPages(_req: Request, res: Response): Promise<void> {
        const result = await this.guitarService.getTotalPages();
        this.ok(res, result);
    }
}