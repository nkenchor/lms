import { body } from "express-validator";

export const borrowerValidationRules = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('dateOfBirth').notEmpty().withMessage('Date of birth is required'),
    body('contact.email').isEmail().withMessage('Valid email is required'),
    body('contact.phone').optional().isMobilePhone('any', { strictMode: false }).withMessage('Valid phone number is required'),
    body('contact.address.street').optional().notEmpty().withMessage('Street is required'),
    body('contact.address.city').optional().notEmpty().withMessage('City is required'),
    body('contact.address.state').optional().notEmpty().withMessage('State is required'),
    body('contact.address.zipCode').optional().notEmpty().withMessage('Zip code is required'),
    body('contact.address.country').optional().notEmpty().withMessage('Country is required'),

  ];
  