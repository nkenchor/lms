import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

// Import utilities, controllers, services, and database connections
import { GenreRepository } from './adapter/data-access/repository/genre.repository';
import { GenreService } from './core/service/genre.service';
import { GenreController } from './adapter/api/genre.controller';
import Database from './adapter/data-access/database/connection';
import { genreRoutes } from './adapter/routes/genre.routes';
import { LogErrorMiddleware, LogRequestMiddleware, LogResponseMiddleware } from './adapter/middleware/log.middleware';
import { ErrorType } from './adapter/helper/error.helper';
import { ErrorMiddleware } from './adapter/middleware/error.middleware';
import config from '../configuration/ts/config'; 



const app: Express = express();
const port = config.port;
const address = config.address;

// Middleware for logging requests
app.use(LogRequestMiddleware);
app.use(LogResponseMiddleware);
app.use(LogErrorMiddleware);

// Body parser middleware
app.use(express.json());

// Swagger setup
const swaggerFilePath = path.join(__dirname, '../docs', 'swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Initialize application resources and routes
const initializeApp = async (): Promise<void> => {
  try {
    // Database connection
    const database = await Database.connect();
    console.log('Database connected successfully');
    
    // Initialize repositories, services, and controllers
    const genreRepository = new GenreRepository(database);
    const genreService = new GenreService(genreRepository);
    const genreController = new GenreController(genreService);
    
    // Setup routes
    genreRoutes(app, genreController);

    

    app.use((req, res, next) => {
      next({ type: ErrorType.NotFound, message: 'Resource not found' });
    });

    // Global error handler - should be the last middleware
    app.use(ErrorMiddleware);

    


    
    // Start server
    app.listen(port, () => console.log(`Server running on ${address}:${port}`));
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

// Execute the initialization function
initializeApp().catch(err => {
  console.error('Initialization failed:', err);
});
