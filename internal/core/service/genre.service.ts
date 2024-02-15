import { randomUUID } from "crypto";
import { GenreRepositoryPort } from "../../port/repository-port/genre.repository.port";
import { GenreServicePort } from "../../port/service-port/genre.service.port";
import { CreateGenreDto } from "../domain/dto/genre.dto";
import { Genre } from "../domain/model/genre.model";


export class GenreService implements GenreServicePort {
  constructor(private readonly genreRepository: GenreRepositoryPort) {}

  async getAllGenres(page: number, pageSize: number): Promise<{ genres: Genre[]; total: number }> {
    return this.genreRepository.getAllGenres(page, pageSize);
  }

  async getGenreByReference(genreReference: string): Promise<Genre> {
    return this.genreRepository.getGenreByReference(genreReference);
  }

  async createGenre(dto: CreateGenreDto): Promise<Genre> {
    return this.genreRepository.createGenre(new Genre({ ...dto }));
  }

  async updateGenre(genreReference: string, updatedGenre: Genre): Promise<Genre> {
    return this.genreRepository.updateGenre(genreReference, updatedGenre);
  }

  async deleteGenre(genreReference: string): Promise<boolean> {
    return this.genreRepository.deleteGenre(genreReference);
  }
}
