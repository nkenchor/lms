export interface ICreateAuthorDto {
  firstName: string;
  lastName: string;
  biography: string;
}

export interface IUpdateAuthorDto {
  authorReference?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}
