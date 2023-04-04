import {Delete, Injectable, Param} from '@nestjs/common';
import {CreateTextBlockDto} from "./dto/create-text-block.dto";
import {InjectModel} from "@nestjs/sequelize";
import {TextBlock} from "./text-block.model";
import {FilesService} from "../files/files.service";
import {where} from "sequelize";

@Injectable()
export class TextsBlockService {

    constructor(@InjectModel(TextBlock) private textBlockRepo: typeof TextBlock,
                private filesService: FilesService) {
    }


    async create(dto: CreateTextBlockDto, fileImage: any) {
        const fileImageName = await this.filesService.createFile(fileImage);
        const block  = await this.textBlockRepo.create({...dto, fileImage: fileImageName})
        return block;
    }

    async deleteTextsBlockByUniqueTitle(title: string){
        const block = await this.textBlockRepo.findOne({where:{title}})
        return block.destroy();
    }


    async deleteTextsBlockDeprecated(){
        const op = require('sequelize')
        const deprecated = this.textBlockRepo.findAll({where:{}})
    }


    async deleteTextsBlockNotUsed(essenceTable: string, essenceID: string) {
        const textBlock = new TextBlock;
        const op = require('sequelize')
            return this.textBlockRepo.destroy({where: {[op.and]:[{"essenceTable": null}, {essenceID: null}]}})
        }


    }



