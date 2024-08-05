import { DataTypes, Model, Sequelize } from "sequelize";
import { IBook } from "../entities/book";

class Book extends Model<IBook> implements IBook{
    id!: number;
    name!: string;
}

export const initializeBook = (sequelize: Sequelize) =>{
    Book.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    },
    {
        tableName: 'books',
        sequelize: sequelize
    });

    return Book;
};

export default Book;