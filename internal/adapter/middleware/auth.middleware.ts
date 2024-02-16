import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../../configuration/ts/config';
import { logEvent } from './log.middleware';
import { AppError, ErrorType } from '../helper/error.helper';

export const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        logEvent("ERROR", 'Authorization header is missing or invalid.');
        return next(new AppError(ErrorType.UnAuthorized, 'user not authenticated for this operation.'));
    }

    const token = authHeader.split(' ')[1];
    const secretKey = config.jwtKey;

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            logEvent("ERROR", 'Failed to authenticate user');
            return next(new AppError(ErrorType.AuthenticationError, 'Failed to authenticate user'));
        }

    

        next(); // Proceed to the next middleware/route handler
    });
};