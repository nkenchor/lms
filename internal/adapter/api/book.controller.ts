// src/internal/adapter/api/book.controller.ts

import { Request, Response } from 'express';
import { IBookServicePort } from "../../port/service-port/book.service.port";
import { Book } from '../../core/domain/model/book.model';
import { logEvent } from '../middleware/log.middleware';
import { ICreateBookDto } from '../../core/domain/dto/book.dto';
import { AppError } from '../helper/error.helper';
import { RecordFilter } from '../../core/domain/const/record.filter';

export class BookController {
    constructor(private readonly bookService: IBookServicePort) {}

    async getAllBooks(req: Request, res: Response): Promise<void> {
      try {
          const page = parseInt(req.query.page as string) || 1;
          const pageSize = parseInt(req.query.pageSize as string) || 10;
          const recordFilter = req.query.recordFilter as RecordFilter;
          const result = await this.bookService.getAllBooks(page, pageSize,recordFilter);
  
  
          const { books, total } = result as { books: Book[]; total: number; };
          res.json({ books, total });
         
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
    async getBookByReference(req: Request, res: Response): Promise<void> {
        try {
            const bookReference = req.params.bookReference;
            const book = await this.bookService.getBookByReference(bookReference);
            if (book) {
                res.json(book);
            } else {
                res.status(404).send({ error: 'Book not found' });
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
 //create book
    async createBook(req: Request, res: Response): Promise<void> {
        try {
            const newBook = req.body as ICreateBookDto; // Assuming body parsing middleware is used
            const createdBook = await this.bookService.createBook(newBook);
            res.status(201).json(createdBook);
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

    //update book
    async updateBook(req: Request, res: Response): Promise<void> {
        try {
            const bookReference = req.params.bookReference;
            const updatedBook = req.body as Book;
            const result = await this.bookService.updateBook(bookReference, updatedBook);
            if (result) {
                res.json(result);
            } else {
                res.status(404).send({ error: 'Book not found' });
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

    async deleteBook(req: Request, res: Response): Promise<void> {
        try {
            const bookReference = req.params.bookReference;
            const success = await this.bookService.deleteBook(bookReference);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).send({ error: 'Book not found' });
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
    async softDeleteBook(req: Request, res: Response): Promise<void> {
        try {
            const bookReference = req.params.bookReference;
            const success = await this.bookService.softDeleteBook(bookReference);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).send({ error: 'Book not found' });
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
