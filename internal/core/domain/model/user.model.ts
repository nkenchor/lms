
export interface User {
    userReference: string; // Unique identifier for the user
    username: string; // User's username
    password: string; // User's password (hashed and salted in a real-world application)
    roles: string[]; // User roles (e.g., 'admin', 'librarian', 'user')
    createdAt: Date; // Date when the user was created
    updatedAt: Date; // Date when the user was last updated
}
  
