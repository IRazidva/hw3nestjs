import { Module } from '@nestjs/common';
import { TextsBlockService } from './texts-block.service';
import { TextsBlockController } from './texts-block.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {TextBlock} from "./text-block.model";
import {FilesModule} from "../files/files.module";

@Module({
  providers: [TextsBlockService],
  controllers: [TextsBlockController],
  imports: [SequelizeModule.forFeature([TextBlock]),
      FilesModule
  ]
})
export class TextsBlockModule {}
