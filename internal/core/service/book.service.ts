
import { IBookRepositoryPort } from "../../port/repository-port/book.repository.port";
import { IBookServicePort } from "../../port/service-port/book.service.port";
import { ICreateBookDto, IUpdateBookDto } from "../domain/dto/book.dto";
import { Book } from "../domain/model/book.model";
import { RecordFilter } from "../domain/const/record.filter";
import { IGenreRepositoryPort } from "../../port/repository-port/genre.repository.port";
import { IAuthorRepositoryPort } from "../../port/repository-port/author.repository.port";


export class BookService implements IBookServicePort {
  constructor(private readonly bookRepository: IBookRepositoryPort,
    private readonly genreRepository: IGenreRepositoryPort,
    private readonly authorRepository: IAuthorRepositoryPort) { }

  //Get all books
  async getAllBooks(page: number, pageSize: number, filter: RecordFilter): Promise<{ books: Book[]; total: number }> {
    return this.bookRepository.getAllBooks(page, pageSize, filter);
  }
  // Get all Books by Author reference
  async getBooksByAuthorReference(authorReference: string, page: number, pageSize: number): Promise<{ books: Book[]; total: number }> {
    return this.bookRepository.getBooksByAuthorReference(authorReference, page, pageSize);
  }
  //get books by genre reference
  async getBooksByGenreReference(genreReference: string, page: number, pageSize: number): Promise<{ books: Book[]; total: number }> {
    return this.bookRepository.getBooksByGenreReference(genreReference, page, pageSize);
  }
  //get book by reference
  async getBookByReference(bookReference: string): Promise<Book> {
    return this.bookRepository.getBookByReference(bookReference);
  }

  //get book by name
  async getBookByName(name: string): Promise<Book> {
    return this.bookRepository.getBookByName(name);
  }

  //create book
  async createBook(dto: ICreateBookDto): Promise<Book> {
    // Fetch genres by their references
    const genres = await Promise.all(dto.genreReferences.map(genreRef => this.genreRepository.getGenreByReference(genreRef)));

    // Fetch authors by their references
    const authors = await Promise.all(dto.authorReferences.map(authorRef => this.authorRepository.getAuthorByReference(authorRef)));

    // Now, with both genres and authors fetched, create the Book instance
    const book = new Book({
      ...dto, // Spread the other properties from dto
      genres, // Provide the fetched genres
      authors, // Provide the fetched authors
    });

    return this.bookRepository.createBook(book);
  }
  //update book
  async updateBook(bookReference: string, dto: IUpdateBookDto): Promise<Book> {


    // Fetch the existing book to ensure it exists
    const existingBook = await this.bookRepository.getBookByReference(bookReference);
    if (!existingBook) {
      throw new Error('Book not found');
    }

    // Fetch genres by their references if provided
    let genres;
    if (dto.genreReferences) {
      genres = await Promise.all(dto.genreReferences.map(genreRef => this.genreRepository.getGenreByReference(genreRef)));
    }

    // Fetch authors by their references if provided
    let authors;
    if (dto.authorReferences) {
      authors = await Promise.all(dto.authorReferences.map(authorRef => this.authorRepository.getAuthorByReference(authorRef)));
    }

    const bookToUpdate = new Book(existingBook); // Create a Book instance from the existing data

    if (genres) bookToUpdate.genres = genres;
    if (authors) bookToUpdate.authors = authors;

    await this.bookRepository.updateBook(bookReference, bookToUpdate);
    return bookToUpdate;
  }


  //delete a book
  async deleteBook(bookReference: string): Promise<boolean> {
    return this.bookRepository.deleteBook(bookReference);
  }

  // soft delete a book
  async softDeleteBook(bookReference: string): Promise<boolean> {
    return this.bookRepository.softDeleteBook(bookReference);
  }
  // increase available copies of the book
  async increaseAvailableCopies(bookReference: string): Promise<boolean> {
    try {
      const book = await this.bookRepository.getBookByReference(bookReference);

      book.increaseAvailableCopies();
      await this.updateBook(bookReference, book);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  //decrease available copies 
  async decreaseAvailableCopies(bookReference: string): Promise<boolean> {
    try {
      const book = await this.bookRepository.getBookByReference(bookReference);

      book.decreaseAvailableCopies();
      await this.updateBook(bookReference, book);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
