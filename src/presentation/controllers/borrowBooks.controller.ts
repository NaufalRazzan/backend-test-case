import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { BorrowBookDTO } from "src/application/dto/borrowBooks.dto";
import { BorrowBooksService } from "src/application/services/borrowBooks.service";

@ApiTags('borrowBook')
@Controller('/borrowBook')
export class BorrowBookController{
    constructor(
        private readonly borrowBookService: BorrowBooksService
    ){}


    @ApiBody({ type: BorrowBookDTO })
    @ApiParam({
        name: 'status',
        type: String,
        description: 'enter status',
        enum: ['borrow', 'return']
    })
    @ApiOkResponse({
        description: 'successful borrowing or returning book',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Post('/:status')
    @UsePipes(new ValidationPipe({ transform: true }))
    async borrowAndReturn(@Param('status') status: string, @Body() body: BorrowBookDTO){
        if(status === 'borrow'){
            await this.borrowBookService.borrowBooks(body.memberCode, body.bookCode)
        }
        else if(status === 'return'){
            await this.borrowBookService.returnBooks(body.memberCode, body.bookCode)
        }
        else throw new BadRequestException("status must either 'borrow' or 'return'")

        return {
            message: 'success'
        }
    }
}