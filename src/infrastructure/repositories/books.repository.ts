import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BooksRepository } from "src/domain/repositories/books.repository";
import { BooksDocument, BooksMongoSchema } from "../schemas/books.schema";
import { Model } from "mongoose";
import { Books } from "src/domain/entities/books.entity";

@Injectable()
export class BookRepository implements BooksRepository{
    constructor(
        @InjectModel(BooksMongoSchema.name)
        private readonly booksModel: Model<BooksDocument>
    ){}

    async setBookStock(status: 'borrow' | 'return', bookCode: string): Promise<void> {
        if(status === 'borrow'){
            await this.booksModel.updateOne(
                { code: bookCode },
                {
                    $inc: { stock: -1 }
                }
            )
        }
        else{
            await this.booksModel.updateOne(
                { code: bookCode },
                {
                    $inc: { stock: 1 }
                }
            )
        }
    }
    async viewBooks(): Promise<Books[]> {
        return await this.booksModel.find({
            stock: { $gt: 0 }
        })
    }
}