import { randomUUID } from "crypto";

export class Genre {
  genreReference: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    genreReference = randomUUID(),
    name = '',
    description = '',
    createdAt = new Date(),
    updatedAt = new Date()
  }: Partial<Genre>) {
    this.genreReference = genreReference;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

 