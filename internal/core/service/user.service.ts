
import { ICreateUserDto, ILoginUserDto } from "../../core/domain/dto/user.dto"; 
import { User } from "../../core/domain/model/user.model"; 
import { IUserRepositoryPort } from "../../port/repository-port/user.repository.port";
import { generateToken } from "../../adapter/helper/auth.helper";
import { logEvent } from "../../adapter/middleware/log.middleware";
import { AppError, ErrorType } from "../../adapter/helper/error.helper";

export class UserService {
    private userRepository: IUserRepositoryPort;
   
    constructor(userRepository: IUserRepositoryPort) {
        this.userRepository = userRepository;
    }

    //creates a user
    async createUser(userDto: ICreateUserDto): Promise<User> {
      
        return this.userRepository.createUser(new User({ ...userDto }));
    }

    //logins a user
    async loginUser(userDto: ILoginUserDto): Promise<string> {

        const result = await this.userRepository.loginUser(userDto);
        if (result) {
            // Generate and return the JWT token
            return generateToken(userDto.username);
        }

        logEvent("ERROR", `login failed: ${result}`);
        throw new AppError(ErrorType.ServerError,`login failed: ${result}`);
    }
}
