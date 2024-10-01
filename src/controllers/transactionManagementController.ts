import { Request, Response } from "express";
import { TransactionManagementService } from "../services/transactionManagementService";
import { UserService } from "../services/userService";
import { BookService } from "../services/bookService";
import { UserRepository } from "../repositories/userRepository";
import { BookRepository } from "../repositories/bookRepository";
import { TransactionManagementRepository } from "../repositories/transactionManagementRepository";

export const borrowBook = async (req: Request, res: Response): Promise<void> =>{
    const userService: UserService = new UserService( new UserRepository());
    const bookService: BookService = new BookService( new BookRepository());
    const transactionManagementService: TransactionManagementService = new TransactionManagementService( new TransactionManagementRepository());
    try{
        let userId = parseInt(req.params.userId);
        let bookId = parseInt(req.params.bookId);

        if (isNaN(userId) || isNaN(bookId)) {
            res.status(400).json({ error: "User ID and Book ID must be numbers" });
            return;
        }

        // Get user and book from db
        let user = await userService.getUser(userId);
        let book = await bookService.getBook(bookId);

        // Check user exists
        if (!user) {
            res.status(404).json({ error: `There is not any user with the ID: ${userId}` });
            return;
        }
    
        // Check book exists
        if (!book) {
            res.status(404).json({ error: `There is not any book with the ID: ${bookId}` });
            return;
        }

        // Check if the book is already borrowed by someone else
        let existingTransaction = await transactionManagementService.checkExistingTransaction(bookId);
        if (existingTransaction) {
            if (existingTransaction.userId === userId) {
              res.status(400).json({ error: "User already has the book." });
              return;
            }
            res.status(400).json({ error: "Book is already borrowed by someone else" });
            return;
        }

        // Create a new transaction and set its borrowedAt with 'now date'
        let createdTransaction = await transactionManagementService.borrowBook(userId, bookId);
        res.status(200).json(createdTransaction);
    }catch(err){
        console.log(err);
        res.status(500).json({err: "An error uccured while trying to borrow book."});
    }
}

export const returnBook = async (req: Request, res: Response): Promise<void> =>{
    const userService: UserService = new UserService( new UserRepository());
    const bookService: BookService = new BookService( new BookRepository());
    const transactionManagementService: TransactionManagementService = new TransactionManagementService( new TransactionManagementRepository());
    try{
        let userId = parseInt(req.params.userId);
        let bookId = parseInt(req.params.bookId);
        let score = parseInt(req.body.score);

        if (isNaN(userId) || isNaN(bookId) || isNaN(score)) {
        res.status(400).json({ error: "User ID, Book ID, and score must be numbers" });
        return;
        }

        // Get user and book from db
        let user = await userService.getUser(userId);
        let book = await bookService.getBook(bookId);

        // Check user exists
        if (!user) {
            res.status(404).json({ error: `There is not any user with the ID: ${userId}` });
            return;
        }
    
        // Check book exists
        if (!book) {
            res.status(404).json({ error: `There is not any book with the ID: ${bookId}` });
            return;
        }

        // Check if the user has the book
        let userHasBook = await transactionManagementService.checkUserHasTheBook(userId, bookId);
        if (!userHasBook) {
            res.status(400).json({ error: "Borrowing record not found." });
            return;
        }

        // Update the transaction for return operation. Set the returnedAt field to the current time and the score
        let updatedTransaction = await transactionManagementService.updateTransactionForReturn(userId, bookId, score);

        res.status(200).json(updatedTransaction);

    }catch(err){
        console.log(err);
        res.status(500).json({err: "An error uccured while trying to return book."});
    }
}