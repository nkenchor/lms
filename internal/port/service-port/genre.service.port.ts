import { CreateGenreDto, UpdateGenreDto } from "../../core/domain/dto/genre.dto";
import { Genre } from "../../core/domain/model/genre.model";


export interface GenreServicePort {
  getAllGenres(page: number, pageSize: number): Promise<{ genres: Genre[]; total: number }>;
  getGenreByReference(genreReference: string): Promise<Genre>;
  createGenre(genre: CreateGenreDto): Promise<Genre>;
  updateGenre(genreReference: string, updatedGenre: UpdateGenreDto): Promise<Genre>;
  deleteGenre(genreReference: string): Promise<boolean>;
}