import { RecordFilter } from "../../core/domain/const/record.filter";
import { Book } from "../../core/domain/model/book.model";


export interface IBookRepositoryPort {
  getAllBooks(page: number, pageSize: number,filter: RecordFilter): Promise<{ books: Book[]; total: number }>;
  getBookByReference(bookReference: string): Promise<Book>;
  createBook(book: Book): Promise<Book>;
  updateBook(bookReference: string, updatedBook: Book): Promise<Book>;
  deleteBook(bookReference: string): Promise<boolean>;
  softDeleteBook(bookReference: string): Promise<boolean>;
  getBookByName(name: string): Promise<Book>
  getBooksByAuthorReference(authorReference: string, page: number, pageSize: number ): Promise<{ books: Book[]; total: number }>;
  getBooksByGenreReference(genreReference: string, page: number, pageSize: number): Promise<{ books: Book[]; total: number }>
  
}