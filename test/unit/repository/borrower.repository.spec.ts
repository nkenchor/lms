import { MongoClient, Db, Collection } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Borrower } from '../../../internal/core/domain/model/borrower.model';
import { BorrowerRepository } from '../../../internal/adapter/data-access/repository/borrower.repository';
import { RecordFilter } from '../../../internal/core/domain/const/record.filter';

describe('BorrowerRepository', () => {
  let mongoServer: MongoMemoryServer;
  let client: MongoClient;
  let db: Db;
  let collection: Collection<Borrower>;
  let borrowerRepository: BorrowerRepository;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    client = new MongoClient(uri);
    await client.connect();
    // Use a static database name or omit if you're okay with the default "test" database
    db = client.db("test");
    collection = db.collection<Borrower>('borrowers');
    borrowerRepository = new BorrowerRepository(db);
  });

  afterAll(async () => {
    await client.close();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await collection.deleteMany({});
  });

  describe('createBorrower', () => {
    it('should create a borrower successfully', async () => {
        const borrower = new Borrower({
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: new Date('1990-01-01'),
            contact: {
                email: 'johndoe@example.com',
                phone: '1234567890',
                address: {
                    street: '123 Main St',
                    city: 'Anytown',
                    state: 'Anystate',
                    zipCode: '12345',
                    country: 'AnyCountry',
                },
            },
            booksBorrowed: [],
        });

        await borrowerRepository.createBorrower(borrower);
        const insertedBorrower = await collection.findOne({ borrowerReference: borrower.borrowerReference });
        
        expect(insertedBorrower).toBeDefined();
        expect(insertedBorrower?.firstName).toBe('John');
        expect(insertedBorrower?.lastName).toBe('Doe');
        
        expect(insertedBorrower?.contact.email).toBe('johndoe@example.com');
    });
});


describe('updateBorrower', () => {
  let initialBorrower: Borrower;

  beforeEach(async () => {
      // Setup an initial borrower to be updated
      initialBorrower = new Borrower({
          firstName: 'Jane',
          lastName: 'Doe',
          dateOfBirth: new Date('1980-01-01'),
          contact: {
              email: 'janedoe@example.com',
              phone: '1234567890',
              address: {
                  street: '123 Main St',
                  city: 'Anytown',
                  state: 'Anystate',
                  zipCode: '12345',
                  country: 'AnyCountry',
              },
          },
          booksBorrowed: [],
      });

      // Insert the borrower into the database
      await collection.insertOne(initialBorrower);
  });

  it('should successfully update an existing borrower', async () => {
      const updatedContactEmail = 'updated.janedoe@example.com';
      await borrowerRepository.updateBorrower(initialBorrower.borrowerReference, {
          contact: { ...initialBorrower.contact, email: updatedContactEmail }
      });

      const updatedBorrower = await collection.findOne({ borrowerReference: initialBorrower.borrowerReference });
      expect(updatedBorrower).toBeDefined();
      expect(updatedBorrower?.contact.email).toBe(updatedContactEmail);
      // Add more assertions as needed to verify other updated properties
  });

  it('should throw an error if the borrower to update does not exist', async () => {
      const nonExistingReference = 'non-existent-reference';
      const updateAttempt = borrowerRepository.updateBorrower(nonExistingReference, {
          contact: { email: 'nonexistent@example.com' }
      });

      // Assuming updateBorrower is designed to throw an error when the borrower doesn't exist
      await expect(updateAttempt).rejects.toThrow();
  });
});

describe('deleteBorrower', () => {
  let borrowerToDelete: Borrower;

  beforeEach(async () => {
      // Setup a borrower to delete
      borrowerToDelete = new Borrower({
          firstName: 'Charles',
          lastName: 'Dickens',
          dateOfBirth: new Date('1812-02-07'),
          contact: {
              email: 'charles.dickens@example.com',
              phone: '1234567890',
              address: {
                  street: '123 Victorian St',
                  city: 'London',
                  state: 'London',
                  zipCode: 'E1 1AA',
                  country: 'England',
              },
          },
          booksBorrowed: [],
      });

      // Insert the borrower into the database
      await collection.insertOne(borrowerToDelete);
  });

  it('should successfully delete an existing borrower', async () => {
      await borrowerRepository.deleteBorrower(borrowerToDelete.borrowerReference);

      const deletedBorrower = await collection.findOne({ borrowerReference: borrowerToDelete.borrowerReference });
      expect(deletedBorrower).toBeNull(); // Expect the borrower to not be found after deletion
  });

  it('should throw an error if the borrower to delete does not exist', async () => {
      const nonExistingReference = 'non-existent-reference';
      const deleteAttempt = borrowerRepository.deleteBorrower(nonExistingReference);

      // Assuming deleteBorrower is designed to throw an error when the borrower doesn't exist
      await expect(deleteAttempt).rejects.toThrow();
  });
});


describe('getBorrowerByReference', () => {
  let existingBorrower: Borrower;

  beforeEach(async () => {
      // Setup an existing borrower for retrieval
      existingBorrower = new Borrower({
          firstName: 'Leo',
          lastName: 'Tolstoy',
          dateOfBirth: new Date('1828-09-09'),
          contact: {
              email: 'leo.tolstoy@example.com',
              phone: '1234567890',
              address: {
                  street: '123 Yasnaya Polyana',
                  city: 'Tula',
                  state: 'Tula Oblast',
                  zipCode: '300000',
                  country: 'Russia',
              },
          },
          booksBorrowed: [],
      });

      // Insert the borrower into the database
      await collection.insertOne(existingBorrower);
  });

  it('should retrieve a borrower by its reference', async () => {
      const retrievedBorrower = await borrowerRepository.getBorrowerByReference(existingBorrower.borrowerReference);

      expect(retrievedBorrower).toBeDefined();
      expect(retrievedBorrower.borrowerReference).toBe(existingBorrower.borrowerReference);
      expect(retrievedBorrower.firstName).toBe(existingBorrower.firstName);
      expect(retrievedBorrower.lastName).toBe(existingBorrower.lastName);
      // Add more assertions as needed to verify the retrieved borrower's properties
  });

  it('should throw an error if the borrower with the provided reference does not exist', async () => {
      const nonExistingReference = 'non-existent-reference';
      const retrievalAttempt = borrowerRepository.getBorrowerByReference(nonExistingReference);

      // Assuming getBorrowerByReference is designed to throw an error when the borrower doesn't exist
      await expect(retrievalAttempt).rejects.toThrow();
  });
});


describe('softDeleteBorrower', () => {
  let borrowerToSoftDelete: Borrower;

  beforeEach(async () => {
      // Setup a borrower to be soft-deleted
      borrowerToSoftDelete = new Borrower({
          firstName: 'Emily',
          lastName: 'Bronte',
          dateOfBirth: new Date('1818-07-30'),
          contact: {
              email: 'emily.bronte@example.com',
              phone: '1234567890',
              address: {
                  street: '123 Haworth Parsonage',
                  city: 'Haworth',
                  state: 'West Yorkshire',
                  zipCode: 'BD22 8DR',
                  country: 'England',
              },
          },
          booksBorrowed: [],
      });

      // Insert the borrower into the database
      await collection.insertOne(borrowerToSoftDelete);
  });

  it('should successfully soft delete an existing borrower', async () => {
      await borrowerRepository.softDeleteBorrower(borrowerToSoftDelete.borrowerReference);

      const softDeletedBorrower = await collection.findOne({ borrowerReference: borrowerToSoftDelete.borrowerReference });
      expect(softDeletedBorrower).toBeDefined();
      expect(softDeletedBorrower?.isDeleted).toBe(true); // Verify the borrower is marked as deleted
  });

  it('should throw an error if the borrower to soft delete does not exist', async () => {
      const nonExistingReference = 'non-existent-reference';
      const softDeleteAttempt = borrowerRepository.softDeleteBorrower(nonExistingReference);

      // Assuming softDeleteBorrower is designed to throw an error when the borrower doesn't exist
      await expect(softDeleteAttempt).rejects.toThrow();
  });
});
describe('getBorrowerByName', () => {
  beforeEach(async () => {
    await collection.insertMany([
      new Borrower({
        firstName: 'Jane',
        lastName: 'Austen',
        dateOfBirth: new Date('1775-12-16'),
        contact: { email: 'jane.austen@example.com' },
        booksBorrowed: [],
      }),
      new Borrower({
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('1990-01-01'),
        contact: { email: 'john.doe@example.com' },
        booksBorrowed: [],
      }),
    ]);
  });

  it('should retrieve borrowers by matching first name', async () => {
    const { borrowers, total } = await borrowerRepository.getBorrowerByName('Jane', 1, 10);
    expect(borrowers.length).toBeGreaterThan(0);
    expect(borrowers.some(b => b.firstName === 'Jane')).toBeTruthy();
    expect(total).toBeGreaterThanOrEqual(1);
  });

  it('should retrieve borrowers by matching last name', async () => {
    const { borrowers, total } = await borrowerRepository.getBorrowerByName('Doe', 1, 10);
    expect(borrowers.length).toBeGreaterThan(0);
    expect(borrowers.some(b => b.lastName === 'Doe')).toBeTruthy();
    expect(total).toBeGreaterThanOrEqual(1);
  });

  // Other tests remain unchanged
});

describe('getAllBorrowers', () => {
  beforeEach(async () => {
    await collection.insertMany([
      new Borrower({
        firstName: 'Miguel',
        lastName: 'de Cervantes',
        dateOfBirth: new Date('1547-09-29'),
        contact: { email: 'cervantes@example.com' },
        booksBorrowed: [],
        isDeleted: false,
      }),
      new Borrower({
        firstName: 'William',
        lastName: 'Shakespeare',
        dateOfBirth: new Date('1564-04-23'),
        contact: { email: 'shakespeare@example.com' },
        booksBorrowed: [],
        isDeleted: false,
      }),
     new Borrower({
        firstName: 'Leo',
        lastName: 'Tolstoy',
        dateOfBirth: new Date('1828-09-09'),
        contact: { email: 'tolstoy@example.com' },
        booksBorrowed: [],
        isDeleted: true, // This borrower is soft-deleted
      }),
    ]);
  });

  it('should retrieve all borrowers without filters', async () => {
    const { borrowers, total } = await borrowerRepository.getAllBorrowers(1, 10, RecordFilter.All);
    expect(total).toBe(3); // Includes soft-deleted
    expect(borrowers.length).toBe(3);
  });

  // Other tests remain unchanged
});
});