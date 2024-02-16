import { body } from "express-validator";

export const bookBorrowedValidationRules = [
    body('bookReference').notEmpty().withMessage('Book reference is required'),
    body('borrowDate').notEmpty().withMessage('Borrow date is required'),
   
  ];
  