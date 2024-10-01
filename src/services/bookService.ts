import { IBook } from "../entities/book";
import { BookRepository } from "../repositories/bookRepository";

export class BookService{
    constructor(private bookRepository: BookRepository){

    }

    // Get all books
    async getBookList(): Promise<IBook[]>{
        try{
            return await this.bookRepository.findAll();
        }catch(err){
            console.log("BookService getBookList(): ", err);
            throw err;
        }
    }

    // Get book with book ID. If book does not found it returns null.
    async getBook(bookId: number): Promise<IBook | null>{
        try{
            let dbBook = await this.bookRepository.findById(bookId);
            if(!dbBook){
                return null;
            }
            let book = {
                id: dbBook.id,
                name: dbBook.name
            }
            return book;
        }catch(err){
            console.log("BookService getBook(): ", err);
            throw err;
        }
    }

    // Create book. It returns created book info.
    async createBook(name: string): Promise<IBook | null>{
        try{
            return await this.bookRepository.createBook(name);
        }catch(err){
            console.log("BookService createBook(): ", err);
            throw err;
        }
    }
}