

import { Request, Response } from 'express';
import { IBorrowerServicePort } from "../../port/service-port/borrower.service.port";
import { Borrower } from '../../core/domain/model/borrower.model';
import { logEvent } from '../middleware/log.middleware';
import { ICreateBorrowerDto } from '../../core/domain/dto/borrower.dto';
import { AppError } from '../helper/error.helper';

export class BorrowerController {
    constructor(private readonly borrowerService: IBorrowerServicePort) {}

    async getAllBorrowers(req: Request, res: Response): Promise<void> {
      try {
          const page = parseInt(req.query.page as string) || 1;
          const pageSize = parseInt(req.query.pageSize as string) || 10;
          const result = await this.borrowerService.getAllBorrowers(page, pageSize);
  
  
          const { borrowers, total } = result as { borrowers: Borrower[]; total: number; };
          res.json({ borrowers, total });
         
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
    async getBorrowerByReference(req: Request, res: Response): Promise<void> {
        try {
            const borrowerReference = req.params.borrowerReference;
            const borrower = await this.borrowerService.getBorrowerByReference(borrowerReference);
            if (borrower) {
                res.json(borrower);
            } else {
                res.status(404).send({ error: 'Borrower not found' });
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

    async createBorrower(req: Request, res: Response): Promise<void> {
        try {
            const newBorrower = req.body as ICreateBorrowerDto; // Assuming body parsing middleware is used
            const createdBorrower = await this.borrowerService.createBorrower(newBorrower);
            res.status(201).json(createdBorrower);
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

    async updateBorrower(req: Request, res: Response): Promise<void> {
        try {
            const borrowerReference = req.params.borrowerReference;
            const updatedBorrower = req.body as Borrower;
            const result = await this.borrowerService.updateBorrower(borrowerReference, updatedBorrower);
            if (result) {
                res.json(result);
            } else {
                res.status(404).send({ error: 'Borrower not found' });
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

    async deleteBorrower(req: Request, res: Response): Promise<void> {
        try {
            const borrowerReference = req.params.borrowerReference;
            const success = await this.borrowerService.deleteBorrower(borrowerReference);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).send({ error: 'Borrower not found' });
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
