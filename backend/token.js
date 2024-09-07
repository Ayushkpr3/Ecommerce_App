// Import the crypto module using ES module syntax
import { randomBytes } from 'crypto';

// Function to generate a secure random JWT secret key
const generateJWTSecretKey = () => {
  // Generate a 256-bit (32 bytes) random key and convert it to hexadecimal format
  const secretKey = randomBytes(32).toString('hex');

  // Log the generated key
  console.log('Your JWT Secret Key:', secretKey);

  // Optionally, return the key if needed for further use
  return secretKey;
};

// Generate and log the JWT secret key
generateJWTSecretKey();
