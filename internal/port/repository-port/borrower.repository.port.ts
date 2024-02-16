import { RecordFilter } from "../../core/domain/const/record.filter";
import { Borrower } from "../../core/domain/model/borrower.model";


export interface IBorrowerRepositoryPort {
  getAllBorrowers(page: number, pageSize: number,filter: RecordFilter): Promise<{ borrowers: Borrower[]; total: number }>;
  getBorrowerByReference(borrowerReference: string): Promise<Borrower>;
  createBorrower(borrower: Borrower): Promise<Borrower>;
  updateBorrower(borrowerReference: string, updatedBorrower: Borrower): Promise<Borrower>;
  deleteBorrower(borrowerReference: string): Promise<boolean>;
  softDeleteBorrower(borrowerReference: string): Promise<boolean>;
  getBorrowerByName(name: string): Promise<Borrower>
}