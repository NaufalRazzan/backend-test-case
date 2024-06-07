import { BorrowBooks } from "../entities/borrowiBooks.entity";

export abstract class BorrowBooksRepository{
    abstract borrowBook(memberCode: string, bookCode: string): Promise<void>
    abstract returnBook(memberCode: string, bookCode: string): Promise<void>
}