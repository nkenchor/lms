import { CreateBorrowerDto, UpdateBorrowerDto } from "../../core/domain/dto/borrower.dto";
import { Borrower } from "../../core/domain/model/borrower.model";


export interface BorrowerServicePort {
  getAllBorrowers(page: number, pageSize: number): Promise<{ borrowers: Borrower[]; total: number }>;
  getBorrowerByReference(borrowerReference: string): Promise<Borrower>;
  createBorrower(borrower: CreateBorrowerDto): Promise<Borrower>;
  updateBorrower(borrowerReference: string, updatedBorrower: UpdateBorrowerDto): Promise<Borrower>;
  deleteBorrower(borrowerReference: string): Promise<boolean>;
}