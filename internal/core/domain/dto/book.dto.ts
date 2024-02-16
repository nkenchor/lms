import { Author } from "../model/author.model";
import { Genre } from "../model/genre.model";

export interface ICreateBookDto {
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

export interface IUpdateBookDto {
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
