

import { Request, Response } from 'express';
import { IAuthorServicePort } from "../../port/service-port/author.service.port";
import { Author } from '../../core/domain/model/author.model';
import { logEvent } from '../middleware/log.middleware';
import { ICreateAuthorDto } from '../../core/domain/dto/author.dto';
import { AppError } from '../helper/error.helper';
import { RecordFilter } from '../../core/domain/const/record.filter';

export class AuthorController {
    constructor(private readonly authorService: IAuthorServicePort) { }

    async getAllAuthors(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;
            const recordFilter = req.query.recordFilter as RecordFilter;
            const result = await this.authorService.getAllAuthors(page, pageSize, recordFilter);
            const { authors, total } = result as { authors: Author[]; total: number; };
            res.json({ authors, total });

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
    //get author by reference
    async getAuthorByReference(req: Request, res: Response): Promise<void> {
        try {
            const authorReference = req.params.authorReference;
            const author = await this.authorService.getAuthorByReference(authorReference);
            if (author) {
                res.json(author);
            } else {
                res.status(404).send({ error: 'Author not found' });
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

    //create author
    async createAuthor(req: Request, res: Response): Promise<void> {
        try {
            const newAuthor = req.body as ICreateAuthorDto; // Assuming body parsing middleware is used
            const createdAuthor = await this.authorService.createAuthor(newAuthor);
            res.status(201).json(createdAuthor);
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

    //update author
    async updateAuthor(req: Request, res: Response): Promise<void> {
        try {
            const authorReference = req.params.authorReference;
            const updatedAuthor = req.body as Author;
            const result = await this.authorService.updateAuthor(authorReference, updatedAuthor);
            if (result) {
                res.json(result);
            } else {
                res.status(404).send({ error: 'Author not found' });
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

    //delete author
    async deleteAuthor(req: Request, res: Response): Promise<void> {
        try {
            const authorReference = req.params.authorReference;
            const success = await this.authorService.deleteAuthor(authorReference);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).send({ error: 'Author not found' });
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
    //soft delete author
    async softDeleteAuthor(req: Request, res: Response): Promise<void> {
        try {
            const authorReference = req.params.authorReference;
            const success = await this.authorService.softDeleteAuthor(authorReference);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).send({ error: 'Author not found' });
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
