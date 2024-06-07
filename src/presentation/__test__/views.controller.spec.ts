import { ViewsService } from "../../application/services/views.service"
import { ViewsController } from "../controllers/views.controller"
import { Test, TestingModule } from "@nestjs/testing"
import { Member } from "src/domain/entities/members.entity"
import { Books } from "src/domain/entities/books.entity"

describe('ViewsController', () => {
    let controller: ViewsController
    let viewService: ViewsService

    beforeEach(async () => {
        const memberMockData: Member[] = [
            { code: 'abc', name: 'abc', isPenalized: false, penalizedUntil: null, borrowedBooksNum: 0 },
            { code: 'def', name: 'def', isPenalized: false, penalizedUntil: null, borrowedBooksNum: 1 }
        ]

        const bookMockData: Books[] = [
            { code: 'abc', title: 'abc', author: 'abc', stock: 1 },
            { code: 'def', title: 'def', author: 'def', stock: 1 }
        ]

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ViewsController],
            providers: [
                {
                    provide: ViewsService,
                    useFactory: () => ({
                        showMembers: jest.fn().mockReturnValue(memberMockData),
                        showBooks: jest.fn().mockReturnValue(bookMockData)
                    })
                }
            ]
        }).compile()

        controller = module.get<ViewsController>(ViewsController)
        viewService = module.get<ViewsService>(ViewsService)
    });

    it('should show member data successfully (member actor)', async () => {
        const expectedResult = [
            { code: 'abc', name: 'abc', isPenalized: false, penalizedUntil: null, borrowedBooksNum: 0 },
            { code: 'def', name: 'def', isPenalized: false, penalizedUntil: null, borrowedBooksNum: 1 }
        ]

        const resp = await controller.views('member')

        expect(viewService.showMembers).toHaveBeenCalled()
        expect(resp).toEqual({ message: 'success', result: expectedResult })
    });

    it('should show book data successfully (book actor)', async () => {
        const expectedResult = [
            { code: 'abc', title: 'abc', author: 'abc', stock: 1 },
            { code: 'def', title: 'def', author: 'def', stock: 1 }
        ]

        const resp = await controller.views('book')

        expect(viewService.showBooks).toHaveBeenCalled()
        expect(resp).toEqual({ message: 'success', result: expectedResult })
    });

    it('should throw an error for invalid actor', async () => {
        await expect(controller.views('invalid')).rejects.toThrow(
            'actor must either \'member\' or \'book\''
        )
    })
})