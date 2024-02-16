import { body } from "express-validator";

export const bookValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('isbn').notEmpty().withMessage('ISBN is required'),
    body('authorReferences').isArray({ min: 1 }).withMessage('At least one author is required'),
    body('publicationDate').notEmpty().withMessage('Publication date is required'),
    body('language').notEmpty().withMessage('Language is required'),
    body('genreReferences').isArray({ min: 1 }).withMessage('At least one genre is required'),
    body('synopsis').notEmpty().withMessage('Synopsis is required'),
    body('pageCount').isInt({ min: 1 }).withMessage('Page count must be a positive integer'),
    body('publisher').notEmpty().withMessage('Publisher is required'),
    body('availableCopies').isInt({ min: 0 }).withMessage('Available copies must be a non-negative integer'),
    body('totalCopies').isInt({ min: 1 }).withMessage('Total copies must be a positive integer'),
  ];
  