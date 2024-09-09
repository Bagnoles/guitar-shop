import { IsString, MinLength, MaxLength, IsEnum, IsInt, Min, Max, IsIn } from 'class-validator';
import { GuitarTypes } from "../../../types/guitar-types.enum.js";

export class CreateGuitarDto {
    @IsString()
    @MinLength(10)
    @MaxLength(100)
    public name: string;

    @IsString()
    public photo: string;

    @IsEnum(GuitarTypes)
    public type: GuitarTypes;

    @IsString()
    @MinLength(5)
    @MaxLength(40)
    public article: string;

    @IsIn([4, 6, 7, 12])
    public stringsCount: number;

    @IsInt()
    @Min(100)
    @Max(1000000)
    public price: number;

    @IsString()
    @MinLength(20)
    @MaxLength(1024)
    public description: string;
}