import { MongoClient, Db, Collection } from 'mongodb';
import { Book } from "../../../internal/core/domain/model/book.model";
import { BookRepository } from '../../../internal/adapter/data-access/repository/book.repository';
import { GenreRepository } from '../../../internal/adapter/data-access/repository/genre.repository';
import { RecordFilter } from '../../../internal/core/domain/const/record.filter';
import { Author } from '../../../internal/core/domain/model/author.model';
import { Genre } from '../../../internal/core/domain/model/genre.model';

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
    
beforeEach(async () => {
    // Example authors and genres for demonstration purposes
    const exampleAuthors: Author[] = [new Author({
        authorReference:"09e59f89-5fd6-4e3a-bc49-fc8e6afbb547",
        firstName: "John",
        lastName: "Doe",
        biography: "Award winning poet",
        dateOfBirth: new Date("1980-01-01"),
        nationality: "American",
        contact: {
          email: "john.doe@example.com",
          phone: "1234567890",
          address: {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "USA",
          },
        },
        socialMedia: {
          twitter: "@johndoe",
          facebook: "johndoe",
          instagram: "johndoe",
        },
        awards: ["Best Author Award 2020", "Literary Excellence Award"],
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
      })];
    const exampleGenres: Genre[] = [new Genre({
        genreReference: "99e59f05-5fd6-4e3a-bc49-fc8e6afbb547",
        name: "Science Fiction",
        description: "A genre of speculative fiction that typically deals with imaginative and futuristic concepts.",
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false
      })];
  
    // Create instances of Book
    const booksToInsert = [
      new Book({
        title: 'Book One',
        isbn: 'ISBN1',
        authors: exampleAuthors,
        publicationDate: new Date(),
        language: 'English',
        genres: exampleGenres,
        synopsis: 'Synopsis of Book One',
        pageCount: 100,
        publisher: 'Publisher One',
        availableCopies: 10,
        totalCopies: 10,
      
      }),
      new Book({
        title: 'Book Two',
        isbn: 'ISBN2',
        authors: exampleAuthors,
        publicationDate: new Date(),
        language: 'English',
        genres: exampleGenres,
        synopsis: 'Synopsis of Book Two',
        pageCount: 150,
        publisher: 'Publisher Two',
        availableCopies: 15,
        totalCopies: 15,
   
      }),
   
    ];
  

  
    // Insert the books into the database
    await collection.insertMany(booksToInsert);
  });
  
    it('should return a paginated list of books and total count', async () => {
      const page = 1;
      const pageSize = 1;
      const filter = RecordFilter.All; // Adjust filter as needed for testing
  
      const result = await bookRepository.getAllBooks(page, pageSize, filter);
  
      expect(result.books.length).toBe(pageSize);
      expect(result.total).toBeGreaterThan(0);
 
    });
  
    
  });
  describe('softDeleteBook', () => {
    let bookToSoftDelete: Book;
  
    beforeEach(async () => 
      {
        const exampleAuthors: Author[] = [new Author({
            authorReference:"09e59f89-5fd6-4e3a-bc49-fc8e6afbb547",
            firstName: "John",
            lastName: "Doe",
            biography: "Award winning poet",
            dateOfBirth: new Date("1980-01-01"),
            nationality: "American",
            contact: {
              email: "john.doe@example.com",
              phone: "1234567890",
              address: {
                street: "123 Main St",
                city: "New York",
                state: "NY",
                zipCode: "10001",
                country: "USA",
              },
            },
            socialMedia: {
              twitter: "@johndoe",
              facebook: "johndoe",
              instagram: "johndoe",
            },
            awards: ["Best Author Award 2020", "Literary Excellence Award"],
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
          })];
        const exampleGenres: Genre[] = [new Genre({
            genreReference: "99e59f05-5fd6-4e3a-bc49-fc8e6afbb547",
            name: "Science Fiction",
            description: "A genre of speculative fiction that typically deals with imaginative and futuristic concepts.",
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false
          })];

      bookToSoftDelete = new Book({
        title: 'Book Two',
        isbn: 'ISBN2',
        authors: exampleAuthors,
        publicationDate: new Date(),
        language: 'English',
        genres: exampleGenres,
        synopsis: 'Synopsis of Book Two',
        pageCount: 150,
        publisher: 'Publisher Two',
        availableCopies: 15,
        totalCopies: 15,
        
      });
      await collection.insertOne(bookToSoftDelete);
    });
  
    it('should soft delete a book successfully', async () => {
      await bookRepository.softDeleteBook(bookToSoftDelete.bookReference);
  
      const softDeletedBook = await collection.findOne({ bookReference: bookToSoftDelete.bookReference });
      expect(softDeletedBook?.isDeleted).toBe(true);

    });
  
    it('should throw an error when trying to soft delete a non-existing book', async () => {
      const nonExistingBookReference = 'nonExistingSoftDeleteRef';
      await expect(bookRepository.softDeleteBook(nonExistingBookReference)).rejects.toThrow();
    });
  });
  
});