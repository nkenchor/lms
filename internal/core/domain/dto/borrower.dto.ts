import { BookBorrowed } from "../model/book.borrowed.model";

export interface ICreateBorrowerDto {
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
  booksBorrowed: BookBorrowed[]; // Assuming this can be empty at creation.
}

export interface IUpdateBorrowerDto {
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
  booksBorrowed?: BookBorrowed[]; // Assuming updates can modify this list.
}
