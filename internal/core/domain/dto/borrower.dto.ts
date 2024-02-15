// DTO for creating a new borrower
export interface CreateBorrowerDto {
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
}
  
// DTO for updating an existing borrower
export interface UpdateBorrowerDto {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  contact?: {
    email?: string;
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
    };
  };
}
  
// DTO for borrowing a book
export interface BorrowBookDto {
  bookReference: string; // Reference to the book being borrowed
  borrowDate: Date;
}
  