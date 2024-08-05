import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { TransactionManagementService } from "../services/transactionManagementService";
import { IUser } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";
import { TransactionManagementRepository } from "../repositories/transactionManagementRepository";
import { BookService } from "../services/bookService";
import { BookRepository } from "../repositories/bookRepository";

export const createUser = async (req: Request, res: Response) =>{
    const userService: UserService = new UserService( new UserRepository());
    try{
        let userName = req.body.name;
        let createdUser = await userService.createUser(userName);
        res.status(200).json(createdUser);
    }catch(err){
        console.log(err);
        res.status(500).json({err: "An error uccured while trying to create user."});
    }
}

export const getUserList = async (req: Request, res: Response) =>{
    const userService: UserService = new UserService( new UserRepository());
    try{
        let userList = await userService.getUserList();
        res.status(200).json(userList);
    }catch(err){
        console.log(err);
        res.status(500).json({err: "An error uccured while trying to get user list."});
    }
}

// no history - with history ayrımının yapılması lazım
export const getUser = async (req: Request, res:Response) =>{
    const userService: UserService = new UserService( new UserRepository());
    const transactionManagementService: TransactionManagementService = new TransactionManagementService( new TransactionManagementRepository());

    let userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        res.status(400).json({ error: 'User ID must be number' });
        return;
    }

    try{
        let user = await userService.getUser(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        let borrowedBookList = await transactionManagementService.getUserBorrowedBookList(userId);
        let presentBorrowedBooks: Object[] = [];
        let pastBorrowedBooks: Object[] = [];
        if(borrowedBookList){
            for(let borrowedBook of borrowedBookList){
                let book = {};

                // If isReturnedBook it should be in pastBorrowedBookList 
                let isReturnedBook = borrowedBook.returnedAt ? true : false; 
                if(isReturnedBook){
                    book = {
                        name: borrowedBook.bookName,
                        userScore: borrowedBook.score ? borrowedBook.score : null
                    }
                    pastBorrowedBooks.push(book);
                }else{
                    book = {
                        name: borrowedBook.bookName,
                        userScore: borrowedBook.score ? borrowedBook.score : null
                    }
                    presentBorrowedBooks.push(book);
                }
            }
        }

        let responseBody = {
            id: user.id,
            name: user.name,
            books:{
                past: pastBorrowedBooks,
                present: presentBorrowedBooks
            }

        }
        res.status(200).json(responseBody);

    }catch(err){
        console.log(err);
        res.status(500).json({err: "An error uccured while trying to get user information."});
    }
}