// user.repository.port.ts

import { LoginUserDto } from "../../core/domain/dto/user.dto";
import { User } from "../../core/domain/model/user.model";



export interface UserRepositoryPort {
    createUser(user: User): Promise<User>;
    loginUser(user: LoginUserDto): Promise<boolean>;
}
