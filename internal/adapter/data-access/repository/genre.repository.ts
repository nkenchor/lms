import { Db as Database, Collection } from 'mongodb';
import { Genre } from "../../../core/domain/model/genre.model";
import { IGenreRepositoryPort } from "../../../port/repository-port/genre.repository.port";
import { AppError, ErrorType } from "../../helper/error.helper"; // Import your error helper
import { logEvent } from "../../middleware/log.middleware"; // Import your error helper

export class GenreRepository implements IGenreRepositoryPort {
  private database: Database;
  private collectionName = 'genres';

  constructor(database: Database) {
    this.database = database;
  }
  private getCollection(): Collection<Genre> {
    return this.database.collection<Genre>(this.collectionName);
  }

  async getAllGenres(page: number, pageSize: number): Promise<{ genres: Genre[]; total: number }> {
  logEvent("INFO", "getting all genres");
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
    logEvent("ERROR",'Unable to fetch genre. '  + error)
    
    throw new AppError(ErrorType.ServerError, 'Unable to fetch genre. '  + error);


  }
}

  
 
  async createGenre(genre: Genre): Promise<Genre> {
    const result =await this.getCollection().insertOne(genre);
    if (!result.acknowledged) {
      logEvent("ERROR", `failed to create genre with reference: ${genre.genreReference}`)
      throw new AppError(ErrorType.CreateError, `failed to create genre with reference: ${genre.genreReference}`);

  }

    return genre;
  }
  

  async getGenreByReference(genreReference: string): Promise<Genre> {
    const genre = await this.getCollection().findOne({genreReference: genreReference });
    if (!genre) {
      logEvent("ERROR",`Genre not found for reference: ${genreReference}`)
      throw new AppError(ErrorType.NoRecordError,`Genre not found for reference: ${genreReference}`);
      
    }
    return genre;
  }
  async getGenreByName(name: string): Promise<Genre> {
    // Using a regex to search for genres that contain the 'name' string, case-insensitive
    const genre = await this.getCollection().findOne({ name: { $regex: name, $options: 'i' } });
  
    if (!genre) {
      const errorMessage = `Genre not found for name: ${name}`;
      logEvent("ERROR", errorMessage);
      throw new AppError(ErrorType.NoRecordError, errorMessage);
    }
  
    return genre;
  }
  

  async updateGenre(genreReference: string, updatedGenre: Genre): Promise<Genre> {
    const collection: Collection<Genre> = this.getCollection();
    
    // Attempt to update the genre directly without a preliminary fetch
    const result = await collection.findOneAndUpdate(
      { genreReference: genreReference },
      { $set: updatedGenre },
      { returnDocument: 'after' }
    );
    
    // Check if the genre was found and updated
    if (!result) {
      logEvent("ERROR", `Genre not found for reference: ${genreReference}, update failed.`);
      throw new AppError(ErrorType.UpdateError, `Genre not found for reference: ${genreReference}, update failed.`);
    }
    
    // Return the updated genre
    return result;
  }

  async deleteGenre(genreReference: string): Promise<boolean> {
    
   
    const result= await this.getCollection().findOneAndDelete({ genreReference: genreReference });
    if (!result) {
      logEvent("ERROR", `Error deleting genre for reference: ${genreReference}, delete failed.`)
      throw new AppError(ErrorType.ServerError,`Error deleting genre nfor reference: ${genreReference}, delete failed.`);

    }
    
    return true;
  }
}
