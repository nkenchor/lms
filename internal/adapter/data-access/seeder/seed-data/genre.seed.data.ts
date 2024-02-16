import { Genre } from "../../../../core/domain/model/genre.model";


export const genresData: Genre[] = [
  new Genre({
    genreReference: "99e59f05-5fd6-4e3a-bc49-fc8e6afbb547",
    name: "Science Fiction",
    description: "A genre of speculative fiction that typically deals with imaginative and futuristic concepts.",
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false
  }),
  new Genre({
    genreReference: "7f194372-8b65-4d39-8fa0-5906cb8a1e27",
    name: "Fantasy",
    description: "A genre of speculative fiction set in a fictional universe, often inspired by mythology and folklore.",
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false
  }),
  new Genre({
    genreReference: "3d7bb345-1a1a-439e-90c8-0543d86a22d6",
    name: "Mystery",
    description: "A genre of fiction that revolves around the solution of a crime or puzzle.",
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false
  })
];


