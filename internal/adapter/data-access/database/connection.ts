import { MongoClient, Db } from 'mongodb';
import config from '../../../../configuration/ts/config';

class Database {
    private static client: MongoClient;
    private static isConnected: boolean = false; // Track connection status

    static async connect(): Promise<Db> {
        if (!this.client || !this.isConnected) {
            this.client = new MongoClient(config.dbUrl);
            try {
                await this.client.connect();
                this.isConnected = true; // Update connection status
                console.log("Connected successfully to MongoDB");
            } catch (err) {
                console.error("Could not connect to MongoDB", err);
                throw err;
            }
        }
        return this.client.db(config.db);
    }

    static async disconnect(): Promise<void> {
        if (this.client && this.isConnected) {
            await this.client.close();
            this.isConnected = false; // Update connection status
            console.log("Disconnected from MongoDB");
        }
    }
}

export default Database;
