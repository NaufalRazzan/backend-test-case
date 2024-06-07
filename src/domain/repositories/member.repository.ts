import { Member } from "../entities/members.entity";

export abstract class MembersRepository{
    abstract setBorrowedBooks(status: 'borrow' | 'return', memberCode: string): Promise<void>
    abstract viewMembers(): Promise<Member[]>
    abstract removePenalized(): Promise<void>
}