import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ErrorResponse, ErrorType } from "./error.helper"; // Assuming ErrorType is imported from the correct location
import { randomUUID } from "crypto"; // For generating a unique error reference

export const validationHelper = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Construct the ErrorResponse object
        const errorResponse: ErrorResponse = {
            errorReference: randomUUID(), // Generate a unique ID for the error reference
            errorType: ErrorType.ValidationError,
            timeStamp: new Date().toISOString(), // Current timestamp in ISO format
            code: 400, // HTTP status code for validation error
            errors: errors.array().map(err => err.msg), // Map validation errors to strings
        };

        return res.status(400).json(errorResponse);
    }
    next(); // No errors, proceed to the next middleware/route handler
};
