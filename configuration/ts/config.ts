
import 'dotenv/config';

const config = {
  address: process.env.ADDRESS || 'http://localhost',
  port:  parseInt(process.env.PORT || "3003", 10),
  mode: process.env.MODE || 'dev',
  name: process.env.NAME || 'lms-service',
  logFile: process.env.LOG_FILE || '/lms-service.log',
  logDir: process.env.LOG_DIR || 'logs',
  launchUrl: process.env.LAUNCH_URL || 'swagger',
  appName: process.env.APP_NAME || 'lms',
  dbType: process.env.DB_TYPE || 'mongodb',
  dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/lms',
  db: process.env.DB || 'lms',
  jwtKey: process.env.JWT_KEY || 'default_key',
  jwtAudience: process.env.JWT_AUDIENCE || 'lms',
  jwtIssuer: process.env.JWT_ISSUER || 'https://localhost:3003',
  tokenExpiry: process.env.Token_EXPIRY || '5',
};

export default config;
