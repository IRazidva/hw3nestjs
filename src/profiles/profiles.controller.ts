import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {CreateProfileDto} from "./dto/create-profile.dto";
import {ProfilesService} from "./profiles.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('profiles')
export class ProfilesController {

    constructor(private profilesService:ProfilesService) {}

    @Post()
    create(@Body() profileDto: CreateProfileDto){
        return this.profilesService.createProfile(profileDto);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAllProfiles(){
        return this.profilesService.getAllProfiles();
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    getProfileByUserId(@Param('id') id: number){
        return this.profilesService.getProfileById(id);
    }
}
