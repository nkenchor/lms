
import { IBookTransactionRepositoryPort } from "../../port/repository-port/book.transaction.repository.port";
import { IBookTransactionServicePort } from "../../port/service-port/book.transaction.service.port";
import { ICreateBookTransactionDto } from "../domain/dto/book.transaction.dto";
import { BookTransaction, BookTransactionStatus } from "../domain/model/book.transaction.model";
import { BookService } from "./book.service";
import { BorrowerService } from "./borrower.service";



export class BookTransactionService implements IBookTransactionServicePort {
  constructor(private transactionRepository: IBookTransactionRepositoryPort,
    private bookService: BookService, 
    private borrowerService: BorrowerService 
    ) {}

    //borrows a book
  async borrowBook(transaction: ICreateBookTransactionDto): Promise<BookTransaction> {
      // Check if the book exists and has available copies
      const book = await this.bookService.getBookByReference(transaction.bookReference);
      if (!book || book.availableCopies < 1) {
        throw new Error('Book not available for borrowing');
      }

      // Check if the borrower exists
      const borrower = await this.borrowerService.getBorrowerByReference(transaction.borrowerReference);
      if (!borrower) {
        throw new Error('Borrower not found');
      }

      // Decrement the available copies of the book
      await this.bookService.decreaseAvailableCopies(transaction.bookReference);
  
      // Create a BookBorrowed object
      const bookBorrowed = ({
        bookReference: transaction.bookReference,
        borrowDate: new Date(), // Assuming the borrow date is now
      });
  
      // Add the book to the borrower's list of borrowed books
      await this.borrowerService.borrowBook(transaction.borrowerReference, bookBorrowed);
  
      // Create and return the book transaction
      return this.transactionRepository.createTransaction(new BookTransaction({
        ...transaction,
        status: BookTransactionStatus.Borrowed
      }));
    }
    

    //returns a book
  async returnBook(transactionReference: string, returnDate: Date): Promise<BookTransaction> {
    const transaction = await this.transactionRepository.getTransactionByReference(transactionReference); 
    transaction.status = BookTransactionStatus.Returned;
    transaction.returnDate = returnDate;
    // Increment the available copies of the book
    await this.bookService.increaseAvailableCopies(transaction.bookReference);
    await this.borrowerService.returnBook(transaction.borrowerReference, transaction.bookReference, returnDate);
    return this.transactionRepository.updateTransaction(transaction.transactionReference,transaction);

  }
  async getTransactionByReference(transactionReference: string): Promise<BookTransaction> {
    return this.transactionRepository.getTransactionByReference(transactionReference);
  }


 
}
