export class Books{
    constructor(
        public readonly code: string,
        public title: string,
        public author: string,
        public stock: number
    ){}
}