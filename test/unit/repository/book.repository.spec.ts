import { MongoClient, Db, Collection } from 'mongodb';
import { Book } from "../../../internal/core/domain/model/book.model";
import { BookRepository } from '../../../internal/adapter/data-access/repository/book.repository';
import { GenreRepository } from '../../../internal/adapter/data-access/repository/genre.repository';

describe('BookRepository', () => {
  let client: MongoClient;
  let db: Db;
  let collection: Collection<Book>;
  let bookRepository: BookRepository;
    
  beforeAll(async () => {
    client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    db = client.db('test');
    collection = db.collection<Book>('books');
    bookRepository = new BookRepository(db);
  });

  afterAll(async () => {
    await client.close();
  });

  beforeEach(async () => {
    // Clear the collection before each test
    await collection.deleteMany({});
  });
GenreRepository;
  describe('createBook', () => {
    it('should create a book successfully', async () => {
      const book: Book = {
          title: 'Test Book',
          bookReference: '',
          isbn: '',
          authors: [],
          publicationDate: new Date(),
          language: '',
          genres: [],
          synopsis: '',
          pageCount: 0,
          publisher: '',
          availableCopies: 0,
          totalCopies: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isDeleted: false,
          softDelete: function (): void {
              throw new Error('Function not implemented.');
          },
          restore: function (): void {
              throw new Error('Function not implemented.');
          },
          increaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          },
          decreaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          }
      };

      const createdBook = await bookRepository.createBook(book);

      expect(createdBook).toBeDefined();
      expect(createdBook.title).toBe(book.title);
      // Add more assertions as needed
    });

    it('should throw an error if book already exists', async () => {
      // Insert a book with the same title before the test
      await collection.insertOne({
          title: 'Test Book',
          bookReference: '',
          isbn: '',
          authors: [],
          publicationDate: new Date(),
          language: '',
          genres: [],
          synopsis: '',
          pageCount: 0,
          publisher: '',
          availableCopies: 0,
          totalCopies: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isDeleted: false,
          softDelete: function (): void {
              throw new Error('Function not implemented.');
          },
          restore: function (): void {
              throw new Error('Function not implemented.');
          },
          increaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          },
          decreaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          }
      });

      const book: Book = {
          title: 'Test Book',
          bookReference: '',
          isbn: '',
          authors: [],
          publicationDate: new Date(),
          language: '',
          genres: [],
          synopsis: '',
          pageCount: 0,
          publisher: '',
          availableCopies: 0,
          totalCopies: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isDeleted: false,
          softDelete: function (): void {
              throw new Error('Function not implemented.');
          },
          restore: function (): void {
              throw new Error('Function not implemented.');
          },
          increaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          },
          decreaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          }
      };

      await expect(bookRepository.createBook(book)).rejects.toThrow();
    });
  });

  describe('getBookByReference', () => {
    it('should retrieve a book by its reference', async () => {
      // Insert a book into the database
      const insertedBook: Book = {
          title: 'Test Book',
          bookReference: '12345',
          isbn: '',
          authors: [],
          publicationDate: new Date(),
          language: '',
          genres: [],
          synopsis: '',
          pageCount: 0,
          publisher: '',
          availableCopies: 0,
          totalCopies: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isDeleted: false,
          softDelete: function (): void {
              throw new Error('Function not implemented.');
          },
          restore: function (): void {
              throw new Error('Function not implemented.');
          },
          increaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          },
          decreaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          }
      };
      await collection.insertOne(insertedBook);

      const retrievedBook = await bookRepository.getBookByReference('12345');

      expect(retrievedBook).toBeDefined();
      expect(retrievedBook.title).toBe(insertedBook.title);
      // Add more assertions as needed
    });

    it('should throw an error if book with the provided reference does not exist', async () => {
      await expect(bookRepository.getBookByReference('nonexistent_reference')).rejects.toThrow();
    });
    
  });

  describe('getBookByName', () => {
    it('should retrieve a book by its name', async () => {
      // Insert a book into the database
      const insertedBook: Book = {
          title: 'Test Book',
          bookReference: '',
          isbn: '',
          authors: [],
          publicationDate: new Date(),
          language: '',
          genres: [],
          synopsis: '',
          pageCount: 0,
          publisher: '',
          availableCopies: 0,
          totalCopies: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isDeleted: false,
          softDelete: function (): void {
              throw new Error('Function not implemented.');
          },
          restore: function (): void {
              throw new Error('Function not implemented.');
          },
          increaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          },
          decreaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          }
      };
      await collection.insertOne(insertedBook);
  
      const retrievedBook = await bookRepository.getBookByName('Test Book');
  
      expect(retrievedBook).toBeDefined();
      expect(retrievedBook.title).toBe(insertedBook.title);
      // Add more assertions as needed
    });
  
    it('should retrieve a book by a case-insensitive name', async () => {
      // Insert a book into the database
      const insertedBook: Book = {
          title: 'Test Book',
          bookReference: '',
          isbn: '',
          authors: [],
          publicationDate: new Date(),
          language: '',
          genres: [],
          synopsis: '',
          pageCount: 0,
          publisher: '',
          availableCopies: 0,
          totalCopies: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isDeleted: false,
          softDelete: function (): void {
              throw new Error('Function not implemented.');
          },
          restore: function (): void {
              throw new Error('Function not implemented.');
          },
          increaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          },
          decreaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          }
      };
      await collection.insertOne(insertedBook);
  
      const retrievedBook = await bookRepository.getBookByName('test book');
  
      expect(retrievedBook).toBeDefined();
      expect(retrievedBook.title).toBe(insertedBook.title);
      // Add more assertions as needed
    });
  
    it('should throw an error if no book exists with the provided name', async () => {
      await expect(bookRepository.getBookByName('Nonexistent Book')).rejects.toThrow();
    });
  });
  
  describe('updateBook', () => {
    it('should successfully update a book', async () => {
      // Insert a book into the database
      const insertedBook: Book = {
          title: 'Test Book',
          bookReference: '',
          isbn: '',
          authors: [],
          publicationDate: new  Date(),
          language: '',
          genres: [],
          synopsis: '',
          pageCount: 0,
          publisher: '',
          availableCopies: 0,
          totalCopies: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isDeleted: false,
          softDelete: function (): void {
              throw new Error('Function not implemented.');
          },
          restore: function (): void {
              throw new Error('Function not implemented.');
          },
          increaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          },
          decreaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          }
      };
      await collection.insertOne(insertedBook);
  
      // Define the updated book
      const updatedBook: Book = {
          ...insertedBook,
          title: 'Updated Test Book',
          softDelete: function (): void {
              throw new Error('Function not implemented.');
          },
          restore: function (): void {
              throw new Error('Function not implemented.');
          },
          increaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          },
          decreaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          }
      };
  
      // Update the book in the database
      await bookRepository.updateBook(insertedBook.bookReference, updatedBook);
  
      // Retrieve the updated book from the database
      const retrievedBook = await collection.findOne({ bookReference: insertedBook.bookReference });
  
      expect(retrievedBook).toBeDefined();
      expect(retrievedBook?.title).toBe(updatedBook.title);
      // Add more assertions as needed
    });
  
    it('should throw an error if the book to update does not exist', async () => {
      // Define a non-existing book reference
      const nonExistingBookReference = 'non-existing-reference';
  
      // Define the updated book
      const updatedBook: Book = {
          title: 'Updated Test Book',
          bookReference: '',
          isbn: '',
          authors: [],
          publicationDate: new Date(),
          language: '',
          genres: [],
          synopsis: '',
          pageCount: 0,
          publisher: '',
          availableCopies: 0,
          totalCopies: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isDeleted: false,
          softDelete: function (): void {
              throw new Error('Function not implemented.');
          },
          restore: function (): void {
              throw new Error('Function not implemented.');
          },
          increaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          },
          decreaseAvailableCopies: function (): void {
              throw new Error('Function not implemented.');
          }
      };
  
      // Attempt to update the non-existing book
      await expect(bookRepository.updateBook(nonExistingBookReference, updatedBook)).rejects.toThrow();
    });
  });
  
});