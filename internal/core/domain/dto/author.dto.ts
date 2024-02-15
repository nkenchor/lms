// DTO for creating a new author
export interface CreateAuthorDto {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  nationality: string;
  biography: string;
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
}

// DTO for updating an existing author
export interface UpdateAuthorDto {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  nationality?: string;
  biography?: string;
  contact?: {
    email?: string;
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
    };
  };
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  awards?: string[];
}
  