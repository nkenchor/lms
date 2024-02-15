// src/internal/adapter/api/genre.controller.ts

import { Request, Response } from 'express';
import { GenreServicePort } from "../../port/service-port/genre.service.port";
import { Genre } from '../../core/domain/model/genre.model';
import { logEvent } from '../middleware/log.middleware';
import { CreateGenreDto } from '../../core/domain/dto/genre.dto';

export class GenreController {
    constructor(private readonly genreService: GenreServicePort) {}

    async getAllGenres(req: Request, res: Response): Promise<void> {
      try {
          const page = parseInt(req.query.page as string) || 1;
          const pageSize = parseInt(req.query.pageSize as string) || 10;
          const result = await this.genreService.getAllGenres(page, pageSize);
  
  
          const { genres, total } = result as { genres: Genre[]; total: number; };
          res.json({ genres, total });
         
      } catch (error) {
          // Log internal server error
          logEvent('ERROR', error);
          // Send internal server error response
          res.status(500).json({ error: 'Internal Server Error' });
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
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async createGenre(req: Request, res: Response): Promise<void> {
        try {
            const newGenre = req.body as CreateGenreDto; // Assuming body parsing middleware is used
            const createdGenre = await this.genreService.createGenre(newGenre);
            res.status(201).json(createdGenre);
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
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
            res.status(500).send({ error: 'Internal Server Error' });
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
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }
}
