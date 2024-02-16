
import { CreateUserDto, LoginUserDto } from "../../core/domain/dto/user.dto"; // Adjust the import path
import { User } from "../../core/domain/model/user.model"; // Adjust the import path
import { UserRepositoryPort } from "../../port/repository-port/user.repository.port";
import { generateToken } from "../../adapter/helper/auth.helper";
import { logEvent } from "../../adapter/middleware/log.middleware";
import { AppError, ErrorType } from "../../adapter/helper/error.helper";

export class UserService {
    private userRepository: UserRepositoryPort;
    private readonly jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure to set this in your env

    constructor(userRepository: UserRepositoryPort) {
        this.userRepository = userRepository;
    }

    async createUser(userDto: CreateUserDto): Promise<User> {
      
        return this.userRepository.createUser(new User({ ...userDto }));
    }

    async loginUser(userDto: LoginUserDto): Promise<string> {

        const result = await this.userRepository.loginUser(userDto);
        if (result) {
            // Generate and return the JWT token
            return generateToken(userDto.username);
        }

        logEvent("ERROR", `login failed: ${result}`);
        throw new AppError(ErrorType.ServerError,`login failed: ${result}`);
    }
}
