import { BookBorrowed } from './../../core/domain/model/book.borrowed.model';
import { ICreateBorrowerDto, IUpdateBorrowerDto } from "../../core/domain/dto/borrower.dto";
import { Borrower } from "../../core/domain/model/borrower.model";


export interface IBorrowerServicePort {
  getAllBorrowers(page: number, pageSize: number): Promise<{ borrowers: Borrower[]; total: number }>;
  getBorrowerByReference(borrowerReference: string): Promise<Borrower>;
  createBorrower(borrower: ICreateBorrowerDto): Promise<Borrower>;
  updateBorrower(borrowerReference: string, updatedBorrower: IUpdateBorrowerDto): Promise<Borrower>;
  deleteBorrower(borrowerReference: string): Promise<boolean>;
  getBorrowerByName(name: string): Promise<Borrower>
  addBookToBorrower(borrowerReference: string,bookBorrowed: BookBorrowed): Promise<boolean>
  collectBookFromBorrower(borrowerReference: string,bookReference: string, returnDate: Date): Promise<boolean>
}