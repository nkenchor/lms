import { randomUUID } from "crypto";
import { IBorrowerRepositoryPort } from "../../port/repository-port/borrower.repository.port";
import { IBorrowerServicePort } from "../../port/service-port/borrower.service.port";
import { ICreateBorrowerDto } from "../domain/dto/borrower.dto";
import { Borrower } from "../domain/model/borrower.model";
import { BookBorrowed } from "../domain/model/book.borrowed.model";


export class BorrowerService implements IBorrowerServicePort {
  constructor(private readonly borrowerRepository: IBorrowerRepositoryPort) {}

  async getAllBorrowers(page: number, pageSize: number): Promise<{ borrowers: Borrower[]; total: number }> {
    return this.borrowerRepository.getAllBorrowers(page, pageSize);
  }

  async getBorrowerByReference(borrowerReference: string): Promise<Borrower> {
    return this.borrowerRepository.getBorrowerByReference(borrowerReference);
  }

  async getBorrowerByName(name: string): Promise<Borrower> {
    return this.borrowerRepository.getBorrowerByReference(name);
  }

  async createBorrower(dto: ICreateBorrowerDto): Promise<Borrower> {
    return this.borrowerRepository.createBorrower(new Borrower({ ...dto }));
  }

  async updateBorrower(borrowerReference: string, updatedBorrower: Borrower): Promise<Borrower> {
    return this.borrowerRepository.updateBorrower(borrowerReference, updatedBorrower);
  }

  async deleteBorrower(borrowerReference: string): Promise<boolean> {
    return this.borrowerRepository.deleteBorrower(borrowerReference);
  }
  async addBookToBorrower(borrowerReference: string,bookBorrowed: BookBorrowed): Promise<boolean> {
    try {
      const borrower = await this.borrowerRepository.getBorrowerByReference(borrowerReference);
      if (!borrower) throw new Error("Borrower not found");

      

      // Assuming booksBorrowed is an array of BookBorrowed objects
      borrower.booksBorrowed.push(bookBorrowed);
      await this.borrowerRepository.updateBorrower(borrowerReference, borrower);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async collectBookFromBorrower(borrowerReference: string, bookReference: string, returnDate: Date): Promise<boolean> {
    try {
      const borrower = await this.borrowerRepository.getBorrowerByReference(borrowerReference);
      if (!borrower) throw new Error("Borrower not found");

      // Find the book to return and update its returnDate
      const bookToReturnIndex = borrower.booksBorrowed.findIndex(bb => bb.bookReference === bookReference && !bb.returnDate);
      if (bookToReturnIndex !== -1) {
        borrower.booksBorrowed[bookToReturnIndex].returnDate = returnDate;
      } else {
        throw new Error("Book not found in borrower's list");
      }

      await this.borrowerRepository.updateBorrower(borrowerReference, borrower);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

