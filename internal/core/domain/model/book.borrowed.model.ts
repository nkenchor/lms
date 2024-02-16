export interface BookBorrowed {
    bookReference: string; // Reference to the borrowed book's ID
    borrowDate: Date;
    returnDate?: Date;
  }