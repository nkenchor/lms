import { randomUUID } from "crypto";
import { BookBorrowed } from "./book.borrowed.model";
import { logEvent } from "../../../adapter/middleware/log.middleware";
import { AppError, ErrorType } from "../../../adapter/helper/error.helper";

export class Borrower {
  length(length: any) {
    throw new Error('Method not implemented.');
  }
  some(arg0: (b: any) => boolean): any {
    throw new Error('Method not implemented.');
  }
  borrowerReference: string;
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
  isDeleted: boolean; // Indicates whether the borrower is soft-deleted

  constructor({
    firstName,
    lastName,
    dateOfBirth,
    contact,
    booksBorrowed,
    borrowerReference = randomUUID(),
    createdAt = new Date(),
    updatedAt = new Date(),
    isDeleted = false, // Default to false, indicating the borrower is not deleted
  }: {
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
  } & Partial<Pick<Borrower, 'borrowerReference' | 'createdAt' | 'updatedAt' | 'isDeleted'>>) {
    this.borrowerReference = borrowerReference;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.contact = contact;
    this.booksBorrowed = booksBorrowed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
  }

  // Method to soft delete the borrower
  softDelete() {
    this.isDeleted = true;
    this.updatedAt = new Date(); // Update the updatedAt timestamp to reflect the deletion time
  }

  // Method to restore the borrower
  restore() {
    this.isDeleted = false;
    this.updatedAt = new Date(); // Update the updatedAt timestamp to reflect the restoration time
  }
  borrowBook(bookBorrowed:BookBorrowed){
    this.booksBorrowed.push(bookBorrowed);
    this.updatedAt = new Date(); // Update the updatedAt timestamp to reflect the restoration time
  }
  returnBook(bookReference: string, returnDate:Date)
  {
    // Find the book to return and update its returnDate
    const bookToReturnIndex = this.booksBorrowed.findIndex(bb => bb.bookReference === bookReference && !bb.returnDate);
    if (bookToReturnIndex !== -1) {
      this.booksBorrowed[bookToReturnIndex].returnDate = returnDate;
    } else {
      logEvent("ERROR", "not copy of this book in borrower's record");
      throw new AppError(ErrorType.ForbiddenError,"No copy of this book in borrower's record");
    }
  }
}


