

import { Request, Response } from 'express';
import { IGenreServicePort } from "../../port/service-port/genre.service.port";
import { Genre } from '../../core/domain/model/genre.model';
import { logEvent } from '../middleware/log.middleware';
import { ICreateGenreDto } from '../../core/domain/dto/genre.dto';
import { AppError } from '../helper/error.helper';
import { RecordFilter } from '../../core/domain/const/record.filter';

export class GenreController {
    constructor(private readonly genreService: IGenreServicePort) {}

    async getAllGenres(req: Request, res: Response): Promise<void> {
      try {
          const page = parseInt(req.query.page as string) || 1;
          const pageSize = parseInt(req.query.pageSize as string) || 10;
          const recordFilter = req.query.recordFilter as RecordFilter;
          const result = await this.genreService.getAllGenres(page, pageSize, recordFilter);
  
  
          const { genres, total } = result as { genres: Genre[]; total: number; };
          res.json({ genres, total });
         
      } catch (error) {
        if (error instanceof AppError) {
            // Error is an instance of AppError; handle it based on its statusCode and message
            logEvent('ERROR', error.message);
            res.status(error.statusCode).json({ error });
        } else {
            // Handle generic or unexpected errors
            logEvent('ERROR', 'An unknown error occurred');
            res.status(500).json({ error: 'Internal Server Error' });
        }
      }
  }
    async getGenreByReference(req: Request, res: Response): Promise<void> {
        try {
            const genreReference = req.params.genreReference;
            const genre = await this.genreService.getGenreByReference(genreReference);
            if (genre) {
                res.json(genre);
            } else {
                res.status(404).send({ error: 'Genre not found' });
            }
        } catch (error) {
            if (error instanceof AppError) {
                // Error is an instance of AppError; handle it based on its statusCode and message
                logEvent('ERROR', error.message);
                res.status(error.statusCode).json({ error });
            } else {
                // Handle generic or unexpected errors
                logEvent('ERROR', 'An unknown error occurred');
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }

    async createGenre(req: Request, res: Response): Promise<void> {
        try {
            const newGenre = req.body as ICreateGenreDto; // Assuming body parsing middleware is used
            const createdGenre = await this.genreService.createGenre(newGenre);
            res.status(201).json(createdGenre);
        } catch (error) {
            if (error instanceof AppError) {
                // Error is an instance of AppError; handle it based on its statusCode and message
                logEvent('ERROR', error.message);
                res.status(error.statusCode).json({ error });
            } else {
                // Handle generic or unexpected errors
                logEvent('ERROR', 'An unknown error occurred');
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }

    async updateGenre(req: Request, res: Response): Promise<void> {
        try {
            const genreReference = req.params.genreReference;
            const updatedGenre = req.body as Genre;
            const result = await this.genreService.updateGenre(genreReference, updatedGenre);
            if (result) {
                res.json(result);
            } else {
                res.status(404).send({ error: 'Genre not found' });
            }
        } catch (error) {
            if (error instanceof AppError) {
                // Error is an instance of AppError; handle it based on its statusCode and message
                logEvent('ERROR', error.message);
                res.status(error.statusCode).json({ error });
            } else {
                // Handle generic or unexpected errors
                logEvent('ERROR', 'An unknown error occurred');
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }

    async deleteGenre(req: Request, res: Response): Promise<void> {
        try {
            const genreReference = req.params.genreReference;
            const success = await this.genreService.deleteGenre(genreReference);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).send({ error: 'Genre not found' });
            }
        } catch (error) {
            if (error instanceof AppError) {
                // Error is an instance of AppError; handle it based on its statusCode and message
                logEvent('ERROR', error.message);
                res.status(error.statusCode).json({ error });
            } else {
                // Handle generic or unexpected errors
                logEvent('ERROR', 'An unknown error occurred');
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
        
    }
    async softDeleteGenre(req: Request, res: Response): Promise<void> {
        try {
            const genreReference = req.params.genreReference;
            const success = await this.genreService.softDeleteGenre(genreReference);
            if (success) {
                res.status(204).send(); // No content to send back
            } else {
               
                res.status(404).send({ error: 'Genre not found or already deleted' });
            }
        } catch (error) {
            if (error instanceof AppError) {
                // Error is an instance of AppError; handle it based on its statusCode and message
                logEvent('ERROR', error.message);
                res.status(error.statusCode).json({ error });
            } else {
                // Handle generic or unexpected errors
                logEvent('ERROR', 'An unknown error occurred');
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
}
