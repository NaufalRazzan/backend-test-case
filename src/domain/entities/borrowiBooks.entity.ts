export class BorrowBooks{
    constructor(
        public readonly memberCode: string,
        public readonly bookCode: string,
        public borrowDate: Date,
        public returnedDate: Date,
        public status: 'returned' | 'borrowed'
    ){}
}