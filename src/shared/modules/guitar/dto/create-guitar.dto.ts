import { GuitarTypes } from "../../../types/guitar-types.enum.js";

export class CreateGuitarDto {
    public name: string;
    public date: string;
    public photo: string;
    public type: GuitarTypes;
    public article: string;
    public stringsCount: number;
    public price: number;
    public description: string;
}