import { MongoClient, Db, Collection} from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Author } from '../../../internal/core/domain/model/author.model';
import { AuthorRepository } from '../../../internal/adapter/data-access/repository/author.repository';
import { RecordFilter } from '../../../internal/core/domain/const/record.filter';

describe('AuthorRepository', () => {
  let mongoServer: MongoMemoryServer;
  let client: MongoClient;
  let db: Db;
  let collection: Collection<Author>;
  let authorRepository: AuthorRepository;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    client = new MongoClient(uri);
    await client.connect();
    // Use a static database name or omit if you're okay with the default "test" database
    db = client.db("test");
    collection = db.collection<Author>('authors');
    authorRepository = new AuthorRepository(db);
  });

  afterAll(async () => {
    await client.close();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await collection.deleteMany({});
  });

  describe('createAuthor', () => {
    it('should create an author successfully', async () => {
      const author = new Author({
        firstName: 'John',
        lastName: 'Doe',
        biography: 'John Doe biography',
        contact: { email: 'johndoe@example.com' },
      });

      await authorRepository.createAuthor(author);
      const insertedAuthor = await collection.findOne({ authorReference: author.authorReference });
      
      expect(insertedAuthor).toBeDefined();
      expect(insertedAuthor?.firstName).toBe('John');
      expect(insertedAuthor?.lastName).toBe('Doe');
      expect(insertedAuthor?.biography).toBe('John Doe biography');
      // Add more assertions as needed
    });
  });

  describe('updateAuthor', () => {
    let initialAuthor: Author;
  
    beforeEach(async () => {
      initialAuthor = new Author({
        firstName: 'Jane',
        lastName: 'Doe',
        biography: 'Jane Doe biography',
        contact: { email: 'janedoe@example.com' },
      });
  
      await collection.insertOne(initialAuthor);
    });
  
    it('should successfully update an existing author', async () => {
      const updatedBiography = 'Updated Jane Doe biography';
      await authorRepository.updateAuthor(initialAuthor.authorReference, { biography: updatedBiography });
    
      const updatedAuthor = await collection.findOne({ authorReference: initialAuthor.authorReference });
      expect(updatedAuthor).toBeDefined();
      expect(updatedAuthor?.biography).toBe(updatedBiography);
    });

  
    it('should throw an error if the author to update does not exist', async () => {
      const updateAttempt = authorRepository.updateAuthor('non-existent-reference', {
          firstName: 'John',
          lastName: 'Doe',
          biography: 'John Doe biography',
          contact: { email: 'johndoe@example.com' },
        });
  
      // Assuming updateAuthor is designed to throw an error when the author doesn't exist
      await expect(updateAttempt).rejects.toThrow();
    });
  });
  describe('deleteAuthor', () => {
    let authorToDelete: Author;

    beforeEach(async () => {
        // Setup an author to delete
        authorToDelete = new Author({
            firstName: 'Mark',
            lastName: 'Twain',
            biography: 'Biography of Mark Twain',
            contact: { email: 'marktwain@example.com' },
        });

        await collection.insertOne(authorToDelete);
    });

    it('should successfully delete an existing author', async () => {
        await authorRepository.deleteAuthor(authorToDelete.authorReference);

        const deletedAuthor = await collection.findOne({ authorReference: authorToDelete.authorReference });
        expect(deletedAuthor).toBeNull(); // Expect the author to not be found after deletion
    });

    it('should throw an error if the author to delete does not exist', async () => {
        const nonExistingReference = 'non-existent-reference';
        const deleteAttempt = authorRepository.deleteAuthor(nonExistingReference);

        // Assuming deleteAuthor is designed to throw an error when the author doesn't exist
        await expect(deleteAttempt).rejects.toThrow();
    });
});

describe('getAuthorByReference', () => {
  let existingAuthor: Author;

  beforeEach(async () => {
      // Setup an existing author for retrieval
      existingAuthor = new Author({
          firstName: 'George',
          lastName: 'Orwell',
          biography: 'George Orwell was an English novelist, essayist, journalist, and critic.',
          contact: { email: 'george.orwell@example.com' },
      });

      // Insert the author into the database
      await collection.insertOne(existingAuthor);
  });

  it('should retrieve an author by its reference', async () => {
      const retrievedAuthor = await authorRepository.getAuthorByReference(existingAuthor.authorReference);

      expect(retrievedAuthor).toBeDefined();
      expect(retrievedAuthor.authorReference).toBe(existingAuthor.authorReference);
      expect(retrievedAuthor.firstName).toBe(existingAuthor.firstName);
      expect(retrievedAuthor.lastName).toBe(existingAuthor.lastName);
      // Add more assertions as needed to verify the retrieved author's properties
  });

  it('should throw an error if the author with the provided reference does not exist', async () => {
      const nonExistingReference = 'non-existent-reference';
      const retrievalAttempt = authorRepository.getAuthorByReference(nonExistingReference);

      // Assuming getAuthorByReference is designed to throw an error when the author doesn't exist
      await expect(retrievalAttempt).rejects.toThrow();
  });
});

describe('softDeleteAuthor', () => {
  let authorToSoftDelete: Author;

  beforeEach(async () => {
      // Setup an author to be soft-deleted
      authorToSoftDelete = new Author({
          firstName: 'Virginia',
          lastName: 'Woolf',
          biography: 'Virginia Woolf was an English writer, considered one of the most important modernist 20th-century authors.',
          contact: { email: 'virginia.woolf@example.com' },
      });

      // Insert the author into the database
      await collection.insertOne(authorToSoftDelete);
  });

  it('should successfully soft delete an existing author', async () => {
      await authorRepository.softDeleteAuthor(authorToSoftDelete.authorReference);

      const softDeletedAuthor = await collection.findOne({ authorReference: authorToSoftDelete.authorReference });
      expect(softDeletedAuthor).toBeDefined();
      expect(softDeletedAuthor?.isDeleted).toBe(true); // Verify the author is marked as deleted
  });

  it('should throw an error if the author to soft delete does not exist', async () => {
      const nonExistingReference = 'non-existent-reference';
      const softDeleteAttempt = authorRepository.softDeleteAuthor(nonExistingReference);

      // Assuming softDeleteAuthor is designed to throw an error when the author doesn't exist
      await expect(softDeleteAttempt).rejects.toThrow();
  });
});describe('getAuthorByName', () => {
  let author1: Author, author2: Author;

  beforeEach(async () => {
    author1 = new Author({
  
      firstName: 'Jane',
      lastName: 'Austen',
      biography: 'English writer, considered one of the most important modernist 20th-century authors.',
      contact: { email: 'jane.austen@example.com' },
    })

    author2 = new Author({
      firstName: 'John',
      lastName: 'Doe',
      biography: 'Fictional character used as a placeholder.',
      contact: { email: 'john.doe@example.com' },
    });

    await collection.insertMany([author1, author2]);
  });

  afterEach(async () => {
    await collection.deleteMany({});
  });

  it('should retrieve authors by matching first name', async () => {
    const { authors, total } = await authorRepository.getAuthorByName('Jane', 1, 10);
    
    expect(authors.length).toBeGreaterThan(0);
    expect(authors.some(a => a.firstName === 'Jane')).toBeTruthy();
    expect(total).toBeGreaterThanOrEqual(1);
  });

  it('should retrieve authors by matching last name', async () => {
    const { authors, total } = await authorRepository.getAuthorByName('Doe', 1, 10);

    expect(authors.length).toBeGreaterThan(0);
    expect(authors.some(a => a.lastName === 'Doe')).toBeTruthy();
    expect(total).toBeGreaterThanOrEqual(1);
  });

  it('should return an empty list and total of 0 if no author is found with the given name', async () => {
    const { authors, total } = await authorRepository.getAuthorByName('Nonexistent', 1, 10);
    
    expect(authors.length).toBe(0);
    expect(total).toBe(0);
  });

  it('should handle pagination correctly', async () => {
    const pageSize = 1;
    const { authors: firstPageAuthors } = await authorRepository.getAuthorByName('e', 1, pageSize);
    const { authors: secondPageAuthors } = await authorRepository.getAuthorByName('e', 2, pageSize);

    expect(firstPageAuthors.length).toBe(pageSize);
    expect(secondPageAuthors.length).toBe(pageSize);
    expect(firstPageAuthors[0].authorReference).not.toBe(secondPageAuthors[0].authorReference);
  });
});
describe('getAllAuthors', () => {
  let author1: Author, author2:Author, author3: Author;

  beforeEach(async () => {
    author1 = new Author({
      firstName: 'Miguel',
      lastName: 'de Cervantes',
      biography: 'Spanish writer, known for Don Quixote.',
      contact: { email: 'cervantes@example.com' },
      isDeleted: false,
    });

    author2 = new Author({
      firstName: 'William',
      lastName: 'Shakespeare',
      biography: 'English playwright, widely regarded as the greatest writer in the English language.',
      contact: { email: 'shakespeare@example.com' },
      isDeleted: false,
    });

    author3 = new Author({
      firstName: 'Leo',
      lastName: 'Tolstoy',
      biography: 'Russian writer, known for War and Peace.',
      contact: { email: 'tolstoy@example.com' },
      isDeleted: true,
    });

    await collection.insertMany([author1, author2, author3]);
  });

  afterEach(async () => {
    await collection.deleteMany({});
  });

  it('should retrieve all authors without filters', async () => {
    const { authors, total } = await authorRepository.getAllAuthors(1, 10, RecordFilter.All);

    expect(authors.length).toBeGreaterThanOrEqual(3); // Including soft-deleted
    expect(total).toBeGreaterThanOrEqual(3);
  });

  it('should only retrieve non-deleted authors when NotDeleted filter is applied', async () => {
    const { authors, total } = await authorRepository.getAllAuthors(1, 10, RecordFilter.NotDeleted);

    expect(authors.length).toBeGreaterThanOrEqual(2); // Excluding soft-deleted
    expect(total).toBeGreaterThanOrEqual(2);
    expect(authors.every(a => !a.isDeleted)).toBeTruthy();
  });

  it('should only retrieve deleted authors when Deleted filter is applied', async () => {
    const { authors, total } = await authorRepository.getAllAuthors(1, 10, RecordFilter.Deleted);

    expect(authors.length).toBeGreaterThanOrEqual(1); // Only soft-deleted
    expect(total).toBeGreaterThanOrEqual(1);
    expect(authors.every(a => a.isDeleted)).toBeTruthy();
  });

  it('should handle pagination correctly', async () => {
    const pageSize = 1;
    const { authors: firstPageAuthors, total: firstPageTotal } = await authorRepository.getAllAuthors(1, pageSize, RecordFilter.NotDeleted);
    const { authors: secondPageAuthors, total: secondPageTotal } = await authorRepository.getAllAuthors(2, pageSize, RecordFilter.NotDeleted);

    expect(firstPageAuthors.length).toBe(pageSize);
    expect(secondPageAuthors.length).toBe(pageSize);
    expect(firstPageTotal).toBe(2); // Assuming there are two non-deleted authors
    expect(secondPageTotal).toBe(2);
    expect(firstPageAuthors[0].authorReference).not.toBe(secondPageAuthors[0].authorReference);
  });
});

});

