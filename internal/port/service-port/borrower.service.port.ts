import { BookBorrowed } from './../../core/domain/model/book.borrowed.model';
import { ICreateBorrowerDto, IUpdateBorrowerDto } from "../../core/domain/dto/borrower.dto";
import { Borrower } from "../../core/domain/model/borrower.model";
import { RecordFilter } from '../../core/domain/const/record.filter';


export interface IBorrowerServicePort {
  getAllBorrowers(page: number, pageSize: number,filter: RecordFilter): Promise<{ borrowers: Borrower[]; total: number }>;
  getBorrowerByReference(borrowerReference: string): Promise<Borrower>;
  createBorrower(borrower: ICreateBorrowerDto): Promise<Borrower>;
  updateBorrower(borrowerReference: string, updatedBorrower: IUpdateBorrowerDto): Promise<Borrower>;
  deleteBorrower(borrowerReference: string): Promise<boolean>;
  softDeleteBorrower(borrowerReference: string): Promise<boolean>;
  getBorrowerByName(name: string): Promise<Borrower>
  borrowBook(borrowerReference: string,bookBorrowed: BookBorrowed): Promise<boolean>
  returnBook(borrowerReference: string,bookReference: string, returnDate: Date): Promise<boolean>
}