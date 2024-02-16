import { Book } from "../../core/domain/model/book.model";


export interface BookRepositoryPort {
  getAllBooks(page: number, pageSize: number): Promise<{ books: Book[]; total: number }>;
  getBookByReference(bookReference: string): Promise<Book>;
  createBook(book: Book): Promise<Book>;
  updateBook(bookReference: string, updatedBook: Book): Promise<Book>;
  deleteBook(bookReference: string): Promise<boolean>;
}