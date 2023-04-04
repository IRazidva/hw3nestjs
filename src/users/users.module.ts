import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {Profile} from "../profiles/profiles.model";
import {ProfilesModule} from "../profiles/profiles.module";
import {JwtService} from "@nestjs/jwt";
import {ProfilesService} from "../profiles/profiles.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtService ],
  imports: [
      SequelizeModule.forFeature([User, Role]),
      RolesModule
  ],
    exports:[UsersService]
})
export class UsersModule {}
