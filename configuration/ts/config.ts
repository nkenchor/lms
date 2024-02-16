// Import environment variables from .env file
import 'dotenv/config';

// Configuration object containing service settings
const config = {
  // Service address with default fallback
  address: process.env.ADDRESS || 'http://localhost',
  
  // Service port parsed as integer with default fallback
  port:  parseInt(process.env.PORT || "3003", 10),
  
  // Running mode (development/production) with default fallback
  mode: process.env.MODE || 'dev',
  
  // Service name identifier with default fallback
  name: process.env.NAME || 'lms-service',
  
  // Default log file path with fallback
  logFile: process.env.LOG_FILE || '/lms-service.log',
  
  // Directory for log files with default fallback
  logDir: process.env.LOG_DIR || 'logs',
  
  // URL to launch service documentation or UI with default fallback
  launchUrl: process.env.LAUNCH_URL || 'swagger',
  
  // Application name identifier with default fallback
  appName: process.env.APP_NAME || 'lms',
  
  // Database type with default fallback, supports future extensibility for different DBMS
  dbType: process.env.DB_TYPE || 'mongodb',
  
  // Database connection URL with default fallback
  dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/lms',
  
  // Database name with default fallback
  db: process.env.DB || 'lms',
  
  // JWT secret key for signing tokens with default fallback
  jwtKey: process.env.JWT_KEY || 'default_key',
  
  // JWT audience field to validate against during token verification
  jwtAudience: process.env.JWT_AUDIENCE || 'lms',
  
  // JWT issuer field to validate the token's issuer
  jwtIssuer: process.env.JWT_ISSUER || 'https://localhost:3003',
  
  // JWT token expiry time in hours with default fallback
  jwtExpiry: process.env.JWT_EXPIRY || '5',
};

// Export configuration for use in other parts of the application
export default config;
