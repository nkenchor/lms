import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../../configuration/ts/config';
import { logEvent } from './log.middleware'; // Utility for logging events
import { AppError, ErrorType } from '../helper/error.helper'; // Custom error handling

/**
 * Middleware to authenticate requests using JWT.
 * It checks for a valid Authorization header and verifies the JWT.
 * 
 * @param req - The request object from Express.
 * @param res - The response object from Express.
 * @param next - The next function to pass control to the next middleware.
 */
export const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization; // Extract the authorization header

    // Check if the Authorization header is present and formatted correctly
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        logEvent("ERROR", 'Authorization header is missing or invalid.');
        // Respond with an unauthorized error if the check fails
        return next(new AppError(ErrorType.UnAuthorized, 'user not authenticated for this operation.'));
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the header
    const secretKey = config.jwtKey; // Retrieve the secret key from configuration

    // Verify the token using the secret key
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            // Log and handle any error that occurs during token verification
            logEvent("ERROR", 'Failed to authenticate user');
            return next(new AppError(ErrorType.AuthenticationError, 'Failed to authenticate user'));
        }

        // If the token is valid, proceed to the next middleware or route handler
        next();
    });
};
