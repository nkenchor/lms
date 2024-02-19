
import { RecordFilter } from "../../core/domain/const/record.filter";
import { ICreateAuthorDto, IUpdateAuthorDto } from "../../core/domain/dto/author.dto";
import { Author } from "../../core/domain/model/author.model";


export interface IAuthorServicePort {
  getAllAuthors(page: number, pageSize: number,filter: RecordFilter): Promise<{ authors: Author[]; total: number }>;
  getAuthorByReference(authorReference: string): Promise<Author>;
  createAuthor(author: ICreateAuthorDto): Promise<Author>;
  updateAuthor(authorReference: string, updatedAuthor: IUpdateAuthorDto): Promise<Author>;
  deleteAuthor(authorReference: string): Promise<boolean>;
  softDeleteAuthor(authorReference: string): Promise<boolean>;
  getAuthorByName(name: string,page: number, pageSize: number): Promise<{ authors: Author[]; total: number }>;
}