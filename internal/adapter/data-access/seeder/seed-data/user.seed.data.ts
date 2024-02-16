import { ICreateUserDto } from "../../../../core/domain/dto/user.dto";

// Seed data for creating users
export const usersData: ICreateUserDto[] = [
    {
      username: 'user1',
      password: 'password1'
    },
    {
      username: 'admin',
      password: 'admin'
    },
  
  ];