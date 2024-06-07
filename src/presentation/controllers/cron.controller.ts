import { Controller } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { CronService } from "src/application/services/cron.service";

@Controller()
export class CronController{
    constructor(
        private readonly cronService: CronService
    ){}

    @Cron(CronExpression.EVERY_3_HOURS)
    async removePenalized(){
        await this.cronService.removePenalized()
    }
}