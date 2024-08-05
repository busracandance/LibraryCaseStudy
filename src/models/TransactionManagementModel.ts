import { DataTypes, Model, Sequelize } from "sequelize";
import { ITransactionManagement } from "../entities/transactionManagement";

class TransactionManagement extends Model<ITransactionManagement> implements ITransactionManagement{
    public id!: number;
    public userId!: number;
    public bookId!: number;
    public borrowedAt!: Date;
    public returnedAt!: Date | null;
    public score!: number | null;
    
}

export const initializeTransactionManagement = (sequelize: Sequelize) => {
    TransactionManagement.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        borrowedAt: {
            type: new DataTypes.DATE(),
            allowNull: false
        },
        returnedAt: {
            type: new DataTypes.DATE(),
            allowNull: true,
            defaultValue: null
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: null
        }
    },
    {
        tableName: 'transactions',
        sequelize: sequelize
    });

    return TransactionManagement;
};

export default TransactionManagement;