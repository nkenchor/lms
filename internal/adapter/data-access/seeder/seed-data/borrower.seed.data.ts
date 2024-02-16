import { randomUUID } from "crypto";

import { Borrower } from "../../../../core/domain/model/borrower.model";

export const borrowersData: Borrower[] = [
    new Borrower( {
    borrowerReference: "09e59f89-5fd6-4b3a-bc49-fc8d6afbb547",
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: new Date("1990-05-15"),
    contact: {
      email: "john.doe@example.com",
      phone: "+1234567890",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "Somestate",
        zipCode: "12345",
        country: "USA",
      },
    },
    booksBorrowed: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  }),
  new Borrower( {
    borrowerReference: "99e59f05-5fd6-4e3a-bc49-fc8e6afbb547",
    firstName: "Alice",
    lastName: "Smith",
    dateOfBirth: new Date("1985-10-20"),
    contact: {
      email: "alice.smith@example.com",
      phone: "+1987654321",
      address: {
        street: "456 Elm St",
        city: "Othertown",
        state: "Anotherstate",
        zipCode: "54321",
        country: "USA",
      },
    },
    booksBorrowed: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  }),
  new Borrower( {
    borrowerReference: "09e59f89-5fd6-4e3a-bc49-fc8e6afbb547",
    firstName: "Emma",
    lastName: "Johnson",
    dateOfBirth: new Date("1988-07-03"),
    contact: {
      email: "emma.johnson@example.com",
      phone: "+1122334455",
      address: {
        street: "789 Maple Ave",
        city: "Sometown",
        state: "Yetanotherstate",
        zipCode: "67890",
        country: "USA",
      },
    },
    booksBorrowed: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  }),
];


