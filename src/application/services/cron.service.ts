import { Injectable } from "@nestjs/common";
import { MemberRepository } from "src/infrastructure/repositories/member.repository";

@Injectable()
export class CronService{
    constructor(
        private memberRepository: MemberRepository
    ){}

    async removePenalized(){
        await this.memberRepository.removePenalized()
    }
}