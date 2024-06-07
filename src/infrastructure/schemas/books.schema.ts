import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Books } from "../../domain/entities/books.entity";

export type BooksDocument = Books & Document

@Schema()
export class BooksMongoSchema extends Books{
    @Prop({ required: true, unique: true })
    readonly code: string

    @Prop({ required: true, index: true })
    title: string

    @Prop()
    author: string

    @Prop()
    stock: number

    constructor(
        code: string,
        title: string,
        author: string,
        stock: number
    ){
        super(code, title, author, stock)
    }
}

export const BooksSchema = SchemaFactory.createForClass(BooksMongoSchema)