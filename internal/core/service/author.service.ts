
import { IAuthorRepositoryPort } from "../../port/repository-port/author.repository.port";
import { IAuthorServicePort } from "../../port/service-port/author.service.port";
import { ICreateAuthorDto } from "../domain/dto/author.dto";
import { Author } from "../domain/model/author.model";
import { RecordFilter } from "../domain/const/record.filter";


export class AuthorService implements IAuthorServicePort {
  constructor(private readonly authorRepository: IAuthorRepositoryPort) {}

  async getAllAuthors(page: number, pageSize: number,filter: RecordFilter): Promise<{ authors: Author[]; total: number }> {
    return this.authorRepository.getAllAuthors(page, pageSize,filter);
  }

  async getAuthorByReference(authorReference: string): Promise<Author> {
    return this.authorRepository.getAuthorByReference(authorReference);
  }

  async getAuthorByName(name: string): Promise<Author> {
    return this.authorRepository.getAuthorByName(name);
  }

  async createAuthor(dto: ICreateAuthorDto): Promise<Author> {
    return this.authorRepository.createAuthor(new Author({ ...dto }));
  }

  async updateAuthor(authorReference: string, updatedAuthor: Author): Promise<Author> {
    return this.authorRepository.updateAuthor(authorReference, updatedAuthor);
  }

  async deleteAuthor(authorReference: string): Promise<boolean> {
    return this.authorRepository.deleteAuthor(authorReference);
  }
  async softDeleteAuthor(authorReference: string): Promise<boolean> {
    return this.authorRepository.deleteAuthor(authorReference);
  }
}
