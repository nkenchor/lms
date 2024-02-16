import { body, param } from "express-validator";

export const borrowBookValidationRules = [
    body('bookReference').notEmpty().withMessage('Book reference is required.'),
    body('borrowerReference').notEmpty().withMessage('Borrower reference is required.'),
    body('transactionDate').notEmpty().isISO8601().withMessage('Transaction date must be a valid ISO 8601 date.'),
  ];

  export const returnBookValidationRules = [
    param('transactionReference').notEmpty().withMessage('Transaction reference is required.'),
    body('returnDate').notEmpty().isISO8601().withMessage('Return date must be a valid ISO 8601 date.'),
  ];