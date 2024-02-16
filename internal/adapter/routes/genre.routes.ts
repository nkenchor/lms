import { Express, Request, Response } from 'express';
import { GenreController } from '../api/genre.controller'; // Adjust the import path as necessary.
import { genreValidationRules } from '../../core/domain/validation/genre.validation';
import { validationHelper } from '../helper/validation.helper';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { jwtAuthMiddleware } from '../middleware/auth.middleware';

export const genreRoutes = (app: Express, genreController: GenreController): void => {
    // Genre routes
    app.get('/genres', (req, res) => genreController.getAllGenres(req, res));
    app.get('/genres/:genreReference', (req, res) => genreController.getGenreByReference(req, res));
    app.post('/genres',jwtAuthMiddleware, genreValidationRules, validationHelper, (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => genreController.createGenre(req, res));
    app.put('/genres/:genreReference',jwtAuthMiddleware, genreValidationRules, validationHelper,  (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => genreController.updateGenre(req, res));
    app.delete('/genres/:genreReference',jwtAuthMiddleware, (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => genreController.deleteGenre(req, res));
    app.put('/genres/delete/:genreReference',jwtAuthMiddleware,   (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => genreController.softDeleteGenre(req, res));
};
  