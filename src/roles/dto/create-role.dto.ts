import {IsString} from "class-validator";

export class CreateRoleDto{

    @IsString({message: 'Значение роли должео быть строкой'})
    readonly value: string;
}