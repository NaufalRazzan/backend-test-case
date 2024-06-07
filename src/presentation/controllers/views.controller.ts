import { BadRequestException, Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { ViewsService } from "../../application/services/views.service";

@ApiTags('views')
@Controller('/views')
export class ViewsController{
    constructor(
        private readonly viewsService: ViewsService
    ){}

    @ApiParam({
        name: 'actor',
        type: String,
        description: 'enter actor',
        enum: ['member', 'book']
    })
    @ApiOkResponse({
        description: 'successful fetching based on actor',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                result: {
                    oneOf: [
                        { type: 'array' },
                        { type: 'string' }
                    ]
                }
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get('/:actor')
    async views(@Param('actor') actor: string){
        if(actor === 'member'){
            return {
                message: 'success',
                result: await this.viewsService.showMembers()
            }
        }
        else if(actor === 'book'){
            return {
                message: 'success',
                result: await this.viewsService.showBooks()
            }
        }
        else throw new BadRequestException("actor must either 'member' or 'book'")
    }
}