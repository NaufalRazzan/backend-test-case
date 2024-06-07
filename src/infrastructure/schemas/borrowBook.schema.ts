import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BorrowBooks } from "../../domain/entities/borrowiBooks.entity";

export type BorrowBooksDocument = BorrowBooks & Document

@Schema()
export class BorrowBooksMongoSchema extends BorrowBooks{
    @Prop({ required: true, unique: true, index: true })
    memberCode: string

    @Prop({ required: true, unique: true, index: true })
    bookCode: string

    @Prop({ index: true })
    borrowDate: Date

    @Prop({ index: true })
    returnedDate: Date

    @Prop({ default: 'borrowed', enum: ['returned', 'borrowed'] })
    status: 'returned' | 'borrowed'

    constructor(
        memberCode: string,
        bookCode: string,
        borrowDate: Date,
        returnedDate: Date,
        status: 'returned' | 'borrowed'
    ){
        super(memberCode, bookCode, borrowDate, returnedDate, status)
    }
}

export const BorrowBooksSchema = SchemaFactory.createForClass(BorrowBooksMongoSchema)