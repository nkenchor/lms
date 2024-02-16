import { randomUUID } from "crypto";
import { IBorrowerRepositoryPort } from "../../port/repository-port/borrower.repository.port";
import { IBorrowerServicePort } from "../../port/service-port/borrower.service.port";
import { ICreateBorrowerDto } from "../domain/dto/borrower.dto";
import { Borrower } from "../domain/model/borrower.model";


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
}
