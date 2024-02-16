

export interface IUpdateBookTransactionDto {
     returnDate: Date;
  
}
  
export interface ICreateBookTransactionDto {
    borrowerReference: string; // Reference to the borrower renting the book
    bookReference: string; // Reference to the book being rented
    transactionDate: Date; // The date when the book is being rented
  }
  