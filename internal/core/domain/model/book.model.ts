import { AppError, ErrorType } from "../../../adapter/helper/error.helper";
import { logEvent } from "../../../adapter/middleware/log.middleware";
import { Author } from "./author.model";
import { Genre } from "./genre.model";
import { randomUUID } from "crypto";

export class Book {
  bookReference: string;
  title: string;
  isbn: string;
  authors: Author[];
  publicationDate: Date;
  language: string;
  genres: Genre[];
  synopsis: string;
  pageCount: number;
  publisher: string;
  availableCopies: number;
  totalCopies: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean; // Indicates whether the book is soft-deleted

  constructor({
    title,
    isbn,
    authors,
    language,
    genres,
    synopsis,
    pageCount,
    publisher,
    availableCopies = 0,
    totalCopies,
    bookReference = randomUUID(),
    publicationDate = new Date(),
    createdAt = new Date(),
    updatedAt = new Date(),
    isDeleted = false, // Default to false, indicating the book is not deleted
  }: {
    title: string;
    isbn: string;
    authors: Author[];
    language: string;
    genres: Genre[];
    synopsis: string;
    pageCount: number;
    publisher: string;
    totalCopies: number;
  } & Partial<Pick<Book, 'bookReference' | 'publicationDate' | 'availableCopies' | 'createdAt' | 'updatedAt' | 'isDeleted'>>) {
    this.bookReference = bookReference;
    this.title = title;
    this.isbn = isbn;
    this.authors = authors;
    this.language = language;
    this.genres = genres;
    this.synopsis = synopsis;
    this.pageCount = pageCount;
    this.publisher = publisher;
    this.availableCopies = availableCopies;
    this.totalCopies = totalCopies;
    this.publicationDate = publicationDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
  }

  // Method to soft delete the book
  softDelete() {
    this.isDeleted = true;
    this.updatedAt = new Date(); // Update the updatedAt timestamp to reflect the deletion time
  }

  // Method to restore the book
  restore() {
    this.isDeleted = false;
    this.updatedAt = new Date(); // Update the updatedAt timestamp to reflect the restoration time
  }

  increaseAvailableCopies(){
    this.availableCopies +=1;
    this.updatedAt = new Date(); // Update the updatedAt timestamp to reflect the restoration time
  }
  decreaseAvailableCopies(){
    if (this.availableCopies <= 0) 
    {
      logEvent("ERROR", "No available copies to borrow");
      throw new AppError(ErrorType.ForbiddenError,"No available copies to borrow");

    };
   

    this.availableCopies -= 1;
    this.updatedAt = new Date(); // Update the updatedAt timestamp to reflect the restoration time
  }

}









