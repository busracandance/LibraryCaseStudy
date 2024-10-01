import { IUser } from "../entities/user";
import UserModel from "../models/UserModel";

const { v4: uuidv4 } = require('uuid');

export class UserRepository{
    async findAll(): Promise<IUser[]>{
        try{
            return await UserModel.findAll({ 
                attributes: ['id', 'name'] 
            });
        }catch(err){
            console.log("UserRepository findAll(): ", err);
            throw err;
        }
    }

    async findById(userId: number): Promise<IUser | null>{
        try{
            return await UserModel.findByPk(userId, {
                attributes: ['id', 'name']
            });
             
        }catch(err){
            console.log("UserRepository findById(): ", err);
            throw err;
        }
    }

    async createUser(name: string): Promise<IUser | null>{
        try{
            let createdUser = await UserModel.create({
                id: parseInt(uuidv4()),
                name: name
            });

            return createdUser;
        }catch(err){
            console.log("UserRepository createUser(): ", err);
            throw err;
        }
        
    }
}