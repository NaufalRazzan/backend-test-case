import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Member } from "../../domain/entities/members.entity";

export type MemberDocument = Member & Document

@Schema()
export class MemberMongoSchema extends Member{
    @Prop({ required: true, unique: true })
    readonly code: string

    @Prop({ required: true, index: true })
    name: string

    @Prop({ default: false })
    isPenalized: boolean

    @Prop({ default: null })
    penalizedUntil: Date

    @Prop({ default: 0 })
    borrowedBooksNum: number

    constructor(
        code: string,
        name: string,
        isPenalized: boolean,
        penalizedUntil: Date,
        borrowedBooksNum: number
    ){
        super(code, name, isPenalized, penalizedUntil, borrowedBooksNum)
    }
}

export const MemberSchema = SchemaFactory.createForClass(MemberMongoSchema)