import { Author } from "../model/author.model";
import { Genre } from "../model/genre.model";

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
  availableCopies: number;
  totalCopies: number;
}

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
  availableCopies?: number;
  totalCopies?: number;
}
