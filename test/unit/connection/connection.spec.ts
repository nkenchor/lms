import { MongoClient } from 'mongodb';
import Database from '../../../internal/adapter/data-access/database/connection'; // Adjust the import path as necessary


// Mock the configuration module
jest.mock('../../../configuration/ts/config', () => ({
  dbUrl: 'mongodb://localhost:27017',
  db: 'lms',
}));

// Setup mock for MongoClient methods
const mockConnect = jest.fn().mockResolvedValue(undefined);
const mockClose = jest.fn().mockResolvedValue(undefined);
const mockDb = jest.fn().mockReturnValue({ someProperty: 'dbInstance' }); // Mock any necessary Db methods or properties as needed

jest.mock('mongodb', () => ({
  MongoClient: jest.fn().mockImplementation(() => ({
    connect: mockConnect,
    close: mockClose,
    db: mockDb,
  })),
}));

describe('Database', () => {
  // Reset mocks before each test
  beforeEach(() => {
    mockConnect.mockClear();
    mockClose.mockClear();
    mockDb.mockClear();
  });

  it('connects to the database successfully', async () => {
    await Database.connect();
    expect(mockConnect).toHaveBeenCalledTimes(1); // Ensure connect is called once
  });

  it('returns a database instance on connect', async () => {
    const dbInstance = await Database.connect();
    expect(dbInstance).toBeDefined(); // dbInstance should be defined
    expect(mockDb).toHaveBeenCalledTimes(1); // Ensure db is called once to get the database instance
  });

  it('disconnects from the database successfully', async () => {
    await Database.connect(); // Ensure a connection exists to disconnect from
    await Database.disconnect();
    expect(mockClose).toHaveBeenCalledTimes(1); // Ensure close is called once
  });

  it('does not reconnect if already connected', async () => {
    await Database.connect();
    await Database.connect(); // Attempt to connect again
    expect(mockConnect).toHaveBeenCalledTimes(1); // Connect should be called only once due to connection reuse
  });
});
