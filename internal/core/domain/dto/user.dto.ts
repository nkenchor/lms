// DTO for creating a new user
export interface CreateUserDto {
  username: string;
  password: string;
  roles: string[];
}
  
  // DTO for updating an existing user
export interface UpdateUserDto {
  username?: string;
  password?: string;
  roles?: string[];
}