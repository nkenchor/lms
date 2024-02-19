import { Db as Database, Collection } from 'mongodb';
import { Borrower } from "../../../core/domain/model/borrower.model";
import { IBorrowerRepositoryPort } from "../../../port/repository-port/borrower.repository.port";
import { AppError, ErrorType } from "../../helper/error.helper"; // Import your error helper
import { logEvent } from "../../middleware/log.middleware"; // Import your error helper
import { RecordFilter } from '../../../core/domain/const/record.filter';

export class BorrowerRepository implements IBorrowerRepositoryPort {
  private database: Database;
  private collectionName = 'borrowers';

  constructor(database: Database) {
    this.database = database;
  }
  private getCollection(): Collection<Borrower> {
    return this.database.collection<Borrower>(this.collectionName);
  }



  
 //create borrower
  async createBorrower(borrower: Borrower): Promise<Borrower> {
     // First, check if an author with the same first and last name already exists
     const existingBorrower = await this.getCollection().findOne({
        firstName: borrower.firstName,
        lastName: borrower.lastName
    });

    // If an author already exists with the same first and last name, throw an error
    if (existingBorrower) {
        logEvent("ERROR", `Borrower already exists with name: ${borrower.firstName} ${borrower.lastName}`);
        throw new AppError(ErrorType.ConflictError, `Borrower already exists with name: ${borrower.firstName} ${borrower.lastName}`);
    }

    const result =await this.getCollection().insertOne(borrower);
    if (!result.acknowledged) {
      logEvent("ERROR", `failed to create borrower with reference: ${borrower.borrowerReference}`)
      throw new AppError(ErrorType.CreateError, `failed to create borrower with reference: ${borrower.borrowerReference}`);

  }

    return borrower;
  }
  
  //get borrower by reference
  async getBorrowerByReference(borrowerReference: string): Promise<Borrower> {
    const borrower = await this.getCollection().findOne({borrowerReference: borrowerReference });
    if (!borrower) {
      logEvent("ERROR",`Borrower not found for reference: ${borrowerReference}`)
      throw new AppError(ErrorType.NoRecordError,`Borrower not found for reference: ${borrowerReference}`);
      
    }
    return borrower;
  }
  //get borrower by name
  async getBorrowerByName(name: string, page: number, pageSize: number): Promise<{ borrowers: Borrower[]; total: number }> {
    logEvent("INFO", "Getting all borrowers with name: " + name);
    try {
        const skip = (page - 1) * pageSize;
        let query = {
            $or: [
                { firstName: { $regex: name, $options: 'i' } },
                { lastName: { $regex: name, $options: 'i' } }
            ]
        }; // Case-insensitive search for the name in both firstName and lastName

        // Use Promise.all to execute both queries in parallel
        const [borrowers, total] = await Promise.all([
            this.getCollection().find(query).skip(skip).limit(pageSize).toArray(), // Convert cursor to array
            this.getCollection().countDocuments(query),
        ]);

        // No need to throw an error for empty list, as it's a valid scenario
        return { borrowers, total };
    } catch (error) {
        console.error("Error fetching borrowers:", error);
        logEvent("ERROR", 'Unable to fetch borrowers. ' + error);
        throw new AppError(ErrorType.ServerError, 'Unable to fetch borrowers. ' + error);
    }
}

  
//update borrower
  async updateBorrower(borrowerReference: string, updatedBorrower:  Partial<Borrower>): Promise<Borrower> {
    const collection: Collection<Borrower> = this.getCollection();
    
    // Attempt to update the borrower directly without a preliminary fetch
    const result = await collection.findOneAndUpdate(
      { borrowerReference: borrowerReference },
      { $set: updatedBorrower },
      { returnDocument: 'after' }
    );
    
    // Check if the borrower was found and updated
    if (!result) {
      logEvent("ERROR", `Borrower not found for reference: ${borrowerReference}, update failed.`);
      throw new AppError(ErrorType.UpdateError, `Borrower not found for reference: ${borrowerReference}, update failed.`);
    }
    
    // Return the updated borrower
    return result;
  }
  //delete borrower
  async deleteBorrower(borrowerReference: string): Promise<boolean> {
    
   
    const result= await this.getCollection().findOneAndDelete({ borrowerReference: borrowerReference });
    
    if (!result) {
      logEvent("ERROR", `Error deleting borrower for reference: ${borrowerReference}, delete failed.`)
      throw new AppError(ErrorType.ServerError,`Error deleting borrower nfor reference: ${borrowerReference}, delete failed.`);

    }
    
    return true;
  }
  //soft delete borrower
  async softDeleteBorrower(borrowerReference: string): Promise<boolean> {
    const result = await this.getCollection().updateOne(
      { borrowerReference: borrowerReference },
      { $set: { isDeleted: true } }
    );

    if (!result.acknowledged || result.modifiedCount === 0) {
      logEvent("ERROR", `Failed to soft delete borrower with reference: ${borrowerReference}`);
      throw new AppError(ErrorType.UpdateError, `Failed to soft delete borrower with reference: ${borrowerReference}`);
    }

    return true;
  }

  //get all borrowers
  async getAllBorrowers(page: number, pageSize: number, filter: RecordFilter = RecordFilter.All): Promise<{ borrowers: Borrower[]; total: number }> {
    logEvent("INFO", "Getting all borrowers with filter: " + filter);
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
  
      const [borrowers, total] = await Promise.all([
        this.getCollection().find(query).skip(skip).limit(pageSize).toArray(), // Convert cursor to array
        this.getCollection().countDocuments(query),
      ]);
  
      // No need to throw an error for empty list, as it's a valid scenario
      return { borrowers, total };
    } catch (error) {
      // Log or handle the error appropriately
      console.error("Error fetching borrowers:", error);
      logEvent("ERROR", 'Unable to fetch borrowers. ' + error);
      throw new AppError(ErrorType.ServerError, 'Unable to fetch borrowers. ' + error);
    }
  }
  
}
