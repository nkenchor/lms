import { RecordFilter } from "../../core/domain/const/record.filter";
import { ICreateBookDto, IUpdateBookDto } from "../../core/domain/dto/book.dto";
import { Book } from "../../core/domain/model/book.model";
import { Borrower } from "../../core/domain/model/borrower.model";


export interface IBookServicePort {
  getAllBooks(page: number, pageSize: number,filter: RecordFilter): Promise<{ books: Book[]; total: number }>;
  getBookByReference(bookReference: string): Promise<Book>;
  createBook(book: ICreateBookDto): Promise<Book>;
  updateBook(bookReference: string, updatedBook: IUpdateBookDto): Promise<Book>;
  deleteBook(bookReference: string): Promise<boolean>;
  softDeleteBook(bookReference: string): Promise<boolean>;
  getBookByName(name: string): Promise<Book>
  increaseAvailableCopies(bookReference:string): Promise<boolean>;
  decreaseAvailableCopies(bookReference:string): Promise<boolean>;
  getBooksByAuthorReference(authorReference: string, page: number, pageSize: number ): Promise<{ books: Book[]; total: number }>;
  getBooksByGenreReference(genreReference: string, page: number, pageSize: number): Promise<{ books: Book[]; total: number }>

}
