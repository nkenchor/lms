import { Express, Request, Response } from 'express';
import { BorrowerController } from '../api/borrower.controller'; // Adjust the import path as necessary.
import { validationHelper } from '../helper/validation.helper';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { jwtAuthMiddleware } from '../middleware/auth.middleware';
import { borrowerValidationRules } from '../../core/domain/validation/borrower.validation';

export const borrowerRoutes = (app: Express, borrowerController: BorrowerController): void => {
    // Borrower routes
    app.get('/borrowers', (req, res) => borrowerController.getAllBorrowers(req, res));
    app.get('/borrowers/:borrowerReference', (req, res) => borrowerController.getBorrowerByReference(req, res));
    app.post('/borrowers',jwtAuthMiddleware, borrowerValidationRules, validationHelper, (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => borrowerController.createBorrower(req, res));
    app.put('/borrowers/:borrowerReference',jwtAuthMiddleware, borrowerValidationRules, validationHelper,  (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => borrowerController.updateBorrower(req, res));
    app.delete('/borrowers/:borrowerReference',jwtAuthMiddleware,borrowerValidationRules, validationHelper,   (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => borrowerController.deleteBorrower(req, res));
};
  