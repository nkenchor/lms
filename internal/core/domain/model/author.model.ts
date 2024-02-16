import { randomUUID } from "crypto";

export class Author {
  authorReference: string;
  firstName: string; // Required
  lastName: string; // Required
  dateOfBirth: Date;
  nationality: string;
  biography: string; // Required
  contact: {
    email: string;
    phone?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  socialMedia: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  awards: string[];
  createdAt: Date; 
  updatedAt: Date;
  isDeleted: boolean; // Indicates whether the author is soft-deleted

  constructor({
    firstName,
    lastName,
    biography,
    authorReference = randomUUID(),
    dateOfBirth = new Date(),
    nationality = '',
    contact = { email: '' }, // Provide default minimal initialization
    socialMedia = {},
    awards = [],
    createdAt = new Date(),
    updatedAt = new Date(),
    isDeleted = false, // Default to false, indicating the author is not deleted
  }: { firstName: string; lastName: string; biography: string; } & Partial<Omit<Author, 'firstName' | 'lastName' | 'biography'>> & { isDeleted?: boolean }) {
    this.authorReference = authorReference;
    this.firstName = firstName;
    this.lastName = lastName;
    this.biography = biography;
    this.dateOfBirth = dateOfBirth;
    this.nationality = nationality;
    this.contact = contact;
    this.socialMedia = socialMedia;
    this.awards = awards;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
  }

  // Method to soft delete the author
  softDelete() {
    this.isDeleted = true;
    this.updatedAt = new Date(); // Update the updatedAt timestamp to reflect the deletion time
  }

  // Method to restore the author
  restore() {
    this.isDeleted = false;
    this.updatedAt = new Date(); // Update the updatedAt timestamp to reflect the restoration time
  }
}
