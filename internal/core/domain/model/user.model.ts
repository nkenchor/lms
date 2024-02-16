import { randomUUID } from "crypto";

export class User {
  userReference: string;
  username: string; // Required
  password: string; // Required
  roles: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor({
    username,
    password,
    userReference = randomUUID(),
    roles = ['user'],
    createdAt = new Date(),
    updatedAt = new Date()
  }: { username: string; password: string; } & Partial<Omit<User, 'username' | 'password'>>) {
    this.userReference = userReference;
    this.username = username;
    this.password = password;
    this.roles = roles;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
