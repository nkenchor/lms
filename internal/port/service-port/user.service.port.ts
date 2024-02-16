
import { ICreateUserDto, ILoginUserDto } from "../../core/domain/dto/user.dto";
import { User } from "../../core/domain/model/user.model";

export interface IUserServicePort {
  createUser(user: ICreateUserDto): Promise<User>;
  loginUser(user: ILoginUserDto): Promise<string>;
}
