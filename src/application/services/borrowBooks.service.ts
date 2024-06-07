import { Injectable } from "@nestjs/common";
import { BookRepository } from "../../infrastructure/repositories/books.repository";
import { BorrowBookRepository } from "../../infrastructure/repositories/borrowBook.repository";
import { MemberRepository } from "../../infrastructure/repositories/member.repository";

@Injectable()
export class BorrowBooksService{
    constructor(
        private readonly borrowBooksRepository: BorrowBookRepository,
        private readonly memberRepository: MemberRepository,
        private readonly bookRepository: BookRepository
    ){}

    async borrowBooks(memberCode: string, bookCode: string){
        await this.borrowBooksRepository.borrowBook(memberCode, bookCode)
        await this.memberRepository.setBorrowedBooks('borrow', memberCode)
        await this.bookRepository.setBookStock('borrow', bookCode)
    }

    async returnBooks(memberCode: string, bookCode: string){
        await this.borrowBooksRepository.returnBook(memberCode, bookCode)
        await this.memberRepository.setBorrowedBooks('return', memberCode)
        await this.bookRepository.setBookStock('return', bookCode)
    }
}