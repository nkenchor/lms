import { randomUUID } from "crypto";
import { IBookRepositoryPort } from "../../port/repository-port/book.repository.port";
import { IBookServicePort } from "../../port/service-port/book.service.port";
import { ICreateBookDto } from "../domain/dto/book.dto";
import { Book } from "../domain/model/book.model";


export class BookService implements IBookServicePort {
  constructor(private readonly bookRepository: IBookRepositoryPort) {}

  async getAllBooks(page: number, pageSize: number): Promise<{ books: Book[]; total: number }> {
    return this.bookRepository.getAllBooks(page, pageSize);
  }

  async getBookByReference(bookReference: string): Promise<Book> {
    return this.bookRepository.getBookByReference(bookReference);
  }

  async getBookByName(name: string): Promise<Book> {
    return this.bookRepository.getBookByReference(name);
  }

  async createBook(dto: ICreateBookDto): Promise<Book> {
    return this.bookRepository.createBook(new Book({ ...dto }));
  }

  async updateBook(bookReference: string, updatedBook: Book): Promise<Book> {
    return this.bookRepository.updateBook(bookReference, updatedBook);
  }

  async deleteBook(bookReference: string): Promise<boolean> {
    return this.bookRepository.deleteBook(bookReference);
  }
}
