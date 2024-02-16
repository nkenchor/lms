// user.repository.port.ts

import { ILoginUserDto } from "../../core/domain/dto/user.dto";
import { User } from "../../core/domain/model/user.model";



export interface IUserRepositoryPort {
    createUser(user: User): Promise<User>;
    loginUser(user: ILoginUserDto): Promise<boolean>;
}
