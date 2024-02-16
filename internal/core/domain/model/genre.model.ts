import { randomUUID } from "crypto";

export class Genre {
  genreReference: string;
  name: string; // Required
  description: string; // Required
  createdAt: Date;
  updatedAt: Date;

  constructor({
    name,
    description,
    genreReference = randomUUID(),
    createdAt = new Date(),
    updatedAt = new Date()
  }: { name: string; description: string; } & Partial<Omit<Genre, 'name' | 'description'>>) {
    this.genreReference = genreReference;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
