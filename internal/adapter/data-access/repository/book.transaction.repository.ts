import { Db as Database, Collection } from 'mongodb';
import { BookTransaction } from "../../../core/domain/model/book.transaction.model";
import { IBookTransactionRepositoryPort } from "../../../port/repository-port/book.transaction.repository.port";
import { AppError, ErrorType } from "../../helper/error.helper"; 
import { logEvent } from "../../middleware/log.middleware"; 

export class BookTransactionRepository implements IBookTransactionRepositoryPort {
  private database: Database;
  private collectionName = 'bookTransactions'; 
  constructor(database: Database) {
    this.database = database;
  }

  private getCollection(): Collection<BookTransaction> {
    return this.database.collection<BookTransaction>(this.collectionName);
  }

  async createTransaction(transaction: BookTransaction): Promise<BookTransaction> {
    try {
      const result = await this.getCollection().insertOne(transaction);
      if (!result.acknowledged) {
        logEvent("ERROR", `Failed to create book transaction`);
        throw new AppError(ErrorType.CreateError, `Failed to create book transaction`);
      }
      return transaction;
    } catch (error) {
      logEvent("ERROR", `Database error on creating book transaction`);
      throw new AppError(ErrorType.ServerError, `Database error on creating book transaction`);
    }
  }

  
  async updateTransaction(transactionReference: string, transaction: BookTransaction): Promise<BookTransaction> {
    try {
      const result = await this.getCollection().findOneAndUpdate(
        { transactionReference: transactionReference },
        { $set: transaction },
        { returnDocument: 'after' }
      );
      if (!result) {
        logEvent("ERROR", `Book transaction not found for reference: ${transactionReference}, update failed.`);
        throw new AppError(ErrorType.UpdateError, `Book transaction not found for reference: ${transactionReference}, update failed.`);
      }
      return result;
    } catch (error) {
      logEvent("ERROR", `Database error on updating book transaction`);
      throw new AppError(ErrorType.ServerError, `Database error on updating book transaction`);
    }
  }

  async getTransactionByReference(transactionReference: string): Promise<BookTransaction> {
    try {
      const transaction = await this.getCollection().findOne({ transactionReference: transactionReference });
      if (!transaction) {
        logEvent("ERROR", `Book transaction not found for reference: ${transactionReference}`);
        throw new AppError(ErrorType.NoRecordError, `Book transaction not found for reference: ${transactionReference}`);
      }
      return transaction;
    } catch (error) {
      logEvent("ERROR", `Database error on fetching book transaction`);
      throw new AppError(ErrorType.ServerError, `Database error on fetching book transaction`);
    }
  }
}
