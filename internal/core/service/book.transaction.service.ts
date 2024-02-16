import { IBookTransactionRepositoryPort } from "../../port/repository-port/book.transaction.repository.port";
import { IBookTransactionServicePort } from "../../port/service-port/book.transaction.service.port";
import { ICreateBookTransactionDto } from "../domain/dto/book.transaction.dto";
import { BookTransaction, BookTransactionStatus } from "../domain/model/book.transaction.model";


export class BookTransactionService implements IBookTransactionServicePort {
  constructor(private transactionRepository: IBookTransactionRepositoryPort) {}

  async borrowBook(transaction: ICreateBookTransactionDto): Promise<BookTransaction> {
    return this.transactionRepository.createTransaction(new BookTransaction({ ...transaction,status:BookTransactionStatus.Borrowed }));

  }

  async returnBook(transactionReference: string, returnDate: Date): Promise<BookTransaction> {
    const transaction = await this.transactionRepository.getTransactionByReference(transactionReference); // Assume this method exists
    transaction.status = BookTransactionStatus.Returned;
    transaction.returnDate = returnDate;
    return this.transactionRepository.updateTransaction(transaction.transactionReference,transaction);

  }
  async getTransactionByReference(transactionReference: string): Promise<BookTransaction> {
    return this.transactionRepository.getTransactionByReference(transactionReference);
  }


 
}
