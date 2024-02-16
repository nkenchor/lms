import { Db as Database, Collection } from 'mongodb';
import { User } from "../../../core/domain/model/user.model"; // Adjust the import path as necessary
import { UserRepositoryPort } from "../../../port/repository-port/user.repository.port"; // Adjust the import path

import bcrypt from "bcrypt"
import { CreateUserDto, LoginUserDto } from '../../../core/domain/dto/user.dto';
import { AppError, ErrorType } from '../../helper/error.helper';
import { logEvent } from '../../middleware/log.middleware';

export class UserRepository implements UserRepositoryPort {
  private database: Database;
  private collectionName = 'users';

  constructor(database: Database) {
    this.database = database;
  }

  private getCollection(): Collection<User> {
    return this.database.collection<User>(this.collectionName);
  }

 
async createUser(userDto: CreateUserDto): Promise<User> {
    // Check if the user already exists
    const existingUser = await this.getCollection().findOne({ username: userDto.username });
    if (existingUser) {
         // Create a custom error message using your error helper
        logEvent("ERROR", `User already exists with username: ${userDto.username}`)
        throw new AppError(ErrorType.ConflictError,`User already exists with username: ${userDto.username}`);
        
    }

    // Hash the password
    const saltRounds = 10; // Or another number you prefer
    const hashedPassword = await bcrypt.hash(userDto.password, saltRounds);

    // Assuming User class can take CreateUserDto and handle password internally
    const newUser = new User({
        ...userDto,
        password: hashedPassword, // Replace plain password with hashed
    });

    // Insert the new user into the database
    const result = await this.getCollection().insertOne(newUser);
    if (!result.acknowledged) {
        logEvent("ERROR", `failed to create user with username: ${userDto.username}`)
        throw new AppError(ErrorType.ServerError,`failed to create user with username: ${userDto.username}`);

    }

    // Return the created user, omitting the password
    const createdUser = await this.getCollection().findOne({ username: userDto.username });
    if (!createdUser) {
      logEvent("ERROR", `failed to get user with username: ${userDto.username}`)
      
      throw new AppError(ErrorType.ServerError,`failed to create user with username: ${userDto.username}`);
    }
    
    // Assuming the User class or the DTO doesn't directly expose password, or you have a method to sanitize output
    const userToReturn = { ...createdUser, password: '' }; // make password empty here
    return userToReturn;
}

async loginUser(userDto: LoginUserDto): Promise<boolean> {
    const user = await this.getCollection().findOne({ username : userDto.username});
    if (!user) {
      logEvent("ERROR", `user not found with username: : ${userDto.username}`)
      throw new AppError(ErrorType.InvalidUser,`user not found with username: ${userDto.username}`);
    }
    
    // Verify the hashed password
    const passwordIsValid = await bcrypt.compare(userDto.password, user.password);
    if (!passwordIsValid) {
      logEvent("ERROR", `invalid credentials`)
      throw new AppError(ErrorType.AuthenticationError,`invalid credentials`);
    }
    
    return true;
 }

  

}
