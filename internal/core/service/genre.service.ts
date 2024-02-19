
import { IGenreRepositoryPort } from "../../port/repository-port/genre.repository.port";
import { IGenreServicePort } from "../../port/service-port/genre.service.port";
import { ICreateGenreDto } from "../domain/dto/genre.dto";
import { Genre } from "../domain/model/genre.model";
import { logEvent } from "../../adapter/middleware/log.middleware";
import { AppError, ErrorType } from "../../adapter/helper/error.helper";
import { RecordFilter } from "../domain/const/record.filter";
import { IBookRepositoryPort } from "../../port/repository-port/book.repository.port";


export class GenreService implements IGenreServicePort {
  constructor(private readonly genreRepository: IGenreRepositoryPort, private readonly bookRepository: IBookRepositoryPort) { }

  //gets all genres with pagination
  async getAllGenres(page: number, pageSize: number, recordFilter: RecordFilter): Promise<{ genres: Genre[]; total: number }> {
    return this.genreRepository.getAllGenres(page, pageSize, recordFilter);
  }

  //gets genre by ref
  async getGenreByReference(genreReference: string): Promise<Genre> {
    return this.genreRepository.getGenreByReference(genreReference);
  }

  //gets genre by name
  async getGenreByName(name: string,page: number, pageSize: number): Promise<{ genres: Genre[]; total: number }> {
    return this.genreRepository.getGenreByName(name,page, pageSize);
  }

  //creates genre
  async createGenre(dto: ICreateGenreDto): Promise<Genre> {
    return this.genreRepository.createGenre(new Genre({ ...dto }));
  }

  //updates genre
  async updateGenre(genreReference: string, updatedGenre: Genre): Promise<Genre> {
    await this.getGenreByReference(genreReference);
    return this.genreRepository.updateGenre(genreReference, updatedGenre);
  }

  //delete genre
  async deleteGenre(genreReference: string): Promise<boolean> {
    await this.getGenreByReference(genreReference);
    const books = await this.bookRepository.getBooksByGenreReference(genreReference, 1, 1);
    if (books.total > 0) {
      logEvent("ERROR", `unable to delete genre. books are still tied to this genre`);
      throw new AppError(ErrorType.ForbiddenError, `unable to delete genre. books are still tied to this genre`);
    }
    return this.genreRepository.deleteGenre(genreReference);
  }
  async softDeleteGenre(genreReference: string): Promise<boolean> {
    await this.getGenreByReference(genreReference);
    return this.genreRepository.softDeleteGenre(genreReference);
  }
}
