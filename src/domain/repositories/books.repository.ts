import { Books } from "../entities/books.entity";

export abstract class BooksRepository{
    abstract setBookStock(status: 'borrow' | 'return', bookCode: string): Promise<void>
    abstract viewBooks(): Promise<Books[]>
}