import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(1)
    @MaxLength(15)
    public name: string;

    @IsString()
    @IsEmail()
    public email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(12)
    public password: string;
}