import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { TransactionManagementService } from "../services/transactionManagementService";
import { BookRepository } from "../repositories/bookRepository";
import { TransactionManagementRepository } from "../repositories/transactionManagementRepository";

export const createBook = async(req: Request, res: Response): Promise<void> =>{
    const bookService: BookService = new BookService( new BookRepository());
    try{
        let bookName = req.body.name;
        let createdBook = await bookService.createBook(bookName);
        res.status(200).json(createdBook);
    }catch(err){
        console.log(err);
        res.status(500).json({err: "An error uccured while trying to create book."});
    }
}

export const getBookList = async(req: Request, res: Response): Promise<void> =>{
    const bookService: BookService = new BookService( new BookRepository());
    try{
        const bookList = await bookService.getBookList();
        res.status(200).json(bookList);

    }catch(err){
        console.log(err);
        res.status(500).json({err: "An error uccured while trying to get book list."});
    }
}

export const getBook = async(req: Request, res:Response): Promise<void> =>{
    const bookService: BookService = new BookService( new BookRepository());
    const transactionManagementService: TransactionManagementService = new TransactionManagementService( new TransactionManagementRepository());
    try{
        const bookId = parseInt(req.params.id);
        if (isNaN(bookId)) {
            res.status(400).json({ error: 'Book ID must be number' });
            return;
        }

        const book = await bookService.getBook(bookId);
        if (!book) {
            res.status(404).json({ error: "Book not found" });
            return;
        }

        let bookTransactions = await transactionManagementService.getBookBasedTransactions(bookId);

        // Calculation of average score
        const totalScore = bookTransactions.reduce((sum, transaction) => sum + (transaction.score || 0), 0);
        const averageScore = bookTransactions.length > 0 ? (totalScore / bookTransactions.length).toFixed(2) : '-1';


        let responseBody = {
            id: book.id,
            name: book.name,
            score: averageScore

        }
        res.status(200).json(responseBody);

    }catch(err){
        console.log(err);
        res.status(500).json({err: "An error uccured while trying to get book information."});
    }
}
