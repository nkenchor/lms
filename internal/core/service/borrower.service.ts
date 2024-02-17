
import { IBorrowerRepositoryPort } from "../../port/repository-port/borrower.repository.port";
import { IBorrowerServicePort } from "../../port/service-port/borrower.service.port";
import { ICreateBorrowerDto } from "../domain/dto/borrower.dto";
import { Borrower } from "../domain/model/borrower.model";
import { BookBorrowed } from "../domain/model/book.borrowed.model";
import { RecordFilter } from "../domain/const/record.filter";


export class BorrowerService implements IBorrowerServicePort {
  constructor(private readonly borrowerRepository: IBorrowerRepositoryPort) {}

  //gets all borrowers with pagination
  async getAllBorrowers(page: number, pageSize: number,filter: RecordFilter): Promise<{ borrowers: Borrower[]; total: number }> {
    return this.borrowerRepository.getAllBorrowers(page, pageSize,filter);
  }

  //gets borrowers by reference
  async getBorrowerByReference(borrowerReference: string): Promise<Borrower> {
    return this.borrowerRepository.getBorrowerByReference(borrowerReference);
  }

  //gets borrower by name
  async getBorrowerByName(name: string): Promise<Borrower> {
    return this.borrowerRepository.getBorrowerByName(name);
  }

  //creates borrower
  async createBorrower(dto: ICreateBorrowerDto): Promise<Borrower> {
    return this.borrowerRepository.createBorrower(new Borrower({ ...dto }));
  }

  //updates borrower
  async updateBorrower(borrowerReference: string, updatedBorrower: Borrower): Promise<Borrower> {
    return this.borrowerRepository.updateBorrower(borrowerReference, updatedBorrower);
  }

  //deletes borrower
  async deleteBorrower(borrowerReference: string): Promise<boolean> {
    return this.borrowerRepository.deleteBorrower(borrowerReference);
  }
  //soft deletes borrower
  async softDeleteBorrower(borrowerReference: string): Promise<boolean> {
    return this.borrowerRepository.softDeleteBorrower(borrowerReference);
  }
  //borrows a book
  async borrowBook(borrowerReference: string,bookBorrowed: BookBorrowed): Promise<boolean> {
    try {
      const borrower = await this.borrowerRepository.getBorrowerByReference(borrowerReference);
     
      borrower.borrowBook(bookBorrowed)
      await this.updateBorrower(borrowerReference, borrower);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  //returns a book
  async returnBook(borrowerReference: string, bookReference: string, returnDate: Date): Promise<boolean> {
    try {
      const borrower = await this.borrowerRepository.getBorrowerByReference(borrowerReference);

      borrower.returnBook(bookReference,new Date())

      await this.updateBorrower(borrowerReference, borrower);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

