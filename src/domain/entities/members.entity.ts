export class Member {
    constructor(
        public readonly code: string,
        public name: string,
        public isPenalized: boolean = false,
        public penalizedUntil: Date,
        public borrowedBooksNum: number = 0
    ){}
}