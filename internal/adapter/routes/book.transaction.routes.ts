import { Express, Request, Response } from 'express';
import { validationHelper } from '../helper/validation.helper';
import { jwtAuthMiddleware } from '../middleware/auth.middleware';
import { borrowBookValidationRules, returnBookValidationRules } from '../../core/domain/validation/book.transaction.validation';
import { BookTransactionController } from '../api/book.transaction.controller';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export const transactionRoutes = (app: Express, transactionController: BookTransactionController): void => {
    app.post('/transaction/return',jwtAuthMiddleware, returnBookValidationRules, validationHelper, (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>)  => transactionController.returnBook(req, res))
    app.post('/transaction/borrow',jwtAuthMiddleware, borrowBookValidationRules, validationHelper, (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>)  => transactionController.borrowBook(req, res))
};
  