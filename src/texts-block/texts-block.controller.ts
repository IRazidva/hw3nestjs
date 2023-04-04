import {Body, Controller, Delete, Param, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {CreateTextBlockDto} from "./dto/create-text-block.dto";
import {TextsBlockService} from "./texts-block.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('texts-block')
export class TextsBlockController {

    constructor(private textBlockService: TextsBlockService) {
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @UseInterceptors(FileInterceptor('fileImage'))
    @Post()
    createTextBlock(@Body() dto: CreateTextBlockDto,
                    @UploadedFile() fileImage) {
        return this.textBlockService.create(dto, fileImage)

    }

    @Delete(':title')
    deleteTextsBlockByTitle(@Param('title') title: string){
        return this.textBlockService.deleteTextsBlockByUniqueTitle(title);
    }




}
