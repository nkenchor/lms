import { Db as Database, Collection } from 'mongodb';
import { Book } from "../../../core/domain/model/book.model";
import { IBookRepositoryPort } from "../../../port/repository-port/book.repository.port";
import { AppError, ErrorType } from "../../helper/error.helper"; // Import your error helper
import { logEvent } from "../../middleware/log.middleware"; // Import your error helper
import { RecordFilter } from '../../../core/domain/const/record.filter';

export class BookRepository implements IBookRepositoryPort {
  private database: Database;
  private collectionName = 'books';

  constructor(database: Database) {
    this.database = database;
  }
  private getCollection(): Collection<Book> {
    return this.database.collection<Book>(this.collectionName);
  }



  
 
  async createBook(book: Book): Promise<Book> {
     // First, check if an author with the same first and last name already exists
     const existingBook = await this.getCollection().findOne({
        title: book.title,
    });

    // If an author already exists with the same first and last name, throw an error
    if (existingBook) {
        logEvent("ERROR", `Book already exists with title: ${book.title}`);
        throw new AppError(ErrorType.ConflictError, `Book already exists with title: ${book.title}`);
    }
    const result =await this.getCollection().insertOne(book);
    if (!result.acknowledged) {
      logEvent("ERROR", `failed to create book with reference: ${book.bookReference}`)
      throw new AppError(ErrorType.CreateError, `failed to create book with reference: ${book.bookReference}`);

  }

    return book;
  }
  

  async getBookByReference(bookReference: string): Promise<Book> {
    const book = await this.getCollection().findOne({bookReference: bookReference });
    if (!book) {
      logEvent("ERROR",`Book not found for reference: ${bookReference}`)
      throw new AppError(ErrorType.NoRecordError,`Book not found for reference: ${bookReference}`);
      
    }
    return book;
  }
  async getBookByName(title: string): Promise<Book> {
    // Using a regex to search for books that contain the 'name' string, case-insensitive
    const book = await this.getCollection().findOne({ title: { $regex: title, $options: 'i' } });
  
    if (!book) {
      const errorMessage = `Book not found for name: ${title}`;
      logEvent("ERROR", errorMessage);
      throw new AppError(ErrorType.NoRecordError, errorMessage);
    }
  
    return book;
  }
  

  async updateBook(bookReference: string, updatedBook: Book): Promise<Book> {
    const collection: Collection<Book> = this.getCollection();
    
    // Attempt to update the book directly without a preliminary fetch
    const result = await collection.findOneAndUpdate(
      { bookReference: bookReference },
      { $set: updatedBook },
      { returnDocument: 'after' }
    );
    
    // Check if the book was found and updated
    if (!result) {
      logEvent("ERROR", `Book not found for reference: ${bookReference}, update failed.`);
      throw new AppError(ErrorType.UpdateError, `Book not found for reference: ${bookReference}, update failed.`);
    }
    
    // Return the updated book
    return result;
  }

  async deleteBook(bookReference: string): Promise<boolean> {
    
   
    const result= await this.getCollection().findOneAndDelete({ bookReference: bookReference });
    
    if (!result) {
      logEvent("ERROR", `Error deleting book for reference: ${bookReference}, delete failed.`)
      throw new AppError(ErrorType.ServerError,`Error deleting book nfor reference: ${bookReference}, delete failed.`);

    }
    
    return true;
  }
  async softDeleteBook(bookReference: string): Promise<boolean> {
    const result = await this.getCollection().updateOne(
      { bookReference: bookReference },
      { $set: { isDeleted: true } }
    );

    if (!result.acknowledged || result.modifiedCount === 0) {
      logEvent("ERROR", `Failed to soft delete book with reference: ${bookReference}`);
      throw new AppError(ErrorType.UpdateError, `Failed to soft delete book with reference: ${bookReference}`);
    }

    return true;
  }

  async getAllBooks(page: number, pageSize: number, filter: RecordFilter = RecordFilter.All): Promise<{ books: Book[]; total: number }> {
    logEvent("INFO", "Getting all books with filter: " + filter);
    try {
      const skip = (page - 1) * pageSize;
      let query = {};
  
      // Adjust query based on filter
      switch (filter) {
        case RecordFilter.Deleted:
          query = { isDeleted: true };
          break;
        case RecordFilter.NotDeleted:
          query = { isDeleted: false };
          break;
        case RecordFilter.All:
        default:
          // No additional query constraints for 'All'
          break;
      }
  
      const [books, total] = await Promise.all([
        this.getCollection().find(query).skip(skip).limit(pageSize).toArray(), // Convert cursor to array
        this.getCollection().countDocuments(query),
      ]);
  
      // No need to throw an error for empty list, as it's a valid scenario
      return { books, total };
    } catch (error) {
      // Log or handle the error appropriately
      console.error("Error fetching books:", error);
      logEvent("ERROR", 'Unable to fetch books. ' + error);
      throw new AppError(ErrorType.ServerError, 'Unable to fetch books. ' + error);
    }
  }
  async getBooksByGenreReference(genreReference: string, page: number = 1, pageSize: number = 10): Promise<{ books: Book[]; total: number }> {
    const skip = (page - 1) * pageSize;
    try {
      const query = { "genre.genreReference": genreReference, isDeleted: {$ne: true} }; // Assuming genre is an array of objects
      const books = await this.getCollection().find(query).skip(skip).limit(pageSize).toArray();
      const total = await this.getCollection().countDocuments(query);

      return { books, total };
    } catch (error) {
      logEvent("ERROR", `Unable to fetch books for genre reference: ${genreReference}. Error: ${error}`);
      throw new AppError(ErrorType.ServerError, `Unable to fetch books for genre reference: ${genreReference}. Error: ${error}`);
    }
  }

  async getBooksByAuthorReference(authorReference: string, page: number = 1, pageSize: number = 10): Promise<{ books: Book[]; total: number }> {
    const skip = (page - 1) * pageSize;
    try {
      const query = { "authors.authorReference": authorReference, isDeleted: {$ne: true} }; // Assuming authors is an array of objects
      const books = await this.getCollection().find(query).skip(skip).limit(pageSize).toArray();
      const total = await this.getCollection().countDocuments(query);

      return { books, total };
    } catch (error) {
      logEvent("ERROR", `Unable to fetch books for author reference: ${authorReference}. Error: ${error}`);
      throw new AppError(ErrorType.ServerError, `Unable to fetch books for author reference: ${authorReference}. Error: ${error}`);
    }
  }
}
