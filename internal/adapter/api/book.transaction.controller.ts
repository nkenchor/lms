
//Transaction controller
import { Request, Response } from 'express';

import { logEvent } from '../middleware/log.middleware';

import { AppError } from '../helper/error.helper';
import { IBookTransactionServicePort } from '../../port/service-port/book.transaction.service.port';
import { BookTransaction } from '../../core/domain/model/book.transaction.model';
import { ICreateBookTransactionDto } from '../../core/domain/dto/book.transaction.dto';

export class BookTransactionController {
    constructor(private readonly transactionService: IBookTransactionServicePort) {}

    //get transactions by reference
    async getTransactionByReference(req: Request, res: Response): Promise<void> {
        try {
            const transactionReference = req.params.transactionReference;
            const transaction = await this.transactionService.getTransactionByReference(transactionReference);
            if (transaction) {
                res.json(transaction);
            } else {
                res.status(404).send({ error: 'Book Transaction not found' });
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

    //borrows a book to a person
    async borrowBook(req: Request, res: Response): Promise<void> {
        try {
            const newBookTransaction = req.body as ICreateBookTransactionDto; // Assuming body parsing middleware is used
            const createdBookTransaction = await this.transactionService.borrowBook(newBookTransaction);
            res.status(201).json(createdBookTransaction);
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

    //returns a book
    async returnBook(req: Request, res: Response): Promise<void> {
        try {
            const transactionReference = req.params.transactionReference;
            const { returnDate } = req.body;
          
            const result = await this.transactionService.returnBook(transactionReference, returnDate);
            if (result) {
                res.json(result);
            } else {
                res.status(500).send({ error: 'Eroor returning book' });
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
