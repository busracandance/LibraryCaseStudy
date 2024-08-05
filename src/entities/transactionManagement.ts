export interface ITransactionManagement{
    id: number,
    userId: number,
    bookId: number,
    score: number | null,
    borrowedAt: Date,
    returnedAt: Date | null
}

export class TransactionManagement implements ITransactionManagement{
    constructor(
        public id: number,
        public userId: number,
        public bookId: number,
        public score: number | null,
        public borrowedAt: Date,
        public returnedAt: Date | null
    ){}
}