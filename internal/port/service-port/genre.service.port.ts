import { RecordFilter } from "../../core/domain/const/record.filter";
import { ICreateGenreDto, IUpdateGenreDto } from "../../core/domain/dto/genre.dto";
import { Genre } from "../../core/domain/model/genre.model";


export interface IGenreServicePort {
  getAllGenres(page: number, pageSize: number,filter: RecordFilter): Promise<{ genres: Genre[]; total: number }>;
  getGenreByReference(genreReference: string): Promise<Genre>;
  createGenre(genre: ICreateGenreDto): Promise<Genre>;
  updateGenre(genreReference: string, updatedGenre: IUpdateGenreDto): Promise<Genre>;
  deleteGenre(genreReference: string): Promise<boolean>;
  softDeleteGenre(genreReference: string): Promise<boolean>;
  getGenreByName(name: string,page: number, pageSize: number): Promise<{ genres: Genre[]; total: number }>;
}