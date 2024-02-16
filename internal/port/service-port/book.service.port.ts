import { CreateBookDto, UpdateBookDto } from "../../core/domain/dto/book.dto";
import { Book } from "../../core/domain/model/book.model";


export interface BookServicePort {
  getAllBooks(page: number, pageSize: number): Promise<{ books: Book[]; total: number }>;
  getBookByReference(bookReference: string): Promise<Book>;
  createBook(book: CreateBookDto): Promise<Book>;
  updateBook(bookReference: string, updatedBook: UpdateBookDto): Promise<Book>;
  deleteBook(bookReference: string): Promise<boolean>;
}