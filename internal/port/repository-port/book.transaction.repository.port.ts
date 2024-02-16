import { BookTransaction } from "../../core/domain/model/book.transaction.model";


export interface IBookTransactionRepositoryPort {
  createTransaction(transaction: BookTransaction): Promise<BookTransaction>;
  updateTransaction(transactionReference: string, transaction: BookTransaction): Promise<BookTransaction>;
  getTransactionByReference(transactionReference: string): Promise<BookTransaction>;
}