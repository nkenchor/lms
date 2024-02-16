import { ICreateBookTransactionDto } from "../../core/domain/dto/book.transaction.dto";
import { BookTransaction } from "../../core/domain/model/book.transaction.model";


export interface IBookTransactionServicePort {
  borrowBook(transaction: ICreateBookTransactionDto): Promise<BookTransaction>;
  returnBook(transactionReference: string, returnDate: Date): Promise<BookTransaction>;
  getTransactionByReference(transactionReference: string): Promise<BookTransaction>;
}