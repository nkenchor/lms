import { Request, Response } from 'express';

import { UserServicePort } from "../../port/service-port/user.service.port";
import { CreateUserDto } from '../../core/domain/dto/user.dto';
import { logEvent } from '../middleware/log.middleware';
import { AppError, ErrorType } from '../helper/error.helper';

export class UserController {
    constructor(private readonly userService: UserServicePort) {}

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userDto = req.body as CreateUserDto;
            const createdUser = await this.userService.createUser(userDto);
            // Exclude the password before sending the response
            const { password, ...userWithoutPassword } = createdUser;
            res.status(201).json(userWithoutPassword);
        } catch (error) {
            if (error instanceof AppError) {
                // Error is an instance of AppError; handle it based on its statusCode and message
                logEvent('ERROR', error.message);
                res.status(error.statusCode).json({ error });
            } else {
                // Handle generic or unexpected errors
                logEvent('ERROR', 'An unknown error occurred');
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }

    async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const token = await this.userService.loginUser({ username, password });
            res.json({ token });
        } catch (error) {
            if (error instanceof AppError) {
                // Error is an instance of AppError; handle it based on its statusCode and message
                logEvent('ERROR', error.message);
                res.status(error.statusCode).json({ error });
            } else {
                // Handle generic or unexpected errors
                logEvent('ERROR', 'An unknown error occurred');
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
        
    }

  
}

