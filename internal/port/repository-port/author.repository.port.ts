import { Author } from "../../core/domain/model/author.model";


export interface IAuthorRepositoryPort {
  getAllAuthors(page: number, pageSize: number): Promise<{ authors: Author[]; total: number }>;
  getAuthorByReference(authorReference: string): Promise<Author>;
  createAuthor(author: Author): Promise<Author>;
  updateAuthor(authorReference: string, updatedAuthor: Author): Promise<Author>;
  deleteAuthor(authorReference: string): Promise<boolean>;
  getAuthorByName(name: string): Promise<Author>
}