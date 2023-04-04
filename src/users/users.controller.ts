import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {JwtAuthGuard} from "../auth/jwt-auth-guard";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}


    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.userService.createUser(userDto.email, userDto.password, userDto.userRole);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAllUsers(){
        return this.userService.getAllUsers();
    }

    @Delete(':email')
    deleteUserByEmail(@Param('email') email: string){
        return this.userService.deleteUserByEmail(email);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto){
        return this.userService.addRole(dto);
    }
}
