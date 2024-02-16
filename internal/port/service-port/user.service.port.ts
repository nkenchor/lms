
import { CreateUserDto, LoginUserDto } from "../../core/domain/dto/user.dto";
import { User } from "../../core/domain/model/user.model";

export interface UserServicePort {
  createUser(user: CreateUserDto): Promise<User>;
  loginUser(user: LoginUserDto): Promise<string>;
}
