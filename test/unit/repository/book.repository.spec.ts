import { MongoClient, Db, Collection } from 'mongodb';
import { Book } from "../../../internal/core/domain/model/book.model";
import { BookRepository } from '../../../internal/adapter/data-access/repository/book.repository';
import { GenreRepository } from '../../../internal/adapter/data-access/repository/genre.repository';
import { RecordFilter } from '../../../internal/core/domain/const/record.filter';
import { Author } from '../../../internal/core/domain/model/author.model';
import { Genre } from '../../../internal/core/domain/model/genre.model';
import { MongoMemoryServer } from 'mongodb-memory-server';


describe('BookRepository', () => {
  let mongoServer: MongoMemoryServer;
  let client: MongoClient;
  let db: Db;
  let collection: Collection<Book>; // Corrected: Define the collection properly
  let bookRepository: BookRepository;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    client = new MongoClient(uri);
    await client.connect();
    // Use a static database name or omit if you're okay with the default "test" database
    db = client.db("test");
    collection = db.collection<Book>('books');
    bookRepository = new BookRepository(db);
  });

  afterAll(async () => {
    await client.close(); // Close the MongoClient connection
    await mongoServer.stop(); // Stop the in-memory MongoDB server
  });

  beforeEach(async () => {
    // Clear the collection before each test
    await collection.deleteMany({});
  });
 
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

    });

    it('should throw an error if book with the provided reference does not exist', async () => {
      await expect(bookRepository.getBookByReference('nonexistent_reference')).rejects.toThrow();
    });

  });

  describe('getBookByTitle', () => {
    let book1: Book, book2: Book;

    beforeEach(async () => {
      await collection.deleteMany({});

      // Setup books for testing
      book1 = {
        bookReference: 'uniqueBookRef1',
        title: 'Book One',
        isbn: 'ISBN1',
        authors: [new Author({
          authorReference: 'authorRef1',
          firstName: 'Jane',
          lastName: 'Austen',
          biography: 'An influential English writer.',
          contact: { email: 'jane.austen@example.com' }
          // other properties as needed
        })],
        publicationDate: new Date(),
        language: 'English',
        genres: [new Genre({
          genreReference: 'genreRef1',
          name: 'Sci-Fi',
          description: "A genre that explores futuristic concepts."
          // other properties as needed
        })],
        synopsis: 'Synopsis of Book One',
        pageCount: 100,
        publisher: 'Publisher One',
        availableCopies: 10,
        totalCopies: 10,
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

      book2 = {
        bookReference: 'uniqueBookRef2',
        title: '1984',
        isbn: '0987654321',
        authors:[new Author({
            authorReference: 'authorRef1',
            firstName: 'Jane',
            lastName: 'Austen',
            biography: 'An influential English writer.',
            contact: { email: 'jane.austen@example.com' }
            // other properties as needed
          })],
        publicationDate: new Date(),
        language: 'English',
        genres: [new Genre({
            genreReference: 'genreRef1',
            name: 'Sci-Fi',
            description: "A genre that explores futuristic concepts."
            // other properties as needed
        })],
        synopsis: 'Synopsis of 1984',
        pageCount: 200,
        publisher: 'Publisher Two',
        availableCopies: 5,
        totalCopies: 5,
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

      // Insert test books into the database
      await collection.insertMany([book1, book2]);
    });

    afterEach(async () => {
      await collection.deleteMany({});
    });

    it('should retrieve books by matching title with pagination', async () => {
      const page = 1;
      const pageSize = 1;
      const { books, total } = await bookRepository.getBookByTitle('Book One', page, pageSize);

      expect(books.length).toBe(1);
      expect(books[0].title).toEqual('Book One');
      expect(total).toBeGreaterThanOrEqual(1);
    });

    it('should handle case-insensitive search', async () => {
      const { books, total } = await bookRepository.getBookByTitle('book one', 1, 10);

      expect(books.some(book => book.title.toLowerCase() === 'book one')).toBeTruthy();
      expect(total).toBeGreaterThanOrEqual(1);
    });

    it('should return an empty array if no book matches the title', async () => {
      const { books, total } = await bookRepository.getBookByTitle('Nonexistent Book', 1, 10);

      expect(books.length).toBe(0);
      expect(total).toBe(0);
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
  describe('deleteBook', () => {
    let bookToDelete: Book;

    beforeEach(async () => {
      // Insert a book to delete before each test
      bookToDelete = {
        title: 'Book to Delete',
        bookReference: 'deleteRef',
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
      await collection.insertOne(bookToDelete);
    });

    it('should successfully delete an existing book', async () => {
      // Attempt to delete the book
      await bookRepository.deleteBook(bookToDelete.bookReference);

      // Verify the book has been deleted
      const deletedBook = await collection.findOne({ bookReference: bookToDelete.bookReference });
      expect(deletedBook).toBeNull();
    });

    it('should throw an error when trying to delete a book that does not exist', async () => {
      // Define a book reference that does not exist
      const nonExistingBookReference = 'nonExistingRef';

      // Expect the deletion to fail
      await expect(bookRepository.deleteBook(nonExistingBookReference)).rejects.toThrow();
    });

    // Additional cleanup if necessary
    afterEach(async () => {
      await collection.deleteMany({}); // Clear the collection after each test
    });
  });
  describe('getAllBooks', () => {
    let book1: Book, book2: Book, book3:Book;
  
    beforeEach(async () => {
      // Assuming createBook correctly handles book creation
      book1 = await bookRepository.createBook({
        title: 'Test Book 1',
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
      book2 = await bookRepository.createBook({
        title: 'Test Book 2',
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
      book3 = await bookRepository.createBook({
        title: 'Test Book 3',
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
  
      // Soft-delete one book for testing
      await bookRepository.softDeleteBook(book3.bookReference);
    });
  
    it('should retrieve all books without filters', async () => {
      const { books, total } = await bookRepository.getAllBooks(1, 10, RecordFilter.All);
      expect(total).toBe(3); // Includes soft-deleted books
      expect(books.length).toBe(3);
    });
  
    it('should retrieve only non-deleted books when NotDeleted filter is applied', async () => {
      const { books, total } = await bookRepository.getAllBooks(1, 10, RecordFilter.NotDeleted);
      expect(total).toBe(2); // Excludes soft-deleted books
      books.forEach(book => expect(book.isDeleted).toBe(false));
    });
  
    it('should retrieve only deleted books when Deleted filter is applied', async () => {
      const { books, total } = await bookRepository.getAllBooks(1, 10, RecordFilter.Deleted);
      expect(total).toBe(1); // Only the soft-deleted book
      books.forEach(book => expect(book.isDeleted).toBe(true));
    });
  
    afterEach(async () => {
      // Clean up the database
      await collection.deleteMany({});
    });
  });
  
  describe('softDeleteBook', () => {
    let bookToDelete:Book;
  
    beforeEach(async () => {
      // Insert a book to be soft-deleted
      bookToDelete = await bookRepository.createBook({
        title: 'Test Book 3',
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
    });
  
    it('should soft delete a book successfully', async () => {
      await bookRepository.softDeleteBook(bookToDelete.bookReference);
      const updatedBook = await bookRepository.getBookByReference(bookToDelete.bookReference);
      expect(updatedBook.isDeleted).toBe(true);
    });
  
    it('should throw an error if the book to soft delete does not exist', async () => {
      const nonExistingBookReference = 'nonExistingRef';
      await expect(bookRepository.softDeleteBook(nonExistingBookReference)).rejects.toThrow();
    });
  
    afterEach(async () => {
      // Clean up the database
      await collection.deleteMany({});
    });
  });
  

});