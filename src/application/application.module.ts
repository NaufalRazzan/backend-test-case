import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { BorrowBooksService } from "./services/borrowBooks.service";
import { ViewsService } from "./services/views.service";
import { CronService } from "./services/cron.service";

@Module({
    imports: [
        InfrastructureModule
    ],
    providers: [
        BorrowBooksService,
        ViewsService,
        CronService
    ],
    exports: [
        BorrowBooksService,
        ViewsService,
        CronService
    ]
})
export class ApplicationModule{}