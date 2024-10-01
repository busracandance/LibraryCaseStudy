import { IBook } from "../entities/book";
import BookModel from "../models/BookModel";
const { v4: uuidv4 } = require('uuid');

export class BookRepository{
    async findAll(): Promise<IBook[]>{
        return await BookModel.findAll({
            attributes: ['id', 'name']
        });
    }

    async findById(bookId: number): Promise<IBook | null>{
        return await BookModel.findByPk(bookId);
    }

    async createBook(name: string): Promise<IBook | null>{
        try{
            let createdBook = await BookModel.create({
                id: parseInt(uuidv4()),
                name: name
            });

            return createdBook;
        }catch(err){
            throw err;
        }
        
    }
}