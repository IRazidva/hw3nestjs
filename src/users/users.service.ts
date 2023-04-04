import {HttpException, HttpStatus, Injectable, UseGuards} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {ProfilesService} from "../profiles/profiles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {Role} from "../roles/roles.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";





@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepo: typeof User,
                private roleService: RolesService) {}


    async createUser(email: string, password: string, userRole: string) {
        const user = new User()
        user.email = email
        user.password = password
        await user.hashPassword()
        const role: Role = await this.roleService.getRoleByValue(userRole)
        await user.$set('roles', [role.id])
        user.roles = [role]
        await this.userRepo.create({...user , email: user.email, password: user.password/*, [role]: user.roles*/})
        return user
    }

    async getAllUsers(){
        const users = await this.userRepo.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string){
        const user = await this.userRepo.findOne({where:{email}, include: {all: true}})
        return user;
    }

    async deleteUserByEmail(email: string){
        const user = await this.userRepo.findOne({where:{email}, include: {all: true}})
        return await user.destroy();

    }

   async addRole(dto: AddRoleDto){
        const user = await this.userRepo.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if(role && user){
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

}
