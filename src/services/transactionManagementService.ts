import { ITransactionManagement } from "../entities/transactionManagement";
import { TransactionManagementRepository } from "../repositories/transactionManagementRepository";

export class TransactionManagementService{
    constructor(private transactionManagementRepository: TransactionManagementRepository){

    }

    async borrowBook(userId: number, bookId: number): Promise<ITransactionManagement>{
        return await this.transactionManagementRepository.borrowBook(userId, bookId);
    }

    async checkExistingTransaction(bookId: number){
        return await this.transactionManagementRepository.checkExistingTransaction(bookId);
    }

    async checkUserHasTheBook(userId: number, bookId: number){
        return await this.transactionManagementRepository.checkUserHasTheBook(userId, bookId);
    }

    async updateTransactionForReturn(userId: number, bookId: number, score: number){
        return await this.transactionManagementRepository.updateTransactionForReturn(userId, bookId, score);
    }

    async getBookBasedTransactions(bookId: number){
        let bookInfo = await this.transactionManagementRepository.getBookBasedTransactions(bookId);
        return bookInfo;
    }

    async getUserBorrowedBookList(userId: number){
        let bookList = await this.transactionManagementRepository.getUserBorrowedBookList(userId);
        return bookList;
    }

}