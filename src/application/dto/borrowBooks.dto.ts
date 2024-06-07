import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class BorrowBookDTO{
    @ApiProperty({
        description: 'code dari member',
        type: String,
        default: 'abc'
    })
    @IsNotEmpty({ message: 'memberCode cannot be empty' })
    @IsString({ message: 'memberCode must be a valid string' })
    memberCode: string

    @ApiProperty({
        description: 'code dari book',
        type: String,
        default: 'abc'
    })
    @IsNotEmpty({ message: 'bookCode cannot be empty' })
    @IsString({ message: 'memberCode must be a valid string' })
    bookCode: string
}