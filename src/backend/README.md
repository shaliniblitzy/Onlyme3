# Node.js Tutorial Backend

A simple Node.js HTTP server built with Express.js 5.1.0 for educational purposes. This tutorial application demonstrates fundamental HTTP server concepts, Express.js framework usage, and Node.js runtime capabilities through a single `/hello` endpoint.

## Overview

This backend application serves as a foundational learning resource for Node.js web development, showcasing:

- **Node.js 22.x LTS Runtime**: Modern JavaScript execution environment with long-term support
- **Express.js 5.1.0 Framework**: Latest stable release with enhanced security and performance
- **HTTP Server Fundamentals**: Basic request-response cycle and routing concepts
- **Educational Focus**: Simplified architecture for clear understanding of core concepts

The application implements a minimal HTTP server that responds with "Hello world" to demonstrate essential server setup and HTTP request handling without complex integrations or data persistence.

## Getting Started

### Prerequisites

- **Node.js 22.x LTS** or higher (minimum Node.js 18+ required for Express.js 5.1.0 compatibility)
- **npm 11.4.2** or latest version (bundled with Node.js)

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Navigate to the backend directory**:
   ```bash
   cd src/backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Verify Node.js version**:
   ```bash
   node --version
   # Should output v22.x.x or higher
   ```

### Dependency Overview

The project uses minimal dependencies for educational clarity:

- **express@5.1.0**: Web application framework with latest security improvements
- **body-parser@^2.1.0**: HTTP request body parsing middleware (if needed for future extensions)

## Running the Server

### Basic Server Startup

Start the development server using one of these methods:

```bash
# Method 1: Using npm script
npm start

# Method 2: Direct Node.js execution
node server.js
```

### Server Configuration

- **Default Port**: 3000
- **Host**: localhost (127.0.0.1)
- **Environment**: Development
- **Protocol**: HTTP/1.1

### Expected Output

When successfully started, you should see:
```
Server listening on port 3000
Express.js 5.1.0 server started successfully
```

## API Reference

### Hello World Endpoint

The application provides a single endpoint for demonstration purposes:

#### GET /hello

Returns a simple "Hello world" message.

**Request:**
```http
GET /hello HTTP/1.1
Host: localhost:3000
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 11

Hello world
```

**Example Usage:**

Using curl:
```bash
curl http://localhost:3000/hello
```

Using a web browser:
```
http://localhost:3000/hello
```

Using Node.js HTTP module:
```javascript
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/hello',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.on('data', (chunk) => {
    console.log(`Response: ${chunk}`);
  });
});

req.end();
```

## Development Workflow

### Development Environment Setup

1. **Use nodemon for auto-reloading** (optional):
   ```bash
   # Install nodemon globally
   npm install -g nodemon
   
   # Run with auto-reload
   nodemon server.js
   ```

2. **Code Style and Linting**:
   - Use ESLint for code quality (configuration can be added)
   - Follow standard Node.js coding conventions
   - Use meaningful variable names and comments

3. **Recommended Editors**:
   - **Visual Studio Code**: Excellent Node.js support with extensions
   - **WebStorm**: Full-featured IDE with built-in Node.js tools
   - **Sublime Text**: Lightweight with Node.js plugins

### Development Best Practices

- **Error Handling**: Express.js 5.1.0 provides automatic promise error handling
- **Security**: Server bound to localhost for development security
- **Performance**: Response time target < 100ms for the hello endpoint
- **Logging**: Basic console logging for request/response tracking

## Testing

### Running Tests

Execute the test suite using Node.js built-in test runner:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Structure

Tests are located in the `test/` directory:

```
src/backend/test/
├── server.test.js      # Basic server functionality tests
└── hello.test.js       # Hello endpoint specific tests
```

### Test Coverage

The application maintains high test coverage for educational purposes:

- **Route Handler Testing**: 100% coverage of the `/hello` endpoint
- **Server Lifecycle Testing**: Startup and shutdown procedures
- **Error Handling Testing**: Invalid route and error response validation
- **HTTP Protocol Testing**: Request/response format validation

### Test Framework

Uses **Node.js built-in test runner** (Node.js 22.x LTS):
- Zero external dependencies
- Built-in assertion library
- Automatic test discovery
- Code coverage reporting with `--experimental-test-coverage`

## Environment Configuration

### Environment Variables

The application supports basic environment configuration:

```bash
# Port configuration (default: 3000)
PORT=3000

# Node environment (default: development)
NODE_ENV=development

# Log level (default: info)
LOG_LEVEL=info
```

### Configuration File

Create a `.env` file in the project root (optional):

```env
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```

### Custom Port Configuration

To run on a different port:

```bash
# Using environment variable
PORT=8080 node server.js

# Using npm script with custom port
PORT=8080 npm start
```

## Contribution Guidelines

### Code Style

- Follow **JavaScript Standard Style** conventions
- Use **ESLint** for code quality checks
- Write clear, descriptive commit messages
- Include comments for complex logic

### Development Workflow

1. **Fork the repository** (if applicable)
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Make your changes** with appropriate tests
4. **Run tests**: `npm test`
5. **Check code style**: `npm run lint`
6. **Commit changes**: `git commit -m "Add your feature"`
7. **Push to branch**: `git push origin feature/your-feature`
8. **Create Pull Request**

### Pull Request Process

- Ensure all tests pass
- Update documentation if necessary
- Follow the existing code style
- Include a clear description of changes
- Reference any related issues

### Code Quality Standards

- **Test Coverage**: Maintain > 90% test coverage
- **Documentation**: Update README for new features
- **Security**: Follow Node.js security best practices
- **Performance**: Ensure response times < 100ms

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**: 
- Kill the process using port 3000: `lsof -ti:3000 | xargs kill`
- Or use a different port: `PORT=8080 npm start`

#### Missing Dependencies
```bash
Error: Cannot find module 'express'
```
**Solution**:
- Install dependencies: `npm install`
- Verify package.json exists
- Check npm version: `npm --version`

#### Node.js Version Compatibility
```bash
Error: Express.js 5.1.0 requires Node.js 18 or higher
```
**Solution**:
- Update Node.js to version 22.x LTS
- Verify version: `node --version`
- Use Node Version Manager (nvm) for version management

#### Server Not Responding
```bash
curl: (7) Failed to connect to localhost port 3000: Connection refused
```
**Solution**:
- Ensure server is running: `npm start`
- Check console output for error messages
- Verify port configuration
- Test with different HTTP client

### Debug Mode

Run the application in debug mode for detailed logging:

```bash
# Enable debug output
DEBUG=* node server.js

# Node.js built-in debugging
node --inspect server.js
```

### Performance Issues

If experiencing slow response times:

1. **Check Node.js version**: Ensure using Node.js 22.x LTS
2. **Monitor memory usage**: `node --inspect server.js`
3. **Verify no blocking operations**: Review code for synchronous operations
4. **Test network connectivity**: Use `curl` or `ping` to test localhost

## License

This project is licensed under the **MIT License**.

### MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## Additional Resources

### Learning Resources

- **Node.js Documentation**: [https://nodejs.org/docs/](https://nodejs.org/docs/)
- **Express.js Guide**: [https://expressjs.com/](https://expressjs.com/)
- **npm Documentation**: [https://docs.npmjs.com/](https://docs.npmjs.com/)

### Express.js 5.1.0 Features

- **Enhanced Security**: ReDoS attack protection and CVE-2024-45590 mitigation
- **Improved Error Handling**: Automatic promise error handling for async middleware
- **Performance Improvements**: Optimized routing with path-to-regexp 8.x
- **Stability**: Long-term support and security updates

### Node.js 22.x LTS Benefits

- **Active LTS**: Support until October 2025, maintenance until April 2027
- **Performance**: Improved Stream and Buffer performance
- **Security**: Enhanced security features and regular updates
- **Compatibility**: Optimal compatibility with Express.js 5.1.0

This tutorial application provides a solid foundation for learning Node.js web development concepts and can be extended with additional features as your understanding grows.