
// DTO for creating a new genre
export interface CreateGenreDto {
  name: string;
  description: string;
}
  
  // DTO for updating an existing genre
export interface UpdateGenreDto {
  name?: string;
  description?: string;
}
  