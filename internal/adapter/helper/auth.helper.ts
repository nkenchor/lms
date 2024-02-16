import jwt from 'jsonwebtoken';
import config from '../../../configuration/ts/config'; 

export const generateToken = (username: string) => {
  const secretKey = config.jwtKey;
  const expiresIn = config.jwtExpiry; // Token expiration time

  // Create a token
  const token = jwt.sign({ username: username }, secretKey, { expiresIn });
  return token;
};
