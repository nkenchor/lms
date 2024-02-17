
# Library Management API

The Library Management System (LMS) API represents a cutting-edge solution designed to revolutionize the way libraries operate. Built upon the solid foundations of TypeScript, Node.js, and Express.js, and adhering to the OpenAPI 3.0.0 specification, the API encapsulates a broad spectrum of functionalities essential for the modern library. From managing books, genres, authors, borrowers, to facilitating transactions, the LMS API is engineered to enhance operational efficiency, security, and user engagement across library services.

## Key Functionalities

1. Comprehensive Management: Enables the creation, retrieval, updating, and deletion (CRUD operations) of library resources such as books, authors, genres, and borrowers, promoting an organized and easily accessible digital catalog.

2. Secure Access: Employs JWT tokens for robust authentication and authorization, ensuring that users have secure access to functionalities pertinent to their roles.

3. Transaction Tracking: Offers sophisticated transaction management for monitoring book borrowings and returns, thereby optimizing the circulation and availability of library resources.

4. Data Integrity: Supports soft deletion operations, allowing records to be marked as inactive instead of being permanently deleted, facilitating data recovery and historical analysis.
Architectural Highlights:

5. Hexagonal Architecture: The api utilizes the hexagonal (port-adapter) architecture to ensure a clean separation of concerns, modular design, and ease of testing. This architecture enhances the system's flexibility and adaptability to technological or requirement changes.

6. Scalable Database Solution: MongoDB, a schema-less NoSQL database, underpins the data storage, chosen for its ability to manage diverse data types, scalability, and performance capabilities.


# Technologies Used

The Library Management System (LMS) API leverages a carefully selected stack of technologies, each chosen for its unique strengths and contribution to building a scalable, secure, and efficient library management solution.

1. TypeScript: TypeScript extends JavaScript by adding static type definitions, leading to safer code, fewer bugs, and more readable and maintainable codebases. Its support for advanced object-oriented programming features enhances the development experience, making it an ideal choice for the complex architecture of the LMS API.

2. Node.js: Node.js's event-driven, non-blocking I/O model provides the efficiency and scalability needed for handling numerous simultaneous connections, making it perfect for the API's backend. Its vast ecosystem accelerates development with a wide range of available libraries and tools.

3. Express.js: Express.js stands out for its simplicity and flexibility in building web applications. It streamlines the creation of server-side logic, handling routes, requests, and views effectively, aligning with the goals for a lightweight and maintainable codebase.

4. MongoDB: MongoDB's schema-less nature allows for flexibility in managing the diverse and dynamic data structures of a library system. Its scalability and performance capabilities ensure that the API can efficiently manage large datasets and traffic volumes.

5. AWS Lambda: AWS Lambda's serverless compute model aligns with the scalability and cost-efficiency requirements. It enables the API to automatically scale with demand and integrates seamlessly with other AWS services, reducing the overhead of server management.

6. AWS API Gateway: AWS API Gateway serves as the entry point for the API, offering features like API versioning, authorization, and access control. Its ability to manage traffic, monitor APIs, and handle API throttling ensures a secure and reliable interface for the services.

7. JWT (JSON Web Tokens): JWT provides a flexible and secure method for authentication, supporting the stateless architecture of the serverless deployment. It simplifies the process of verifying user identities and managing permissions across the distributed system.


The integration of these technologies forms a robust foundation for the LMS API, ensuring a development and deployment environment that is both powerful and developer-friendly. TypeScript's static typing, combined with Node.js and Express.js's runtime efficiency, MongoDB's flexible data storage, AWS Lambda and API Gateway's scalable serverless architecture, and JWT's secure authentication, creates a comprehensive ecosystem for developing and managing the LMS API.


---

## Getting Started

This section guides you through the prerequisites and steps needed to get the Library Management System (LMS) API up and running on your local machine.

### Prerequisites

Ensure you have the following installed on your system before proceeding:

- **Node.js**: Essential for running the backend server. [Download Node.js](https://nodejs.org/).
- **MongoDB**: The database for the application. Install from [MongoDB's website](https://www.mongodb.com/try/download/community) or use MongoDB Atlas for a cloud-based solution. Make sure it's running and accessible.
- **TypeScript**: Needed for the project's development. Although installed as a dependency, having TypeScript globally can be beneficial. Install via npm: `npm install -g typescript`.
- **Git**: For cloning the project repository. [Download Git](https://git-scm.com/).

### Step-by-Step Setup Guide

#### 1. Clone the Repository

Start by cloning the LMS API repository and navigating into it:

```bash
git clone https://github.com/nkenchor/lms.ts.git
cd lms.ts
```

#### 2. Environment Setup

Duplicate the `.env` file in the root directory. Update this file with your environment-specific settings, such as:

- `DB_URI`: Your MongoDB connection string.
- `PORT`: Optional. The port for the server (default is used if not specified).
- `JWT_SECRET`: Secret key for JWT.

#### 3. Install Dependencies

Install the project dependencies with:

```bash
npm install
```

#### 4. Compile TypeScript to JavaScript

Use the `ts-node` utility to run TypeScript files directly. This eliminates the need for a separate compilation step during development:

```bash
npm start
```

Alternatively, for development with automatic restarts on file changes, use:

```bash
npm run dev
```

#### 5. Starting the Server

Launch the server with:

```bash
npm start
```

Or, for development, use `npm run dev` to utilize `nodemon` for automatic server restarts upon code changes.

#### 6. Running Tests

Execute tests with:

```bash
npm test
```

This uses Jest to run unit and integration tests, verifying the application's functionality.

#### 7. Accessing the API

With the server running, access the API at `http://localhost:3003`, replacing `3003` with your configured port number of your choice.

### Troubleshooting

If you encounter issues:

- Verify MongoDB is operational and correctly connected.
- Check Node.js and npm installations with `node -v` and `npm -v`.
- For TypeScript issues, confirm the global and local installations and review `tsconfig.json`.

Following these instructions should get the LMS API operational on your local environment, ready for further development or testing.



  Find below a sample package.json script:

  ```
  "scripts": {
  "start": "ts-node --compiler-options '{\"module\":\"commonjs\",\"esModuleInterop\":true}' internal/app.ts",
  "test": "node --experimental-vm-modules node_modules/.bin/jest",
  "dev": "nodemon internal/app.ts"
  },

  ```
   Find below a sample tsconfig.json script:

  ```
  {
  "compilerOptions": {
    "target": "es2022",                               
    "module": "commonjs",                               
    "rootDir": "./",                                 
    "outDir": "./dist",                                  
    "esModuleInterop": true,                            
    "forceConsistentCasingInFileNames": true,           
    "strict": true,                                      
    "skipLibCheck": true                                 
  },
  "include": ["internal/**/*.ts"],
  "exclude": ["node_modules"]
  }
  ```


---

## API Endpoints and Documentation

The Library Management System (LMS) API offers a comprehensive suite of endpoints to manage the library's resources effectively. Below is a summary of the main categories and their respective endpoints:

### Books

- **List All Books**: `GET /books` - Retrieves a comprehensive list of all books.
- **Create Book**: `POST /books` - Adds a new book to the collection.
- **Get Book Details**: `GET /books/{bookReference}` - Fetches details of a book by its unique reference.
- **Update Book Details**: `PUT /books/{bookReference}` - Updates the specifics of an existing book.
- **Delete Book**: `DELETE /books/{bookReference}` - Removes a book from the library.

### Authors

- **List All Authors**: `GET /authors` - Retrieves all authors.
- **Create Author**: `POST /authors` - Adds a new author.
- **Get Author Details**: `GET /authors/{authorReference}` - Fetches details of an author by reference.
- **Update Author Details**: `PUT /authors/{authorReference}` - Updates author information.
- **Delete Author**: `DELETE /authors/{authorReference}` - Removes an author.

### Genres

- **List All Genres**: `GET /genres` - Retrieves all genres.
- **Create Genre**: `POST /genres` - Adds a new genre.
- **Get Genre Details**: `GET /genres/{genreReference}` - Fetches details of a specific genre.
- **Update Genre Details**: `PUT /genres/{genreReference}` - Updates genre information.
- **Delete Genre**: `DELETE /genres/{genreReference}` - Removes a genre.

### Borrowers

- **List All Borrowers**: `GET /borrowers` - Retrieves all borrowers.
- **Create Borrower**: `POST /borrowers` - Registers a new borrower.
- **Get Borrower Details**: `GET /borrowers/{borrowerReference}` - Fetches details of a borrower.
- **Update Borrower Details**: `PUT /borrowers/{borrowerReference}` - Updates borrower information.
- **Delete Borrower**: `DELETE /borrowers/{borrowerReference}` - Removes a borrower.

### Users

- **Create User**: `POST /users` - Registers a new user.
- **User Login**: `POST /users/login` - Authenticates a user, returning a JWT.

### Transactions

- **Borrow a Book**: `POST /transaction/borrow` - Records a book borrowing.
- **Return a Book**: `POST /transaction/return` - Records a book return.

### Accessing the Documentation

- **Automatic Launch**: Start the application using `npm start` to automatically open the API documentation in your default web browser.
- **Manual Access**: Visit `http://localhost:3003/docs` to access the Swagger UI documentation.
- **Swagger JSON File**: Located in the `docs` folder, this file provides the raw OpenAPI documentation for further development and integration purposes.

### Benefits of Using Swagger/OpenAPI

- **Interactive Exploration**: Allows for interactive exploration of API endpoints.
- **Real-time Testing**: Facilitates real-time testing directly from the documentation.
- **Standardization**: Ensures documentation follows the Swagger (OpenAPI) standard.
- **Automatic Updates**: Documentation is automatically updated with API changes.

For developers and integrators, the provided documentation and Swagger UI facilitate a comprehensive understanding and interaction with the LMS API, ensuring efficient integration and usage.

---

## Database Schema

The Library Management System (LMS) API employs MongoDB, a NoSQL document-based database, to manage its data. This approach is chosen for its schema-less nature, offering unparalleled flexibility and performance suited to the dynamic needs of a library system. Below, we detail the data models for books, authors, genres, borrowers, and users, highlighting their relationships and the rationale behind key design decisions.

### Data Models and Relationships

#### Books
- **Description**: Each book document stores details like title, ISBN, publication date, language, synopsis, pageCount, publisher, and references to authors and genres.
- **Design Decisions**:
  - **Many-to-Many Relationships**: Books are linked to multiple authors and genres through references, supporting a versatile categorization and authorship model.
  - **Indexing**: Critical for enhancing search performance, fields such as ISBN, title, and author references are indexed.

#### Authors
- **Description**: Author documents include personal information, a biography, contact details, and a list of written books (book references).
- **Design Decisions**:
  - **One-to-Many Relationship with Books**: Reflects the reality that authors can write multiple books. The management of this relationship primarily from the book's side prevents large arrays in author documents.

#### Genres
- **Description**: Genre documents capture the genre name, description, and book references within each genre.
- **Design Decisions**:
  - **Many-to-Many Relationship with Books**: Facilitates categorizing books into multiple genres. This relationship is often managed from the books' side to streamline updates and queries.

#### Borrowers
- **Description**: Borrower documents hold borrower details and a borrowing history, including book references, borrow dates, and return dates.
- **Design Decisions**:
  - **One-to-Many Relationship with Transactions**: By embedding transaction history, MongoDB's nested documents feature is leveraged for efficient data access and query.

#### Users
- **Description**: Manages user data for authentication and authorization, including usernames, hashed passwords, and roles.
- **Design Decisions**:
  - **Indexing on Username**: Ensures quick authentication processes and enforces uniqueness across the collection.

### Leveraging MongoDB for Data Management

Though MongoDB does not use traditional ORM (Object-Relational Mapping), it offers ORM-like capabilities through its driver and frameworks like Mongoose. This setup provides several benefits:

- **Schema Validation**: MongoDB supports defining validation rules, ensuring data integrity and consistency despite its schema-less nature.
- **Object Modeling**: With Mongoose, developers can enjoy a rich environment for defining schemas, complete with types, validations, and query capabilities.
- **Optimized for Flexibility and Performance**: The chosen design capitalizes on MongoDB's ability to efficiently manage flexible data models and ensure high-performance data access, crucial for the read-intensive demands of library systems.

This data model design underscores a commitment to leveraging MongoDB's strengths, balancing flexibility with performance to meet the library management's evolving needs.



## Authentication

The Library Management System (LMS) API employs JSON Web Tokens (JWT) for secure and efficient user authentication and authorization. This section outlines the JWT authentication flow, the security measures in place, and the implementation of role-based access control (RBAC) to safeguard the API's endpoints.

### JWT Authentication Flow

1. **User Login**: Upon submitting valid credentials, a user is authenticated against the database. Successful authentication triggers the generation of a JWT, encapsulating user details and roles.

2. **Token Generation**: A secret key, stored securely and accessed via environment variables, signs the JWT. This token contains the user's identity, roles, and an expiration timestamp, ensuring the token's integrity and authenticity.

3. **Token Transmission**: The server responds with the JWT, which the client stores for future requests. This token must be included in the HTTP authorization header as a Bearer token for accessing protected resources.

4. **Token Validation**: Middleware intercepts requests to protected endpoints, validating the JWT. It ensures the token's signature matches the secret key and checks for expiry. Valid tokens proceed, while invalid requests are denied.

### Security Measures

- **Token Expiration**: Setting a short-lived expiration for tokens reduces risks associated with token compromise, requiring users to periodically reauthenticate.




### Endpoint Protection

- **Public vs. Protected Endpoints**: The API distinguishes between endpoints that are open to all users and those requiring authenticated and authorized access.
- **Middleware Integration**: Protected endpoints integrate authentication and authorization middleware, clearly specifying access requirements.

By integrating JWT-based authentication, the LMS API ensures comprehensive security across all endpoints, allowing only authenticated and authorized users to access specific functionalities. This mechanism enhances the overall security posture of the system, providing a seamless yet secure user experience.

---


## Error Handling

The Library Management System (LMS) API incorporates a sophisticated error handling framework designed to provide clear, actionable feedback to clients while ensuring the system's integrity and security. This framework covers a range of error scenarios, from client-side mistakes to server-side issues, and is integral to maintaining a robust and user-friendly API.

### Types of Errors

Our API is prepared to handle a variety of error types, including:

- **Validation Errors**: Triggered by input that fails to meet the API's specifications.
- **Authentication Errors**: Result from failed user authentication attempts.
- **Authorization Errors**: Occur when users try to access resources beyond their privileges.
- **Database Errors**: Emerge from backend database issues, impacting data retrieval or storage.
- **Not Found Errors**: Indicate that the requested resources are unavailable or nonexistent.
- **Server Errors**: Encompass any other internal API errors not captured by the specific categories above.

### Error Responses

The API provides structured error responses that facilitate easy identification and handling of issues:

- **HTTP Status Code**: Clearly indicates the error type (e.g., 400 for validation errors).
- **Error Message**: Offers a concise, understandable description of the issue.
- **Error Codes**: (When applicable) Offers finer granularity on the error nature.
- **Error Reference**: A unique error identifier for logging and troubleshooting purposes.

This structured error response ensures clients can programmatically assess and react to issues encountered during API interaction.



### Logging and Monitoring

The API features comprehensive logging of requests, responses, and errors, including detailed contextual information. Logs are systematically organized and stored, enabling:

- **Immediate Insight**: Facilitate real-time awareness and response to emerging issues.
- **Error Tracking**: Utilize unique identifiers to trace specific errors and their impacts.
- **Trend Analysis**: Analyze log data to identify recurring issues, usage patterns, or potential security vulnerabilities.

All logs are stored in the log directory in the root folder.


By prioritizing detailed error feedback and implementing strategic logging and monitoring, the LMS API ensures a secure, reliable, and transparent experience for all users, enhancing the system's overall quality and resilience.



## Deployment Instructions

Deploying the Library Management System (LMS) API to AWS using Lambda and API Gateway leverages the power of serverless architecture for scalability, reliability, and cost-efficiency. Follow this step-by-step guide to prepare, deploy, and manage your API in a live environment.

### Prerequisites

Ensure you have the following before starting the deployment:

- An active **AWS account**.
- **AWS CLI** installed and configured with `aws configure`.
- **Node.js** and **npm** installed for running the API and managing dependencies.
- The **Serverless Framework** installed globally via `npm install -g serverless`, simplifying AWS Lambda and API Gateway deployment.

### Packaging the Application

1. Navigate to your project's root directory.
2. Execute `npm install` to install necessary dependencies.
3. Verify your application's code and entry points are up to date and error-free.

### Deployment Steps

Follow these steps to deploy your API:

1. **Serverless Framework Configuration**: Define your AWS services, functions, and resources in a `serverless.yml` file located at your project's root.
   
2. **Define Lambda Functions**: For each API endpoint, specify a function in `serverless.yml`, detailing its handler and trigger events.
   
   ```yaml
   functions:
     createUser:
       handler: handler.createUser
       events:
         - http:
             path: users/create
             method: post
   ```

3. **IAM Roles Setup**: Ensure you have an IAM role with necessary permissions for Lambda and API Gateway. Refer to the Serverless Framework's documentation for IAM roles setup.

4. **Environment Configuration**: Securely manage sensitive settings (e.g., DB connection strings, JWT secrets) using environment variables in `serverless.yml`.

   ```yaml
   provider:
     environment:
       DB_CONNECTION_STRING: ${env:DB_CONNECTION_STRING}
       JWT_SECRET: ${env:JWT_SECRET}
   ```

5. **Deploy**: Run `serverless deploy` from your terminal. This command packages your application and deploys it to AWS, provisioning the necessary services automatically.

### Testing the Deployment

- Upon deployment, the Serverless Framework provides the endpoints' URLs. Use these URLs to test your API's functionality with Postman or cURL.
- Ensure all endpoints operate as expected, verifying the integration with AWS services.

### Rollback or Update Procedures

- **Updates**: Apply changes to your application or `serverless.yml` and redeploy with `serverless deploy`.
- **Rollbacks**: If necessary, rollback to a previous deployment using `serverless rollback`, specifying a version or timestamp.

### Additional Tips

- **Monitoring**: Use AWS CloudWatch and the Serverless Dashboard for insights into application performance and error tracking.
- **Security**: Regularly review IAM permissions, applying the Principle of Least Privilege to secure your deployment.
- **Cost Management**: Monitor application usage to avoid unexpected charges, particularly for high-traffic APIs.

By adhering to these instructions, you can efficiently deploy and manage the LMS API on AWS, taking full advantage of serverless benefits for a scalable and cost-effective solution.

---