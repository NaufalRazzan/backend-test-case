import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { MemberDocument, MemberMongoSchema } from "../schemas/member.schema";
import { Model } from "mongoose";
import { MembersRepository } from "src/domain/repositories/member.repository";
import { Member } from "src/domain/entities/members.entity";

@Injectable()
export class MemberRepository implements MembersRepository{
    constructor(
        @InjectModel(MemberMongoSchema.name)
        private readonly memberModel: Model<MemberDocument>
    ){}

    async setBorrowedBooks(status: 'borrow' | 'return', memberCode: string): Promise<void>{
        if(status === 'borrow'){
            await this.memberModel.updateOne(
                { code:  memberCode},
                {
                    $inc: { borrowedBooksNum: 1 }
                }
            )
        }
        else{
            await this.memberModel.updateOne(
                { code:  memberCode},
                {
                    $inc: { borrowedBooksNum: -1 }
                }
            )
        }
    }
    async viewMembers(): Promise<Member[]> {
        return await this.memberModel.find()
    }

    async removePenalized(): Promise<void> {
        const today = new Date().toISOString()

        await this.memberModel.updateMany(
            {
                $expr: {
                    $lt: ['$penalizedUntil', today]
                }
            },
            {
                $set: {
                    isPenalized: false,
                    penalizedUntil: null
                }
            }
        )
    }
}