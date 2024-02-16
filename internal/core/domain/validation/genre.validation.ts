import { body, validationResult } from 'express-validator';

export const GenreValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
];
