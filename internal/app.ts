import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { GenreRepository } from './adapter/data-access/repository/genre.repository';
import { GenreService } from './core/service/genre.service';
import { GenreController } from './adapter/api/genre.controller';
import Database from './adapter/data-access/database/connection';
import { genreRoutes } from './adapter/routes/genre.routes';
import { LogErrorMiddleware, LogRequestMiddleware, LogResponseMiddleware } from './adapter/middleware/log.middleware';
import { AppError, ErrorType } from './adapter/helper/error.helper';
import { ErrorMiddleware } from './adapter/middleware/error.middleware';
import config from '../configuration/ts/config'; 
import { UserRepository } from './adapter/data-access/repository/user.repository';
import { UserController } from './adapter/api/user.controller';
import { UserService } from './core/service/user.service';
import { userRoutes } from './adapter/routes/user.routes';
import { BookRepository } from './adapter/data-access/repository/book.repository';
import { BookService } from './core/service/book.service';
import { BookController } from './adapter/api/book.controller';
import { bookRoutes } from './adapter/routes/book.routes';
import { AuthorRepository } from './adapter/data-access/repository/author.repository';
import { AuthorController } from './adapter/api/author.controller';
import { authorRoutes } from './adapter/routes/author.routes';
import { AuthorService } from './core/service/author.service';
import { BookTransactionController } from './adapter/api/book.transaction.controller';
import { BookTransactionService } from './core/service/book.transaction.service';
import { BorrowerController } from './adapter/api/borrower.controller';
import { BorrowerRepository } from './adapter/data-access/repository/borrower.repository';
import { borrowerRoutes } from './adapter/routes/borrower.routes';
import { BorrowerService } from './core/service/borrower.service';
import { bookTransactionRoutes } from './adapter/routes/book.transaction.routes';
import { BookTransactionRepository } from './adapter/data-access/repository/book.transaction.repository';


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
    
    // Repositories
    const authorRepository = new AuthorRepository(database);
    const bookRepository = new BookRepository(database);
    const genreRepository = new GenreRepository(database);
    const userRepository = new UserRepository(database);
    const borrowerRepository = new BorrowerRepository(database);
    const bookTransactionRepository = new BookTransactionRepository(database);

    // Services
    const authorService = new AuthorService(authorRepository);
    const bookService = new BookService(bookRepository, genreRepository, authorRepository);
    const genreService = new GenreService(genreRepository, bookRepository);
    const userService = new UserService(userRepository);
    const borrowerService = new BorrowerService(borrowerRepository);
    const bookTransactionService = new BookTransactionService(bookTransactionRepository, bookService, borrowerService);

    // Controllers
    const authorController = new AuthorController(authorService);
    const bookController = new BookController(bookService);
    const genreController = new GenreController(genreService);
    const userController = new UserController(userService);
    const borrowerController = new BorrowerController(borrowerService);
    const bookTransactionController = new BookTransactionController(bookTransactionService);

      
 
    
    // Routes
    genreRoutes(app, genreController);
    userRoutes(app, userController);
    bookRoutes(app, bookController);
    authorRoutes(app, authorController);
    borrowerRoutes(app, borrowerController);
    bookTransactionRoutes(app, bookTransactionController);

    

    app.use((req, res, next) => {
      next( res.status(404).json(new AppError(ErrorType.NotFound, 'Resource not found')) );
      
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
