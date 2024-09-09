import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginUserDto {
    @IsString()
    @IsEmail()
    public email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(12)
    public password: string;
}