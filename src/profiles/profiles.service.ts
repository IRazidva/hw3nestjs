import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Profile} from "./profiles.model";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {UsersService} from "../users/users.service";
import {User} from "../users/users.model";

@Injectable()
export class ProfilesService {
    constructor(@InjectModel(Profile) private profileRepo: typeof Profile,
                private usersService: UsersService) {}


    async createProfile(dto: CreateProfileDto){
        if(await this.usersService.getUserByEmail(dto.email)){
            throw new HttpException('Пользователь уже существует', HttpStatus.FOUND);
        }
        const user: User = await this.usersService.createUser(dto.email, dto.password, dto.userRole);
        const profile: Profile = await this.profileRepo.create({...dto,userId: user.id});
        return profile;
    }

    async getAllProfiles(){
        const profiles = await this.profileRepo.findAll({include: {all: true}});
        return profiles;
    }

    async getProfileById(id: number){
        const profile = await this.profileRepo.findOne({where:{id}, include:{all: true}})
        return profile;
    }

    async getProfileByUsersId(id: number){
        const profile = await this.profileRepo.findOne({where:{id}, include:{all: true}})
        return profile;
    }
}