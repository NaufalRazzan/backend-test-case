import { BorrowBooksService } from "../../application/services/borrowBooks.service"
import { BorrowBookController } from "../controllers/borrowBooks.controller"
import { Test, TestingModule } from "@nestjs/testing"
import { BorrowBookDTO } from "src/application/dto/borrowBooks.dto"

describe('BorrowBookController', () => {
    let controller: BorrowBookController
    let borrowBookService: BorrowBooksService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BorrowBookController],
            providers: [
                {
                    provide: BorrowBooksService,
                    useFactory: () => ({
                        borrowBooks: jest.fn(),
                        returnBooks: jest.fn()
                    })
                }
            ]
        }).compile()

        controller = module.get<BorrowBookController>(BorrowBookController)
        borrowBookService = module.get<BorrowBooksService>(BorrowBooksService)
    });

    it('should borrow a book successfully (borrow status)', async () => {
        const memberCode = 'M001'
        const bookCode = 'JK-45'
        const borrowBookDto: BorrowBookDTO = { memberCode, bookCode }

        await controller.borrowAndReturn('borrow', borrowBookDto)

        expect(borrowBookService.borrowBooks).toHaveBeenCalledWith(memberCode, bookCode)
        expect(await controller.borrowAndReturn('borrow', borrowBookDto)).toEqual({ message: 'success' })
    });

    it('should return a book successfully (return status)', async () => {
        const memberCode = 'M001'
        const bookCode = 'JK-45'
        const borrowBookDto: BorrowBookDTO = { memberCode, bookCode }

        await controller.borrowAndReturn('return', borrowBookDto)

        expect(borrowBookService.returnBooks).toHaveBeenCalledWith(memberCode, bookCode)
        expect(await controller.borrowAndReturn('return', borrowBookDto)).toEqual({ message: 'success' })
    });

    it('should throw an error for invalid status', async () => {
        const memberCode = 'M001'
        const bookCode = 'JK-45'
        const borrowBookDto: BorrowBookDTO = { memberCode, bookCode }

        await expect(controller.borrowAndReturn('invalid', borrowBookDto)).rejects.toThrow(
            'status must either \'borrow\' or \'return\''
        )
    })
})