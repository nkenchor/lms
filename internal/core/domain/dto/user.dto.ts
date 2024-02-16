// DTO for creating a new user
export interface ICreateUserDto {
  username: string;
  password: string;
}
  
  // DTO for updating an existing user
export interface IUpdateUserDto {
  username?: string;
  password?: string;
  roles?: string[];
}
export interface ILoginUserDto {
  username: string;
  password: string;
}