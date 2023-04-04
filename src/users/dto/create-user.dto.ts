import {IsString} from "class-validator";

export class CreateUserDto{

    @IsString({message: 'email должен быть строкой'})
    readonly email: string;

    @IsString({message: 'Пароль должен быть строкой'})
    readonly password: string;

    @IsString({message: 'Роль должна быть строкой'})
    readonly userRole: string;
}