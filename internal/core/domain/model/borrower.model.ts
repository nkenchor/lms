import { randomUUID } from "crypto";
import { BookBorrowed } from "./book.borrowed.model";

export class Borrower {
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

  constructor({
    firstName,
    lastName,
    dateOfBirth,
    contact,
    booksBorrowed,
    borrowerReference = randomUUID(),
    createdAt = new Date(),
    updatedAt = new Date(),
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
  } & Partial<Pick<Borrower, 'borrowerReference' | 'createdAt' | 'updatedAt'>>) {
    this.borrowerReference = borrowerReference;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.contact = contact;
    this.booksBorrowed = booksBorrowed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}