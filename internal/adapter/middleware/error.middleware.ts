import { Request, Response, NextFunction } from 'express';

import { ErrorType, ErrorMessage, ErrorResponse, AppError } from '../helper/error.helper'; // Ensure correct import paths

export const ErrorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        // Error is an instance of AppError; handle it accordingly
        res.status(err.statusCode).json({
            errorReference: err.errorReference,
            errorType: err.errorType,
            timeStamp: err.timeStamp,
            code: err.statusCode,
            errors: [err.message], // Assuming AppError includes a message
        });
    } else if (typeof err === 'object' && err !== null) {
        // For generic errors, check if it has a message property
        const genericError = err as { message?: unknown };
        let message = "An unexpected error occurred";
        if (typeof genericError.message === 'string') {
            message = genericError.message;
        }

        // Use the ErrorMessage function for unknown errors
        const errorResponse: ErrorResponse = ErrorMessage(ErrorType.InternalError, message);
        res.status(errorResponse.code).json(errorResponse);
    } else {
        // Handle other types of unknown errors
        console.error(`Unhandled Error: `, err);
        const fallbackError = ErrorMessage(ErrorType.InternalError, 'Internal server error');
        res.status(fallbackError.code).json(fallbackError);
    }
};
