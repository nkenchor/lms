import { Borrower } from "../../../../core/domain/model/borrower.model";

import { BorrowerRepository } from "../../repository/borrower.repository";
import { borrowersData } from "../seed-data/borrower.seed.data";



export async function seedBorrowers(borrowerRepository: BorrowerRepository) {

  const borrowers = borrowersData.map(borrower => new Borrower(borrower));
  for (const borrowerData of borrowersData) {
    try {
      await borrowerRepository.createBorrower(borrowerData);
    } catch (error) {
        return;
    }
  }
  console.log(`Borrower seeded successfully`);
}