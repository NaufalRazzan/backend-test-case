import { Module } from "@nestjs/common";
import { ApplicationModule } from "src/application/application.module";
import { BorrowBookController } from "./controllers/borrowBooks.controller";
import { ViewsController } from "./controllers/views.controller";

@Module({
    imports: [ApplicationModule],
    controllers: [
        BorrowBookController,
        ViewsController
    ]
})
export class PresentationModule{}