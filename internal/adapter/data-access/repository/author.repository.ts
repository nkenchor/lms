import { Db as Database, Collection } from 'mongodb';
import { Author } from "../../../core/domain/model/author.model";
import { IAuthorRepositoryPort } from "../../../port/repository-port/author.repository.port";
import { AppError, ErrorType } from "../../helper/error.helper"; // Import your error helper
import { logEvent } from "../../middleware/log.middleware"; // Import your error helper
import { RecordFilter } from '../../../core/domain/const/record.filter';

export class AuthorRepository implements IAuthorRepositoryPort {
  private database: Database;
  private collectionName = 'authors';

  constructor(database: Database) {
    this.database = database;
  }
  private getCollection(): Collection<Author> {
    return this.database.collection<Author>(this.collectionName);
  }


 
  async createAuthor(author: Author): Promise<Author> {
     // First, check if an author with the same first and last name already exists
     const existingAuthor = await this.getCollection().findOne({
        firstName: author.firstName,
        lastName: author.lastName
    });

    // If an author already exists with the same first and last name, throw an error
    if (existingAuthor) {
        logEvent("ERROR", `Author already exists with name: ${author.firstName} ${author.lastName}`);
        throw new AppError(ErrorType.ConflictError, `Author already exists with name: ${author.firstName} ${author.lastName}`);
    }
    
    const result =await this.getCollection().insertOne(author);
    if (!result.acknowledged) {
      logEvent("ERROR", `failed to create author with reference: ${author.authorReference}`)
      throw new AppError(ErrorType.CreateError, `failed to create author with reference: ${author.authorReference}`);

  }

    return author;
  }
  

  async getAuthorByReference(authorReference: string): Promise<Author> {
    const author = await this.getCollection().findOne({authorReference: authorReference });
    if (!author) {
      logEvent("ERROR",`Author not found for reference: ${authorReference}`)
      throw new AppError(ErrorType.NoRecordError,`Author not found for reference: ${authorReference}`);
      
    }
    return author;
  }
  async getAuthorByName(name: string, page: number, pageSize: number): Promise<{ authors: Author[]; total: number }> {
    logEvent("INFO", "Getting all authors with name: " + name);
    try {
        const skip = (page - 1) * pageSize;
        let query = {
            $or: [
                { firstName: { $regex: name, $options: 'i' } },
                { lastName: { $regex: name, $options: 'i' } }
            ]
        }; // Case-insensitive search for the name in both firstName and lastName

        // Use Promise.all to execute both queries in parallel
        const [authors, total] = await Promise.all([
            this.getCollection().find(query).skip(skip).limit(pageSize).toArray(), // Convert cursor to array
            this.getCollection().countDocuments(query),
        ]);

        // No need to throw an error for empty list, as it's a valid scenario
        return { authors, total };
    } catch (error) {
        console.error("Error fetching authors:", error);
        logEvent("ERROR", 'Unable to fetch authors. ' + error);
        throw new AppError(ErrorType.ServerError, 'Unable to fetch authors. ' + error);
    }
}

  

  async updateAuthor(authorReference: string, updatedAuthor:  Partial<Author>): Promise<Author> {
    const collection: Collection<Author> = this.getCollection();
    
    // Attempt to update the author directly without a preliminary fetch
    const result = await collection.findOneAndUpdate(
      { authorReference: authorReference },
      { $set: updatedAuthor },
      { returnDocument: 'after' }
    );
    
    // Check if the author was found and updated
    if (!result) {
      logEvent("ERROR", `Author not found for reference: ${authorReference}, update failed.`);
      throw new AppError(ErrorType.UpdateError, `Author not found for reference: ${authorReference}, update failed.`);
    }
    
    // Return the updated author
    return result;
  }

  async deleteAuthor(authorReference: string): Promise<boolean> {
    
   
    const result= await this.getCollection().findOneAndDelete({ authorReference: authorReference });
    
    if (!result) {
      logEvent("ERROR", `Error deleting author for reference: ${authorReference}, delete failed.`)
      throw new AppError(ErrorType.ServerError,`Error deleting author nfor reference: ${authorReference}, delete failed.`);

    }
    
    return true;
  }
  async softDeleteAuthor(authorReference: string): Promise<boolean> {
    const result = await this.getCollection().updateOne(
      { authorReference: authorReference },
      { $set: { isDeleted: true } }
    );

    if (!result.acknowledged || result.modifiedCount === 0) {
      logEvent("ERROR", `Failed to soft delete author with reference: ${authorReference}`);
      throw new AppError(ErrorType.UpdateError, `Failed to soft delete author with reference: ${authorReference}`);
    }

    return true;
  }

  async getAllAuthors(page: number, pageSize: number, filter: RecordFilter = RecordFilter.All): Promise<{ authors: Author[]; total: number }> {
    logEvent("INFO", "Getting all authors with filter: " + filter);
    try {
      const skip = (page - 1) * pageSize;
      let query = {};
  
      // Adjust query based on filter
      switch (filter) {
        case RecordFilter.Deleted:
          query = { isDeleted: true };
          break;
        case RecordFilter.NotDeleted:
          query = { isDeleted: false };
          break;
        case RecordFilter.All:
        default:
          // No additional query constraints for 'All'
          break;
      }
  
      const [authors, total] = await Promise.all([
        this.getCollection().find(query).skip(skip).limit(pageSize).toArray(), // Convert cursor to array
        this.getCollection().countDocuments(query),
      ]);
  
      // No need to throw an error for empty list, as it's a valid scenario
      return { authors, total };
    } catch (error) {
      // Log or handle the error appropriately
      console.error("Error fetching authors:", error);
      logEvent("ERROR", 'Unable to fetch authors. ' + error);
      throw new AppError(ErrorType.ServerError, 'Unable to fetch authors. ' + error);
    }
  }
  
}
