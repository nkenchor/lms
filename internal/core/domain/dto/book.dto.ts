import { Author } from "../model/author.model";
import { Genre } from "../model/genre.model";


// DTO for creating a new book
export interface CreateBookDto {
  title: string;
  isbn: string;
  authors: Author[];
  publicationDate: Date;
  language: string;
  genre: Genre[];
  synopsis: string;
  pageCount: number;
  publisher: string;
  totalCopies: number;
}

// DTO for updating an existing book
export interface UpdateBookDto {
  title?: string;
  isbn?: string;
  authors?: Author[];
  publicationDate?: Date;
  language?: string;
  genre?: Genre[];
  synopsis?: string;
  pageCount?: number;
  publisher?: string;
  totalCopies?: number;
}
