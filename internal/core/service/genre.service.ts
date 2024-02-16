import { randomUUID } from "crypto";
import { IGenreRepositoryPort } from "../../port/repository-port/genre.repository.port";
import { IGenreServicePort } from "../../port/service-port/genre.service.port";
import { ICreateGenreDto } from "../domain/dto/genre.dto";
import { Genre } from "../domain/model/genre.model";


export class GenreService implements IGenreServicePort {
  constructor(private readonly genreRepository: IGenreRepositoryPort) {}

  async getAllGenres(page: number, pageSize: number): Promise<{ genres: Genre[]; total: number }> {
    return this.genreRepository.getAllGenres(page, pageSize);
  }

  async getGenreByReference(genreReference: string): Promise<Genre> {
    return this.genreRepository.getGenreByReference(genreReference);
  }

  async getGenreByName(name: string): Promise<Genre> {
    return this.genreRepository.getGenreByReference(name);
  }

  async createGenre(dto: ICreateGenreDto): Promise<Genre> {
    return this.genreRepository.createGenre(new Genre({ ...dto }));
  }

  async updateGenre(genreReference: string, updatedGenre: Genre): Promise<Genre> {
    await this.getGenreByReference(genreReference);
    return this.genreRepository.updateGenre(genreReference, updatedGenre);
  }

  async deleteGenre(genreReference: string): Promise<boolean> {
    await this.getGenreByReference(genreReference);
    return this.genreRepository.deleteGenre(genreReference);
  }
}
