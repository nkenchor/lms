import { body } from "express-validator";

export const authorValidationRules = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('biography').notEmpty().withMessage('Biography is required'),
   
  ];
  