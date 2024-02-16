import { Author } from "../../../../core/domain/model/author.model";
import { AuthorRepository } from "../../repository/author.repository";
import { authorsData } from "../seed-data/author.seed.data";


export async function seedAuthors(authorRepository: AuthorRepository) {

  const authors = authorsData.map(author => new Author(author));
  for (const authorData of authorsData) {
    try {
      await authorRepository.createAuthor(authorData);
    } catch (error) {
      return;
    }
  }
  console.log(`Authors seeded successfully`);
}