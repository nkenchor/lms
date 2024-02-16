

import { body } from 'express-validator';

export const createUserValidationRules = [
  body('username').notEmpty().withMessage('Username is required').isString().withMessage('Username must be a string'),
  body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const loginUserValidationRules = [
  body('username').notEmpty().withMessage('Username is required').isString().withMessage('Username must be a string'),
  body('password').notEmpty().withMessage('Password is required'),
];
