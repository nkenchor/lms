import { Express, Request, Response } from 'express';
import { AuthorController } from '../api/author.controller'; // Adjust the import path as necessary.
import { authorValidationRules } from '../../core/domain/validation/author.validation';
import { validationHelper } from '../helper/validation.helper';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { jwtAuthMiddleware } from '../middleware/auth.middleware';

export const authorRoutes = (app: Express, authorController: AuthorController): void => {
    // Author routes
    app.get('/authors', (req, res) => authorController.getAllAuthors(req, res));
    app.get('/authors/:authorReference', (req, res) => authorController.getAuthorByReference(req, res));
    app.post('/authors',jwtAuthMiddleware, authorValidationRules, validationHelper, (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => authorController.createAuthor(req, res));
    app.put('/authors/:authorReference',jwtAuthMiddleware, authorValidationRules, validationHelper,  (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => authorController.updateAuthor(req, res));
    app.delete('/authors/:authorReference',jwtAuthMiddleware,  (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => authorController.deleteAuthor(req, res));
    app.put('/authors/delete/:authorReference',jwtAuthMiddleware,  (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => authorController.softDeleteAuthor(req, res));
};
  