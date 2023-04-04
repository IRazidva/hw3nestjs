import {forwardRef, Module} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Profile} from "./profiles.model";
import {User} from "../users/users.model";
import {UsersModule} from "../users/users.module";
import {UsersService} from "../users/users.service";
import {RolesService} from "../roles/roles.service";
import {RolesModule} from "../roles/roles.module";
import {Role} from "../roles/roles.model";

@Module({
  providers: [ProfilesService, UsersService],

  controllers: [ProfilesController],
  imports: [
      SequelizeModule.forFeature([Profile, User, Role]),
        RolesModule,
        UsersModule
        ],
  exports: [ProfilesService]

})
export class ProfilesModule {
}
