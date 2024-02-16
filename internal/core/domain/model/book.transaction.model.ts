import { randomUUID } from "crypto";

export enum BookTransactionStatus {
  Borrowed = "borrowed",
  Returned = "returned",
}

export class BookTransaction {
  transactionReference: string;
  bookReference: string;
  borrowerReference: string;
  transactionDate: Date;
  returnDate?: Date;
  status: BookTransactionStatus;

  constructor({
    bookReference,
    borrowerReference,
    transactionDate,
    status = BookTransactionStatus.Borrowed, // Default value for status
    returnDate,
    transactionReference = randomUUID(), // Automatically generate if not provided
  }: {
    bookReference: string;
    borrowerReference: string;
    transactionDate: Date;
  } & Partial<Omit<BookTransaction, 'bookReference' | 'borrowerReference' | 'transactionDate'>>) {
    this.transactionReference = transactionReference;
    this.bookReference = bookReference;
    this.borrowerReference = borrowerReference;
    this.transactionDate = transactionDate;
    this.status = status;
    this.returnDate = returnDate;
  }
}
