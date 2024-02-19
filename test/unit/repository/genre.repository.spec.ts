import { MongoClient, Db, Collection } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Genre } from '../../../internal/core/domain/model/genre.model';
import { GenreRepository } from '../../../internal/adapter/data-access/repository/genre.repository';
import { RecordFilter } from '../../../internal/core/domain/const/record.filter';

describe('GenreRepository', () => {
  let mongoServer: MongoMemoryServer;
  let client: MongoClient;
  let db: Db;
  let collection: Collection<Genre>; // Corrected: Define the collection properly
  let genreRepository: GenreRepository;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    client = new MongoClient(uri);
    await client.connect();
    // Use a static database name or omit if you're okay with the default "test" database
    db = client.db("test");
    collection = db.collection<Genre>('genres');
    genreRepository = new GenreRepository(db);
  });

  afterAll(async () => {
    await client.close(); // Close the MongoClient connection
    await mongoServer.stop(); // Stop the in-memory MongoDB server
  });

  beforeEach(async () => {
    // Clear the collection before each test
    await collection.deleteMany({});
  });

  describe('createGenre', () => {
    it('should create a genre successfully', async () => {
      const genre: Genre = {
        name: 'Fantasy',
        genreReference: 'fantasy-001',
        description: 'A genre of magical fiction',
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
        softDelete: function (): void {
          throw new Error('Function not implemented.');
        },
        restore: function (): void {
          throw new Error('Function not implemented.');
        }
      };

      await genreRepository.createGenre(genre);
      const insertedGenre = await collection.findOne({ genreReference: 'fantasy-001' });
      
      expect(insertedGenre).toBeDefined();
      expect(insertedGenre?.name).toBe('Fantasy');
      expect(insertedGenre?.description).toBe('A genre of magical fiction');
    });
  });
  describe('updateGenre', () => {
    let initialGenre: Genre;
  
    beforeEach(async () => {
      // Assuming Genre model is adjusted or genre object correctly implements softDelete and restore
      initialGenre = {
        name: 'Fantasy',
        genreReference: 'fantasy-001',
        description: 'A genre of magical fiction',
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
        softDelete: function (): void {},
        restore: function (): void {}
      };
  
      await collection.insertOne(initialGenre);
    });
  
    it('should successfully update an existing genre', async () => {
      const updatedDescription = 'Updated genre description';
      await genreRepository.updateGenre(initialGenre.genreReference, { description: updatedDescription });
    
      const updatedGenre = await collection.findOne({ genreReference: 'fantasy-001' });
      expect(updatedGenre).toBeDefined();
      expect(updatedGenre?.description).toBe(updatedDescription); // Ensure this is the correct field
    });
  
    it('should throw an error if the genre to update does not exist', async () => {
      const updateAttempt = genreRepository.updateGenre('non-existent-reference', {
        description: 'New Description',
        genreReference: '',
        name: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
        softDelete: function (): void {
          throw new Error('Function not implemented.');
        },
        restore: function (): void {
          throw new Error('Function not implemented.');
        }
      });
  
      // Assuming updateGenre is designed to throw an error when the genre doesn't exist
      await expect(updateAttempt).rejects.toThrow();
    });
  });
  describe('deleteGenre', () => {
    let genreToDelete: Genre;
  
    beforeEach(async () => {
      // Setup a genre to delete
      genreToDelete = {
        name: 'Mystery',
        genreReference: 'mystery-001',
        description: 'A genre of suspenseful fiction',
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
        softDelete: function (): void {},
        restore: function (): void {}
      };
  
      await collection.insertOne(genreToDelete);
    });
  
    it('should successfully delete an existing genre', async () => {
      await genreRepository.deleteGenre(genreToDelete.genreReference);
  
      const deletedGenre = await collection.findOne({ genreReference: genreToDelete.genreReference });
      expect(deletedGenre).toBeNull(); // Expect the genre to not be found after deletion
    });
  
    it('should throw an error if the genre to delete does not exist', async () => {
      const nonExistingReference = 'non-existent-reference';
      const deleteAttempt = genreRepository.deleteGenre(nonExistingReference);
  
      // Assuming deleteGenre is designed to throw an error when the genre doesn't exist
      await expect(deleteAttempt).rejects.toThrow();
    });
  });
  describe('getGenreByReference', () => {
    let existingGenre: Genre;

    beforeEach(async () => {
        // Setup an existing genre for retrieval
        existingGenre = {
            name: 'Thriller',
            genreReference: 'thriller-002',
            description: 'A genre characterized by suspense, tension, and excitement',
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
            softDelete: function (): void {},
            restore: function (): void {}
        };

        await collection.insertOne(existingGenre);
    });

    it('should retrieve a genre by its reference', async () => {
        const retrievedGenre = await genreRepository.getGenreByReference(existingGenre.genreReference);

        expect(retrievedGenre).toBeDefined();
        expect(retrievedGenre.genreReference).toBe(existingGenre.genreReference);
        expect(retrievedGenre.name).toBe(existingGenre.name);
        // Add more assertions as needed to verify the retrieved genre's properties
    });

    it('should throw an error if the genre with the provided reference does not exist', async () => {
        const nonExistingReference = 'non-existent-reference';
        const retrievalAttempt = genreRepository.getGenreByReference(nonExistingReference);

        // Assuming getGenreByReference is designed to throw an error when the genre doesn't exist
        await expect(retrievalAttempt).rejects.toThrow();
    });
});
describe('softDeleteGenre', () => {
  let genreToSoftDelete: Genre;

  beforeEach(async () => {
    // Setup a genre to soft delete
    genreToSoftDelete = {
      name: 'Science Fiction',
      genreReference: 'sci-fi-001',
      description: 'A genre that explores futuristic concepts',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      softDelete: function (): void {},
      restore: function (): void {}
    };

    await collection.insertOne(genreToSoftDelete);
  });

  it('should successfully soft delete an existing genre', async () => {
    await genreRepository.softDeleteGenre(genreToSoftDelete.genreReference);

    const softDeletedGenre = await collection.findOne({ genreReference: genreToSoftDelete.genreReference });
    expect(softDeletedGenre).toBeDefined();
    expect(softDeletedGenre?.isDeleted).toBe(true); // Assert the genre is marked as deleted
    expect(softDeletedGenre?.name).toBe(genreToSoftDelete.name); // Confirm other details remain unchanged
    expect(softDeletedGenre?.description).toBe(genreToSoftDelete.description);
    // If you're tracking soft delete timestamps, assert those as well
  });

  it('should throw an error if the genre to soft delete does not exist', async () => {
    const nonExistingReference = 'non-existent-reference';
    const softDeleteAttempt = genreRepository.softDeleteGenre(nonExistingReference);

    // Assuming softDeleteGenre is designed to throw an error when the genre doesn't exist
    await expect(softDeleteAttempt).rejects.toThrow();
  });
});

describe('getGenreByName', () => {
  let genre1: Genre, genre2: Genre;

  beforeEach(async () => {
    await collection.deleteMany({});

    // Setup genres for testing
    genre1 = {
      genreReference: 'uniqueGenreRef1',
      name: 'Science Fiction',
      description: 'A genre that explores futuristic concepts',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      softDelete: function (): void {},
      restore: function (): void {},
    };

    genre2 = {
      genreReference: 'uniqueGenreRef2',
      name: 'Science Fiction',
      description: 'A genre that explores futuristic concepts',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      softDelete: function (): void {},
      restore: function (): void {}
    };

    // Insert test genres into the database
    await collection.insertMany([genre1, genre2]);
  });

  afterEach(async () => {
    await collection.deleteMany({});
  });

  it('should retrieve genres by matching title with pagination', async () => {
    const page = 1;
    const pageSize = 1;
    const { genres, total } = await genreRepository.getGenreByName('Science Fiction', page, pageSize);

    expect(genres.length).toBe(1);
    expect(genres[0].name).toEqual('Science Fiction');
    expect(total).toBeGreaterThanOrEqual(1);
  });

  it('should handle case-insensitive search', async () => {
    const { genres, total } = await genreRepository.getGenreByName('science fiction', 1, 10);

    expect(genres.some(genre => genre.name.toLowerCase() === 'science fiction')).toBeTruthy();
    expect(total).toBeGreaterThanOrEqual(1);
  });

  it('should return an empty array if no genre matches the title', async () => {
    const { genres, total } = await genreRepository.getGenreByName('Nonexistent Genre', 1, 10);

    expect(genres.length).toBe(0);
    expect(total).toBe(0);
  });
});
describe('getAllGenres', () => {
  beforeEach(async () => {
    // Insert multiple genres for testing
    await collection.insertMany([
       {
        name: 'Thriller',
        genreReference: 'thriller-002',
        description: 'A genre characterized by suspense, tension, and excitement',
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
        softDelete: function (): void {},
        restore: function (): void {}
    },
    {
      name: 'Fantasy',
      genreReference: 'fantasy-002',
      description: 'A genre characterized by magical, fiction, and excitement',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      softDelete: function (): void {},
      restore: function (): void {}
  },
    ]);
  });

  it('should retrieve all genres', async () => {
    const { genres, total } = await genreRepository.getAllGenres(1, 10, RecordFilter.All);
    expect(genres.length).toBeGreaterThanOrEqual(2);
    expect(total).toBeGreaterThanOrEqual(2);
  });

  
});

});

