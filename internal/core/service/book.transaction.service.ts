import { BookBorrowed } from './../domain/model/book.borrowed.model';
import { IBookTransactionRepositoryPort } from "../../port/repository-port/book.transaction.repository.port";
import { IBookTransactionServicePort } from "../../port/service-port/book.transaction.service.port";
import { ICreateBookTransactionDto } from "../domain/dto/book.transaction.dto";
import { BookTransaction, BookTransactionStatus } from "../domain/model/book.transaction.model";
import { BookService } from "./book.service";
import { BorrowerService } from "./borrower.service";



export class BookTransactionService implements IBookTransactionServicePort {
  constructor(private transactionRepository: IBookTransactionRepositoryPort,
    private bookService: BookService, // Service to manage books
    private borrowerService: BorrowerService // Service to manage borrowers
    ) {}

    async borrowBook(transaction: ICreateBookTransactionDto): Promise<BookTransaction> {
        // Decrement the available copies of the book
        await this.bookService.decreaseAvailableCopies(transaction.bookReference);
    
        // Create a BookBorrowed object
        const bookBorrowed = ({
          bookReference: transaction.bookReference,
          borrowDate: new Date(), // Assuming the borrow date is now
        });
    
        // Add the book to the borrower's list of borrowed books
        await this.borrowerService.addBookToBorrower(transaction.borrowerReference, bookBorrowed);
    
        // Create and return the book transaction
        return this.transactionRepository.createTransaction(new BookTransaction({
          ...transaction,
          status: BookTransactionStatus.Borrowed
        }));
      }
    

  async returnBook(transactionReference: string, returnDate: Date): Promise<BookTransaction> {
    const transaction = await this.transactionRepository.getTransactionByReference(transactionReference); // Assume this method exists
    transaction.status = BookTransactionStatus.Returned;
    transaction.returnDate = returnDate;
    // Increment the available copies of the book
    await this.bookService.increaseAvailableCopies(transaction.bookReference);

    // Remove the book from the borrower's list of borrowed books
    await this.borrowerService.collectBookFromBorrower(transaction.borrowerReference, transaction.bookReference, returnDate);

    return this.transactionRepository.updateTransaction(transaction.transactionReference,transaction);

  }
  async getTransactionByReference(transactionReference: string): Promise<BookTransaction> {
    return this.transactionRepository.getTransactionByReference(transactionReference);
  }


 
}
