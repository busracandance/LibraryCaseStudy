import { IUser } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";

export class UserService{
    constructor(private userRepository: UserRepository){
    }

    // Get all users.
    async getUserList(): Promise<IUser[]>{
        try{
            return await this.userRepository.findAll();
        }catch(err){
            console.log("UserService getUserList(): ", err);
            throw err;
        }
    }

    // Get user with user ID. If user does not found it returns null.
    async getUser(userId: number): Promise<IUser | null>{
        try{
            let dbUser = await this.userRepository.findById(userId);
            if(!dbUser){
                return null;
            }
            let user = {
                id: dbUser.id,
                name: dbUser.name
            }
            return user;
        }catch(err){
            console.log("UserService getUser(): ", err);
            throw err;
        }
         
    }

    // Create user. It returns created user info.
    async createUser(name: string): Promise<IUser | null>{
        try{
            return await this.userRepository.createUser(name);
            
        }catch(err){
            console.log("UserService createUser(): ", err);
            throw err;
        }
        
    }

}