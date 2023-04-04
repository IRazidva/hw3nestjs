import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {Roles} from "./roles-auth.decorator";
import {RolesGuard} from "./roles.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){
    }

    @Post('/login')
    login(@Body() userDto: CreateUserDto){
        return this.authService.login(userDto)
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        // return this.authService.registration(userDto)
        return this.authService.registration(userDto.email, userDto.password)
    }
}
