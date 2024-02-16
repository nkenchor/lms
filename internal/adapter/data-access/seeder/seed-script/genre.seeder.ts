import { GenreRepository } from './../../repository/genre.repository';
import { Genre } from "../../../../core/domain/model/genre.model";
import { genresData } from "../seed-data/genre.seed.data";


export async function seedGenres(genreRepository: GenreRepository) {

  const genres = genresData.map(genre => new Genre(genre));
  for (const genreData of genresData) {
    try {
      await genreRepository.createGenre(genreData);
    } catch (error) {
        return;
    }
  }
  console.log(`Genres seeded successfully`);
}