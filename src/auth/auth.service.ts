import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {User} from "../users/users.model";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService) {
    }

    async  login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async  registration( email: string, password: string){
        const candidate = await this.userService.getUserByEmail(email);
        if (candidate) {
            throw new HttpException("Пользователь с таким email уже существует", HttpStatus.BAD_REQUEST)
        }
        const user = await this.userService.createUser(email, password, "USER")
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payLoad = {email: user.email, id: user.id, roles: user.roles, profile: user.profile}
        return {
            token: this.jwtService.sign(payLoad)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const  user = await this.userService.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if(user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный email или пароль'})
    }
}
