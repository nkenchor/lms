// Import JSON Web Token (JWT) library and application configuration
import jwt from 'jsonwebtoken';
import config from '../../../configuration/ts/config';

/**
 * Generates a JWT for a given username.
 * 
 * @param username The username for which to generate the token.
 * @returns A JWT as a string.
 */
export const generateToken = (username: string) => {
  // Retrieve secret key and token expiration time from configuration
  const secretKey = config.jwtKey;
  const expiresIn = config.jwtExpiry; // Token expiration time in hours or a string representing time span zeit/ms format (e.g., "2 days", "10h").

  // Sign and create a token with the username as payload, using the secret key and expiration time from config
  const token = jwt.sign({ username: username }, secretKey, { expiresIn });

  // Return the generated token
  return token;
};
