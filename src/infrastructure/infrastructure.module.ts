import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MemberMongoSchema, MemberSchema } from "./schemas/member.schema";
import { BooksMongoSchema, BooksSchema } from "./schemas/books.schema";
import { BorrowBooksMongoSchema, BorrowBooksSchema } from "./schemas/borrowBook.schema";
import { BorrowBookRepository } from "./repositories/borrowBook.repository";
import { MemberRepository } from "./repositories/member.repository";
import { BookRepository } from "./repositories/books.repository";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: MemberMongoSchema.name,
                schema: MemberSchema
            },
            {
                name: BooksMongoSchema.name,
                schema: BooksSchema
            },
            {
                name: BorrowBooksMongoSchema.name,
                schema: BorrowBooksSchema
            }
        ])
    ],
    providers: [
        BorrowBookRepository,
        MemberRepository,
        BookRepository
    ],
    exports: [
        BorrowBookRepository,
        MemberRepository,
        BookRepository
    ]
})
export class InfrastructureModule{}