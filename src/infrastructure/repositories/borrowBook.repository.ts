import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BorrowBooksRepository } from "src/domain/repositories/borrowBooks.repository";
import { BorrowBooksDocument, BorrowBooksMongoSchema } from "../schemas/borrowBook.schema";
import { Model } from "mongoose";
import { BorrowBooks } from "src/domain/entities/borrowiBooks.entity";
import { BooksDocument, BooksMongoSchema } from "../schemas/books.schema";
import { MemberDocument, MemberMongoSchema } from "../schemas/member.schema";

@Injectable()
export class BorrowBookRepository implements BorrowBooksRepository{
    constructor(
        @InjectModel(BorrowBooksMongoSchema.name)
        private readonly borrowBooksModel: Model<BorrowBooksDocument>,
        @InjectModel(BooksMongoSchema.name)
        private readonly bookModel: Model<BooksDocument>,
        @InjectModel(MemberMongoSchema.name)
        private readonly memberModel: Model<MemberDocument>
    ){}

    async borrowBook(memberCode: string, bookCode: string): Promise<void> {
        // cek stok buku > 0
        const book = await this.bookModel.findOne({ code: bookCode })
        if(!book) throw new BadRequestException('incorrect book code')
        if(book.stock === 0){
            throw new NotFoundException(`book's stock for ${book.title} is empty`)
        }

        // cek member kena skors lewat balikin buku
        const member = await this.memberModel.findOne({ code: memberCode })
        if(!member) throw new BadRequestException('incorrect member code')
        if(member.isPenalized){
            throw new ForbiddenException(`member ${member.name} is penalized and cannot borrow new book`)
        }

        const today = new Date()

        const payload: BorrowBooks = {
            memberCode: memberCode,
            bookCode: bookCode,
            borrowDate: new Date(),
            returnedDate: new Date(today.setDate(today.getDate() + 7)),
            status: 'borrowed'
        }

        await this.borrowBooksModel.create(payload)
    }

    async returnBook(memberCode: string, bookCode: string): Promise<void> {
        const today = new Date()

        const res = await this.borrowBooksModel.findOneAndUpdate(
            {
                $and: [
                    { memberCode: memberCode },
                    { bookCode: bookCode }
                ]
            },
            {
                $set: { status: 'returned' }
            }
        )

        if(!res) throw new BadRequestException(`book with member code ${memberCode} and book code ${bookCode} does not exists`)
        if(res.returnedDate < today){ // set kena skors
            await this.memberModel.updateOne(
                { code: memberCode },
                {
                    $set: {
                        isPenalized: true,
                        penalizedUntil: new Date(today.setDate(today.getDate() + 3))
                    }
                }
            )
        }
    }
}