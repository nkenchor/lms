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
  genre: Genre[];
  synopsis: string;
  pageCount: number;
  publisher: string;
  availableCopies: number;
  totalCopies: number;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    title,
    isbn,
    authors,
    language,
    genre,
    synopsis,
    pageCount,
    publisher,
    availableCopies = 0,
    totalCopies,
    bookReference = randomUUID(),
    publicationDate = new Date(),
    createdAt = new Date(),
    updatedAt = new Date(),
  }: {
    title: string;
    isbn: string;
    authors: Author[];
    language: string;
    genre: Genre[];
    synopsis: string;
    pageCount: number;
    publisher: string;
    totalCopies: number;
  } & Partial<Pick<Book, 'bookReference' | 'publicationDate' | 'availableCopies' | 'createdAt' | 'updatedAt'>>) {
    this.bookReference = bookReference;
    this.title = title;
    this.isbn = isbn;
    this.authors = authors;
    this.language = language;
    this.genre = genre;
    this.synopsis = synopsis;
    this.pageCount = pageCount;
    this.publisher = publisher;
    this.availableCopies = availableCopies;
    this.totalCopies = totalCopies;
    this.publicationDate = publicationDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
