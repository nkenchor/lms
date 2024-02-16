import { Author } from "../../../../core/domain/model/author.model";


// Sample data for authors
export const authorsData = [
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
  new Author({
    authorReference:"79e59d89-5fd6-4e3a-bc49-fc8e6afbb547",
    firstName: "Alice",
    lastName: "Smith",
    biography: "Astonaut with a small sauce",
    dateOfBirth: new Date("1975-05-15"),
    nationality: "British",
    contact: {
      email: "alice.smith@example.com",
      phone: "9876543210",
      address: {
        street: "456 Elm St",
        city: "London",
        state: "",
        zipCode: "W1F 7LD",
        country: "UK",
      },
    },
    socialMedia: {
      twitter: "@alicesmith",
      facebook: "alicesmith",
      instagram: "alicesmith",
    },
    awards: ["Outstanding Contribution to Literature Award"],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  }),
  new Author({
    authorReference:"19e59f89-3fe6-4e3a-bc49-fc8e6afbb547",
    firstName: "Michael",
    lastName: "Johnson",
    biography: "A rigmaroler of the green moon",
    dateOfBirth: new Date("1990-09-20"),
    nationality: "Canadian",
    contact: {
      email: "michael.johnson@example.com",
    },
    socialMedia: {
      twitter: "@michaeljohnson",
      facebook: "michaeljohnson",
    },
    awards: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  }),
  new Author({
    authorReference:"59e59f89-5fd6-4e3a-dc49-fc8e6accb547",
    firstName: "Emma",
    lastName: "Brown",
    biography: "Great writer",
    dateOfBirth: new Date("1988-03-10"),
    nationality: "Australian",
    contact: {
      email: "emma.brown@example.com",
    },
    socialMedia: {
      instagram: "emmabrown",
    },
    awards: ["Young Author of the Year"],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  }),
  new Author({
    authorReference:"49e59f89-5fd6-4e3a-bc49-fc8e6afbb547",
    firstName: "Daniel",
    lastName: "Martinez",
    biography: "Philosopher",
    dateOfBirth: new Date("1972-11-30"),
    nationality: "Spanish",
    contact: {
      email: "daniel.martinez@example.com",
      phone: "1122334455",
      address: {
        street: "789 Oak St",
        city: "Madrid",
        state: "",
        zipCode: "28001",
        country: "Spain",
      },
    },
    socialMedia: {
      twitter: "@danielmartinez",
    },
    awards: ["Best-Selling Author Award"],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  })
];

