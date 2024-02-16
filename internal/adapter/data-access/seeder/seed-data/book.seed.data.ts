import { Book } from "../../../../core/domain/model/book.model";
import { Author } from "../../../../core/domain/model/author.model";
import { Genre } from "../../../../core/domain/model/genre.model";
import { randomUUID } from "crypto";

// Sample data for authors
const authorsData: Author[] = [
  new Author({
    authorReference:"09e59f89-5fd6-4e3a-bc49-fc8e6afbb547",
    firstName: "John",
    lastName: "Doe",
    biography: "Award winning poet",
    dateOfBirth: new Date("1980-01-01"),
    nationality: "American",
    contact: {
      email: "john.doe@example.com",
      phone: "1234567890",
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
    },
    socialMedia: {
      twitter: "@johndoe",
      facebook: "johndoe",
      instagram: "johndoe",
    },
    awards: ["Best Author Award 2020", "Literary Excellence Award"],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  }),
  
];

// Sample data for genres
const genresData: Genre[] = [
  new Genre({
    genreReference: "99e59f05-5fd6-4e3a-bc49-fc8e6afbb547",
    name: "Science Fiction",
    description: "A genre of speculative fiction that typically deals with imaginative and futuristic concepts.",
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false
  }),
 
];


const booksData: Book[] = [
  new Book({
    title: "Sample Book 1",
    isbn: "1234567890",
    authors: [authorsData[0]], // Using the first author from authorsData
    publicationDate: new Date("2023-01-01"),
    language: "English",
    genres: [genresData[0]], // Using the first genre from genresData
    synopsis: "This is a sample book synopsis 1.",
    pageCount: 250,
    publisher: "Sample Publisher 1",
    totalCopies: 10,
  }),
  new Book({
    title: "Sample Book 2",
    isbn: "2345678901",
    authors: [authorsData[1]], // Using the second author from authorsData
    publicationDate: new Date("2022-05-15"),
    language: "English",
    genres: [genresData[0]], // Using the second genre from genresData
    synopsis: "This is a sample book synopsis 2.",
    pageCount: 300,
    publisher: "Sample Publisher 2",
    totalCopies: 15,
  }),

];

export default booksData;
