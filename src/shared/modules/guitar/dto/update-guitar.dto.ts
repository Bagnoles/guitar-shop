import { IsString, MinLength, MaxLength, IsEnum, IsInt, Min, Max, IsIn, IsOptional } from 'class-validator';
import { GuitarTypes } from "../../../types/guitar-types.enum.js";

export class UpdateGuitarDto {
    @IsOptional()
    @IsString()
    @MinLength(10)
    @MaxLength(100)
    public name?: string;

    @IsOptional()
    @IsString()
    public photo?: string;

    @IsOptional()
    @IsEnum(GuitarTypes)
    public type?: GuitarTypes;

    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(40)
    public article?: string;

    @IsOptional()
    @IsIn([4, 6, 7, 12])
    public stringsCount?: number;

    @IsOptional()
    @IsInt()
    @Min(100)
    @Max(1000000)
    public price?: number;

    @IsOptional()
    @IsString()
    @MinLength(20)
    @MaxLength(1024)
    public description?: string;
}