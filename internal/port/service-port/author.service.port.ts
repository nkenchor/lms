
import { Author } from "../../core/domain/model/author.model";


export interface AuthorServicePort {
  getAllAuthors(page: number, pageSize: number): Promise<{ authors: Author[]; total: number }>;
  getAuthorByReference(authorReference: string): Promise<Author>;
  createAuthor(author: CreateAuthorDto): Promise<Author>;
  updateAuthor(authorReference: string, updatedAuthor: UpdateAuthorDto): Promise<Author>;
  deleteAuthor(authorReference: string): Promise<boolean>;
}