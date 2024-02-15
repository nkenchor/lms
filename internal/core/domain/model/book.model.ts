import { Author } from "./author.model";
import { Genre } from "./genre.model";

export interface Book {
  bookReference: string; // Unique identifier for the book
  title: string; // Title of the book
  isbn: string; // International Standard Book Number
  authors: Author[]; // List of author names
  publicationDate: Date; // Date when the book was published
  language: string; // Language in which the book is written
  genre: Genre[]; // List of genres associated with the book
  synopsis: string; // Brief summary or description of the book
  pageCount: number; // Number of pages in the book
  publisher: string; // Publisher of the book
  availableCopies: number; // Number of available copies in the library
  totalCopies: number; // Total number of copies in the library
  createdAt: Date; // Date when the book record was created
  updatedAt: Date; // Date when the book record was last updated
}
  