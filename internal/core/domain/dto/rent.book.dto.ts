interface RentBookDto {
    borrowerReference: string; // Reference to the borrower renting the book
    bookReference: string; // Reference to the book being rented
    borrowDate: Date; // The date when the book is being rented
  }
  