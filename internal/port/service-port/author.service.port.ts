
import { CreateAuthorDto, IUpdateAuthorDto } from "../../core/domain/dto/author.dto";
import { Author } from "../../core/domain/model/author.model";


export interface IAuthorServicePort {
  getAllAuthors(page: number, pageSize: number): Promise<{ authors: Author[]; total: number }>;
  getAuthorByReference(authorReference: string): Promise<Author>;
  createAuthor(author: CreateAuthorDto): Promise<Author>;
  updateAuthor(authorReference: string, updatedAuthor: IUpdateAuthorDto): Promise<Author>;
  deleteAuthor(authorReference: string): Promise<boolean>;
  getAuthorByName(name: string): Promise<Author>
}