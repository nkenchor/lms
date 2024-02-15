import { Db as Database, Collection } from 'mongodb';
import { Genre } from "../../../core/domain/model/genre.model";
import { GenreRepositoryPort } from "../../../port/repository-port/genre.repository.port";
import { ErrorType } from "../../helper/error.helper"; // Import your error helper
import { logEvent } from "../../middleware/log.middleware"; // Import your error helper

export class GenreRepository implements GenreRepositoryPort {
  private database: Database;
  private collectionName = 'genres';

  constructor(database: Database) {
    this.database = database;
  }
  private getCollection(): Collection<Genre> {
    return this.database.collection<Genre>(this.collectionName);
  }

  async getAllGenres(page: number, pageSize: number): Promise<{ genres: Genre[]; total: number }> {
  logEvent("ERROR", "getting all genres");
  try {
    const skip = (page - 1) * pageSize;
    const [genres, total] = await Promise.all([
      this.getCollection().find().skip(skip).limit(pageSize).toArray(), // Convert cursor to array
      this.getCollection().countDocuments(),
    ]);

    // No need to throw an error for empty list, as it's a valid scenario
    return { genres, total };
  } catch (error) {
    // Log or handle the error appropriately
    console.error("Error fetching genres:", error);

    // Create a custom error message using your error helper
    logEvent("ERROR", error)
    throw { type: ErrorType.ServerError, message: 'Unable to fetch genre. '  + error};

  }
}

  
 
  async createGenre(genre: Genre): Promise<Genre> {
    await this.getCollection().insertOne(genre);
    // Assuming create always succeeds or throws an error, no need for null check
    return genre;
  }
  

  async getGenreByReference(genreReference: string): Promise<Genre> {
    const genre = await this.getCollection().findOne({ genreReference });
    if (!genre) {
      throw new Error(`Genre not found for reference: ${genreReference}`);
    }
    return genre;
  }

  async updateGenre(genreReference: string, updatedGenre: Genre): Promise<Genre> {
    const collection = this.getCollection();
    const result = await collection.findOneAndUpdate(
      { genreReference },
      { $set: updatedGenre },
      { returnDocument: 'after' }
    );

    if (!result) {
      throw new Error(`Genre not found for reference: ${genreReference}, update failed.`);
    }
    return result;
  }

  async deleteGenre(genreReference: string): Promise<boolean> {
    const result= await this.getCollection().deleteOne({ genreReference });
    if (!result) {
      throw new Error(`Genre not found for reference: ${genreReference}, delete failed.`);
    }
    // Return explicitly to indicate success, no value needed
    return true;
  }
}
