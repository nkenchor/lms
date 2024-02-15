import { Express, Request, Response } from 'express';
import { GenreController } from '../api/genre.controller'; // Adjust the import path as necessary.
import { CreateGenreValidationRules } from '../../core/domain/validation/genre.validation';
import { validationHelper } from '../helper/validation.helper';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export const genreRoutes = (app: Express, genreController: GenreController): void => {
    // Welcome route
    app.get('/', (req, res) => res.json({ message: 'Welcome to the LMS API' }));

    // Genre routes
    app.get('/genres', (req, res) => genreController.getAllGenres(req, res));
    app.get('/genres/:genreReference', (req, res) => genreController.getGenreByReference(req, res));
    app.post('/genres',CreateGenreValidationRules, validationHelper, (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => genreController.createGenre(req, res));
    app.put('/genres/:genreReference', (req, res) => genreController.updateGenre(req, res));
    app.delete('/genres/:genreReference', (req, res) => genreController.deleteGenre(req, res));
};
  