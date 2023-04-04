import {Column, DataType, Model, Table} from "sequelize-typescript";

interface TextBlockCreationAttrs{
    uniqueTitle: string;
    content: string;
    fileImage: string;
    group: string;
}


@Table({tableName: 'text-block'})
export class TextBlock extends Model<TextBlock, TextBlockCreationAttrs > {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    uniqueTitle: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    group: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;


    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.STRING})
    fileImage: string;

    @Column({type: DataType.STRING, unique: true, allowNull: true})
    essenceTable: string;

    @Column({type: DataType.STRING, unique: true, allowNull: true})
    essenceId: string;
}