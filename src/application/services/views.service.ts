import { Injectable } from "@nestjs/common";
import { BookRepository } from "../../infrastructure/repositories/books.repository";
import { MemberRepository } from "../../infrastructure/repositories/member.repository";

@Injectable()
export class ViewsService{
    constructor(
        private readonly memberRepository: MemberRepository,
        private readonly bookRepository: BookRepository
    ){}

    async showMembers(){
        return await this.memberRepository.viewMembers()
    }

    async showBooks(){
        return await this.bookRepository.viewBooks()
    }
}