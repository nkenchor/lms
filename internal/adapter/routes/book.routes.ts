import { Express, Request, Response } from 'express';
import { BookController } from '../api/book.controller'; // Adjust the import path as necessary.
import { bookValidationRules } from '../../core/domain/validation/book.validation';
import { validationHelper } from '../helper/validation.helper';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { jwtAuthMiddleware } from '../middleware/auth.middleware';


export const bookRoutes = (app: Express, bookController: BookController): void => {
    // Book routes
    app.get('/books', (req, res) => bookController.getAllBooks(req, res));
    app.get('/books/:bookReference', (req, res) => bookController.getBookByReference(req, res));
    app.post('/books',jwtAuthMiddleware, bookValidationRules, validationHelper, (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => bookController.createBook(req, res));
    app.put('/books/:bookReference',jwtAuthMiddleware, bookValidationRules, validationHelper,  (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => bookController.updateBook(req, res));
    app.delete('/books/:bookReference',jwtAuthMiddleware,   (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => bookController.deleteBook(req, res));
    app.put('/books/delete/:bookReference',jwtAuthMiddleware,   (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => bookController.softDeleteBook(req, res));
};
  