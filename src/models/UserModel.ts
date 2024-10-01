import { DataTypes, Model, Sequelize } from "sequelize";
import { IUser } from "../entities/user";

class User extends Model<IUser> implements IUser{
    // definite assignment assertion
    public id!: number;
    public name!: string;
}

export const initializeUser = (sequelize: Sequelize) =>{
    User.init ({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    }, {
        tableName: 'users',
        sequelize: sequelize
    });

    return User;
};

export default User;