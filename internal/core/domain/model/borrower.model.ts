export interface Borrower {
  borrowerReference: string; // MongoDB document ID (ObjectId)
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  contact: {
    email: string;
    phone?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  booksBorrowed: BookBorrowed[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BookBorrowed {
  bookReference: string; // Reference to the borrowed book's ID
  borrowDate: Date;
  returnDate?: Date;
}