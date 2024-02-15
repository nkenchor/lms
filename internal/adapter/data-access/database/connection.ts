

import { MongoClient, Db } from 'mongodb';
import config from '../../../../configuration/ts/config'; 

const url = config.dbUrl;
const dbName = config.db; // Database name

class Database {
    private static client: MongoClient;

    static async connect(): Promise<Db> {
        if (!this.client) {
            this.client = new MongoClient(url);
            try {
                await this.client.connect();
                console.log("Connected successfully to MongoDB");
            } catch (err) {
                console.error("Could not connect to MongoDB", err);
                throw err;
            }
        }
        return this.client.db(dbName);
    }

    static async disconnect(): Promise<void> {
        if (this.client) {
            await this.client.close();
            console.log("Disconnected from MongoDB");
        }
    }
}

export default Database;
