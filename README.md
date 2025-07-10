# Node.js Express.js Hello World Tutorial

[![Build Status](https://github.com/username/repository/actions/workflows/ci.yml/badge.svg)](https://github.com/username/repository/actions/workflows/ci.yml)
[![CodeQL](https://github.com/username/repository/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/username/repository/actions/workflows/codeql-analysis.yml)

A hands-on educational project demonstrating a minimal HTTP server using Express.js 5.1.0 and Node.js 22.x LTS. Features a single /hello endpoint returning 'Hello world' for learning Node.js web server fundamentals.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoint](#api-endpoint)
7. [Testing](#testing)
8. [Project Structure](#project-structure)
9. [Educational Objectives](#educational-objectives)
10. [Contribution](#contribution)
11. [License](#license)

## Introduction

This project is an educational Node.js application that demonstrates how to build a simple HTTP server using Express.js. It is designed for developers, students, and educators seeking a practical introduction to Node.js server development.

The application serves as a foundational learning resource that introduces developers to Node.js web development fundamentals, featuring a single `/hello` endpoint that returns a "Hello world" response to HTTP clients. This tutorial provides hands-on experience with HTTP request handling, server setup, and response generation in a Node.js environment, serving as a stepping stone for more complex web application development.

## Features

- **Express.js 5.1.0-based HTTP server** - Utilizes the latest Express.js framework with enhanced security features including ReDoS attack protection and improved async error handling
- **Single GET /hello endpoint returning 'Hello world'** - Demonstrates basic HTTP routing and response generation patterns
- **Cross-platform compatibility (Windows, macOS, Linux)** - Runs on all major operating systems supported by Node.js 22.x LTS
- **Basic error handling and logging** - Implements Express.js error middleware with educational logging patterns
- **Comprehensive documentation and tests** - Includes detailed setup instructions and basic unit tests using Node.js built-in test runner

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 22.x LTS** (minimum Node.js 18 required) - Long Term Support version providing stability and security updates
- **npm 11.4.2 or higher** - Package manager bundled with Node.js for dependency management

### Version Compatibility

The tutorial application requires Node.js 18 or higher for Express.js 5.1.0 compatibility. Node.js 22.x LTS is recommended for optimal performance and long-term support, providing Active LTS until October 2025 and Maintenance until April 2027.

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   ```

2. **Navigate to the backend directory:**
   ```bash
   cd src/backend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

This will install Express.js 5.1.0 and all necessary dependencies as specified in the package.json file.

## Usage

To run the tutorial application:

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Server startup confirmation:**
   The server will listen on `http://localhost:3000` by default and display a startup message.

3. **Access the /hello endpoint:**
   - **Browser:** Navigate to `http://localhost:3000/hello`
   - **curl command:** 
     ```bash
     curl http://localhost:3000/hello
     ```

4. **Expected response:**
   ```
   Hello world
   ```

The server implements graceful startup and shutdown procedures, with console logging for educational visibility into the application lifecycle.

## API Endpoint

The tutorial application provides a single endpoint for demonstration purposes:

### GET /hello

Returns a simple "Hello world" message to demonstrate basic HTTP server functionality.

**Request:**
- **Method:** GET
- **URL:** `/hello`
- **Headers:** None required

**Response:**
- **Status Code:** 200 OK
- **Content-Type:** text/plain
- **Body:** `Hello world`

**Example:**
```bash
curl http://localhost:3000/hello
```

**Response:**
```
Hello world
```

## Testing

The project includes basic unit tests using Node.js built-in test runner, demonstrating testing fundamentals without external dependencies.

### Running Tests

Execute all tests with:
```bash
npm test
```

### Test Coverage

The test suite covers:
- **Server startup and shutdown** - Verifies proper application lifecycle management
- **Hello endpoint response** - Validates correct HTTP response generation
- **Error handling scenarios** - Tests 404 responses for unknown routes
- **Basic performance metrics** - Measures response times for educational purposes

### Test Framework

The application uses **Node.js built-in test runner** (available in Node.js 18+) with the following benefits:
- Zero external dependencies
- Fast test execution
- Built-in assertions with `node:assert`
- Automatic test discovery
- Native code coverage reporting

## Project Structure

The tutorial application follows a clear, educational project structure:

```
project-root/
├── src/backend/
│   ├── server.js              # Main server entry point
│   ├── config/               # Express and server configuration
│   ├── routes/               # Route handlers (including /hello)
│   ├── middleware/           # Logging and error handling middleware
│   ├── utils/                # Utility modules (status codes, logger)
│   └── test/                 # Test suites
├── docs/
│   ├── api.md                # API documentation
│   ├── testing.md            # Testing guide
│   └── setup.md              # Setup instructions
├── .github/workflows/        # CI/CD configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # This file
```

### Key Files

- **`src/backend/server.js`** - Main application entry point with Express.js setup
- **`src/backend/routes/`** - Modular route handlers demonstrating Express.js routing patterns
- **`src/backend/middleware/`** - Custom middleware for logging and error handling
- **`src/backend/utils/`** - Utility functions and constants for code organization
- **`src/backend/test/`** - Test files using Node.js built-in test runner

## Educational Objectives

This tutorial project is designed to help developers learn:

### Core Learning Goals

1. **Node.js and Express.js server setup** - Understanding how to initialize and configure a basic HTTP server
2. **HTTP request routing and response handling** - Learning Express.js routing patterns and HTTP protocol fundamentals
3. **Error handling and logging in web servers** - Implementing proper error handling middleware and logging strategies
4. **Project structure and testing in Node.js** - Organizing code for maintainability and implementing basic testing practices

### Technical Concepts Demonstrated

- **Express.js 5.1.0 Features** - Latest framework capabilities including enhanced async error handling
- **Node.js 22.x LTS Benefits** - Long-term support features and performance improvements
- **Middleware Pattern** - Understanding the Express.js middleware chain for request processing
- **HTTP Protocol Basics** - Request-response cycle and status code handling
- **Modern JavaScript** - ES6+ features and asynchronous programming patterns

### Target Audience

- **Learning Developers** - Junior developers and students learning Node.js
- **Technical Educators** - Instructors seeking practical Node.js teaching materials
- **Development Teams** - Teams onboarding new Node.js developers

## Contribution

We welcome contributions to improve this educational resource!

### How to Contribute

1. **Open Issues** - Report bugs or suggest enhancements
2. **Submit Pull Requests** - Contribute code improvements or documentation updates
3. **Provide Feedback** - Share your experience using this tutorial

### Guidelines

- Maintain educational focus and simplicity
- Follow existing code style and patterns
- Include tests for new functionality
- Update documentation as needed

For detailed contribution guidelines, please see our [LICENSE](#license) file.

## License

This project is licensed under the **MIT License**.

The MIT License provides:
- Freedom to use, modify, and distribute
- Suitable for educational and commercial purposes
- Minimal restrictions and requirements

See the [LICENSE](LICENSE) file for complete details.

---

## Additional Resources

### Documentation Links

- [API Documentation](docs/api.md) - Detailed API reference for the /hello endpoint and server behavior
- [Testing Guide](docs/testing.md) - Instructions and details on running and understanding the test suite
- [Setup Guide](docs/setup.md) - Step-by-step setup and environment configuration instructions

### Related Technologies

- [Node.js Documentation](https://nodejs.org/docs/) - Official Node.js documentation
- [Express.js Guide](https://expressjs.com/) - Express.js framework documentation
- [npm Documentation](https://docs.npmjs.com/) - Package manager documentation

---

## Educational Notes

⚠️ **Important Considerations:**

- This project is intended for **learning and demonstration purposes only**. It is not production-hardened.
- For advanced topics such as database integration, authentication, or deployment, see future tutorial phases or the documentation links above.
- The tutorial emphasizes simplicity and educational value over production-ready features.

## Support

If you encounter issues or have questions:

1. Check the [documentation](docs/) for detailed guides
2. Review the [test suite](src/backend/test/) for usage examples
3. Open an issue in the project repository
4. Consult the [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/) official documentation

---

*This tutorial serves as a foundation for Node.js web development. As you progress, consider exploring more advanced topics like database integration, authentication, API design, and deployment strategies.*