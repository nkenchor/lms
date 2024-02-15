
import { ErrorMessage, ErrorResponse, ErrorType } from "../helper/error.helper";
import { Request, Response, NextFunction } from 'express';
export const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    let errorResponse: ErrorResponse;
  
    // If the error is one of our custom errors
    if (err.type && Object.values(ErrorType).includes(err.type)) {
      errorResponse = ErrorMessage(err.type, err.message || 'An unexpected error occurred');
    } else {
      // For uncaught errors, log them and respond with a generic server error
      console.error(`Unhandled Error: `, err);
      errorResponse = ErrorMessage(ErrorType.InternalError, 'Internal server error');
    }
  
    res.status(errorResponse.code).json(errorResponse);
  };
  