import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import {Profile} from "./profiles/profiles.model";
import { TextsBlockModule } from './texts-block/texts-block.module';
import {TextBlock} from "./texts-block/text-block.model";
import { FilesModule } from './files/files.module';

@Module({
    controllers:[],
    providers:[],
    imports:[
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Profile, TextBlock],
            autoLoadModels: true
        }),
        AuthModule,
        ProfilesModule,
        TextsBlockModule,
        FilesModule
    ]

})
export class AppModule {}