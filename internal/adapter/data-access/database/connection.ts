// Import MongoDB client and database types, and application configuration
import { MongoClient, Db } from 'mongodb';
import config from '../../../../configuration/ts/config';

// Extract database connection URL and database name from configuration
const url = config.dbUrl;
const dbName = config.db; // Database name

// Database class to manage MongoDB connections
class Database {
    // Static MongoDB client instance to ensure a single connection per application
    private static client: MongoClient;

    // Connects to the MongoDB database, creating a client if one doesn't already exist
    static async connect(): Promise<Db> {
        if (!this.client) {
            // Initialize MongoDB client with connection URL
            this.client = new MongoClient(url);
            try {
                // Attempt to connect to MongoDB
                await this.client.connect();
                console.log("Connected successfully to MongoDB");
            } catch (err) {
                // Log and re-throw any connection errors for upstream handling
                console.error("Could not connect to MongoDB", err);
                throw err;
            }
        }
        // Return the database instance to use for queries
        return this.client.db(dbName);
    }

    // Disconnects from the MongoDB database if a client exists
    static async disconnect(): Promise<void> {
        if (this.client) {
            // Close the MongoDB client connection
            await this.client.close();
            console.log("Disconnected from MongoDB");
        }
    }
}

// Export the Database class for use in other parts of the application
export default Database;
