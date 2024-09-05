import { Expose } from 'class-transformer';
import { GuitarTypes } from '../../../types/index.js';

export class GuitarRdo {
    @Expose()
    public id: string;

    @Expose()
    public name: string;

    @Expose()
    public date: string;

    @Expose()
    public photo: string;

    @Expose()
    public type: GuitarTypes;

    @Expose()
    public article: string;

    @Expose()
    public stringsCount: number;

    @Expose()
    public price: number;

    @Expose()
    public description: string;
}