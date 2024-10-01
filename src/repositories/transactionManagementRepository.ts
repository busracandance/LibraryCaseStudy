import { ITransactionManagement } from "../entities/transactionManagement";
import db from "../models/index";
import Book from "../models/BookModel";
import transactionManagementModel from "../models/TransactionManagementModel";
import { Op} from 'sequelize';
const { v4: uuidv4 } = require('uuid');

export class TransactionManagementRepository{
    async borrowBook(userId: number, bookId: number): Promise<ITransactionManagement>{
        try{
            let borrowTransaction = await transactionManagementModel.create({
                id: parseInt(uuidv4()),
                userId: userId,
                bookId: bookId,
                borrowedAt: new Date(),
                returnedAt: null,
                score: null
            });
            return borrowTransaction;
        }catch(err){
            console.log("TransactionManagementRepository borrowBook(): ", err);
            throw err;
        }

    }

    // Check if the book is already borrowed by someone else
    async checkExistingTransaction(bookId: number): Promise<ITransactionManagement | null>{
        try{
            let transaction = await transactionManagementModel.findOne({
                where: {
                    bookId: bookId,
                    returnedAt: null,
                }
            });

            // If there is no record return null
            if(!transaction){
                return null;
            }

            let transactionRecord = {
                id: transaction.id,
                userId: transaction.userId,
                bookId: transaction.bookId,
                score: transaction.score,
                borrowedAt: transaction.borrowedAt,
                returnedAt: transaction.returnedAt

            };
            return transactionRecord;
            
        }catch(err){
            console.log("TransactionManagementRepository checkExistingTransaction(): ", err);
            throw err;
        }
    }

    async checkUserHasTheBook(userId: number, bookId: number): Promise<ITransactionManagement | null>{
        try{
            let transaction = await transactionManagementModel.findOne({
                where: {
                    userId: userId,
                    bookId: bookId,
                    returnedAt: null,
                }
            });

            // If there is no record return null
            if(!transaction){
                return null;
            }

            let transactionRecord = {
                id: transaction.id,
                userId: transaction.userId,
                bookId: transaction.bookId,
                score: transaction.score,
                borrowedAt: transaction.borrowedAt,
                returnedAt: transaction.returnedAt

            };
            return transactionRecord;

        }catch(err){
            console.log("TransactionManagementRepository checkUserHasTheBook(): ", err);
            throw err;
        }
    }

    async updateTransactionForReturn(userId: number, bookId: number, score: number){
        try{
            let updatedTransaction = await transactionManagementModel.update({
                returnedAt: new Date(),
                score: score,
            },{
                where: {
                    userId: userId,
                    bookId: bookId,
                    returnedAt: null, 
                }
            });

            if(!updatedTransaction){
                return null;
            }
            return updatedTransaction;
        }catch(err){
            console.log("TransactionManagementRepository updateTransactionForReturn(): ", err);
            throw err;
        }
    }

    async getBookBasedTransactions(bookId: number){
        try{
            let transactionListFromDb = await transactionManagementModel.findAll({
                where:{ 
                    bookId: bookId,
                    score: { [Op.ne]: null }
                },
                include: db.Book,
                attributes: ['score']
            });
            
            if(!transactionListFromDb){
                return [];
            }
            
            let transactionList = [];
            if(transactionListFromDb.length > 0){
                for(let i in  transactionListFromDb){
                    let book = {
                        score: transactionListFromDb[i].score
                    }
                    transactionList.push(book);
                }

            }
            return transactionList;

        }catch(err){
            console.log("TransactionManagementRepository getBookBasedTransactions(): ", err);
            throw err;
        }
    }

    async getUserBorrowedBookList(userId: number){
        try{
            let transactionListFromDb = await transactionManagementModel.findAll({
                where:{ 
                    userId: userId
                },
                include: db.Book
            });
            
            if(!transactionListFromDb){
                return [];
            }
            
            let transactionList = [];
            if(transactionListFromDb.length > 0){
                for(let i in  transactionListFromDb){
                    let book = {
                        userId: transactionListFromDb[i].userId,
                        bookId: transactionListFromDb[i].bookId,
                        bookName: (transactionListFromDb[i] as any).Book.name,
                        score: transactionListFromDb[i].score,
                        returnedAt: transactionListFromDb[i].returnedAt,
                    }
                    transactionList.push(book);
                }

            }
            return transactionList;
        }catch(err){
            console.log("TransactionManagementRepository getUserBorrowedBookList(): ", err);
            throw err;
        }
    }

}