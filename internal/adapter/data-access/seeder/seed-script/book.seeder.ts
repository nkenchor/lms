import { Book } from "../../../../core/domain/model/book.model";
import { BookService } from "../../../../core/service/book.service";
import { BookRepository } from "../../repository/book.repository";
import booksData from "../seed-data/book.seed.data";


export async function seedBooks(bookRepository: BookRepository) {

  const books = booksData.map(book => new Book(book));
  for (const bookData of booksData) {
    try {
      await bookRepository.createBook(bookData);
     
    } catch (error) {
        return;
    }
  }
  console.log(`Book seeded successfully`);
}