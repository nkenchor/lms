import { randomUUID } from "crypto";
import { IAuthorRepositoryPort } from "../../port/repository-port/author.repository.port";
import { IAuthorServicePort } from "../../port/service-port/author.service.port";
import { CreateAuthorDto } from "../domain/dto/author.dto";
import { Author } from "../domain/model/author.model";


export class AuthorService implements IAuthorServicePort {
  constructor(private readonly authorRepository: IAuthorRepositoryPort) {}

  async getAllAuthors(page: number, pageSize: number): Promise<{ authors: Author[]; total: number }> {
    return this.authorRepository.getAllAuthors(page, pageSize);
  }

  async getAuthorByReference(authorReference: string): Promise<Author> {
    return this.authorRepository.getAuthorByReference(authorReference);
  }

  async getAuthorByName(name: string): Promise<Author> {
    return this.authorRepository.getAuthorByReference(name);
  }

  async createAuthor(dto: CreateAuthorDto): Promise<Author> {
    return this.authorRepository.createAuthor(new Author({ ...dto }));
  }

  async updateAuthor(authorReference: string, updatedAuthor: Author): Promise<Author> {
    return this.authorRepository.updateAuthor(authorReference, updatedAuthor);
  }

  async deleteAuthor(authorReference: string): Promise<boolean> {
    return this.authorRepository.deleteAuthor(authorReference);
  }
}
