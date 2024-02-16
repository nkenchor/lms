import { randomUUID } from "crypto";

export class Genre {
  genreReference: string;
  name: string; // Required
  description: string; // Required
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean; // Indicates whether the genre is soft-deleted

  constructor({
    name,
    description,
    genreReference = randomUUID(),
    createdAt = new Date(),
    updatedAt = new Date(),
    isDeleted = false // Default to false, indicating the genre is not deleted
  }: { name: string; description: string; } & Partial<Omit<Genre, 'name' | 'description'>> & { isDeleted?: boolean }) {
    this.genreReference = genreReference;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
  }

  // Method to soft delete the genre
  softDelete() {
    this.isDeleted = true;
    this.updatedAt = new Date(); // Update the updatedAt timestamp to reflect the deletion time
  }

  // Method to restore the genre
  restore() {
    this.isDeleted = false;
    this.updatedAt = new Date(); // Update the updatedAt timestamp to reflect the restoration time
  }
}
