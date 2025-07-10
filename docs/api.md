# Node.js Tutorial Application API Documentation

## Overview

This document provides comprehensive API documentation for the Node.js tutorial application's backend HTTP API. The application demonstrates fundamental concepts of web server development using Express.js 5.1.0 framework running on Node.js 22.x LTS, emphasizing educational clarity while maintaining production-ready patterns.

The API serves as a learning resource for developers exploring Node.js web server fundamentals, Express.js middleware patterns, HTTP protocol compliance, and server lifecycle management.

## Base URL

```
http://localhost:3000
```

## Technology Stack

- **Runtime**: Node.js 22.x LTS
- **Framework**: Express.js 5.1.0
- **Protocol**: HTTP/1.1
- **Content Types**: `text/plain`, `application/json`

## API Endpoints

### GET /hello

Returns a simple "Hello world" text response, demonstrating basic HTTP server functionality and Express.js routing patterns.

**Request**

```http
GET /hello HTTP/1.1
Host: localhost:3000
Accept: text/plain
```

**Response**

```http
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Content-Length: 11

Hello world
```

**Example using cURL**

```bash
curl -i http://localhost:3000/hello
```

**Example using JavaScript fetch**

```javascript
fetch('http://localhost:3000/hello')
  .then(response => response.text())
  .then(data => console.log(data)); // "Hello world"
```

**Response Details**

- **Status Code**: 200 OK
- **Content-Type**: `text/plain; charset=utf-8`
- **Body**: `Hello world`
- **Response Time**: < 100ms (typical)

## Error Handling

The API implements centralized error handling middleware that captures all errors and returns standardized JSON responses with appropriate HTTP status codes.

### Error Response Format

All error responses follow a consistent JSON structure:

```json
{
  "status": 404,
  "error": "Not Found",
  "message": "The requested resource was not found."
}
```

### Common Error Responses

#### 404 Not Found

Returned when requesting a non-existent endpoint.

```http
GET /nonexistent HTTP/1.1
Host: localhost:3000
```

```json
{
  "status": 404,
  "error": "Not Found",
  "message": "The requested resource was not found."
}
```

#### 405 Method Not Allowed

Returned when using an unsupported HTTP method on an existing endpoint.

```http
POST /hello HTTP/1.1
Host: localhost:3000
```

```json
{
  "status": 405,
  "error": "Method Not Allowed",
  "message": "The requested method is not supported for this endpoint."
}
```

#### 500 Internal Server Error

Returned when an unexpected error occurs on the server.

```json
{
  "status": 500,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred."
}
```

## Request/Response Logging

All HTTP requests and responses are logged using structured request logging middleware. The logging format includes:

- **Timestamp**: ISO 8601 format
- **Method**: HTTP method (GET, POST, etc.)
- **Path**: Request path
- **Status Code**: HTTP status code
- **Reason Phrase**: HTTP reason phrase
- **Response Time**: Request processing time in milliseconds
- **Error Message**: Error details (if applicable)

**Example Log Entry**

```
[2024-01-15T14:30:45.123Z] [HTTP] GET /hello -> 200 OK [45ms]
[2024-01-15T14:30:46.789Z] [HTTP] GET /invalid -> 404 Not Found [12ms]
```

## Server Lifecycle Management

The HTTP server implements comprehensive lifecycle management with proper startup, shutdown, and error handling procedures.

### Server Startup

The server starts on port 3000 by default (configurable via `PORT` environment variable):

```bash
# Default port
npm start

# Custom port
PORT=8080 npm start
```

**Startup Log Example**

```
[2024-01-15T14:30:00.000Z] [INFO] Server startup initiated {"port":3000,"nodeVersion":"v22.x.x"}
[2024-01-15T14:30:00.123Z] [INFO] HTTP server started successfully {"port":3000,"url":"http://localhost:3000"}
```

### Graceful Shutdown

The server responds to process signals for graceful shutdown:

- **SIGINT**: Interrupt signal (Ctrl+C)
- **SIGTERM**: Termination signal (process managers)

```bash
# Graceful shutdown
Ctrl+C
```

**Shutdown Log Example**

```
[2024-01-15T14:30:45.000Z] [INFO] SIGINT signal received
[2024-01-15T14:30:45.123Z] [INFO] Server shutdown initiated: SIGINT signal received
[2024-01-15T14:30:45.456Z] [INFO] HTTP server closed successfully
```

### Error Handling

The server implements comprehensive error handling for:

- **Uncaught Exceptions**: Logged and trigger graceful shutdown
- **Unhandled Promise Rejections**: Logged and trigger graceful shutdown
- **Server Errors**: Port binding failures, permission errors

## Security Considerations

### Built-in Security Features

- **Express.js 5.1.0 Security**: Includes ReDoS attack protection via path-to-regexp 8.x
- **Header Security**: Disables `X-Powered-By` header
- **Error Information**: Controlled error message disclosure
- **Local Binding**: Server binds to localhost for development security

### Development Environment

The API is designed for local development and educational purposes:

- **Localhost Only**: Server bound to `127.0.0.1`
- **No Authentication**: No user authentication or session management
- **No Sensitive Data**: Static responses only
- **Development Logging**: Verbose logging for educational purposes

## Performance Characteristics

### Response Time Targets

- **Hello Endpoint**: < 100ms average response time
- **Error Responses**: < 50ms average response time
- **Server Startup**: < 5 seconds initialization time

### Resource Usage

- **Memory Usage**: < 50MB during normal operation
- **CPU Usage**: Minimal processing overhead
- **Concurrent Connections**: Suitable for tutorial demonstration (1-10 concurrent)

## HTTP Status Codes

The API uses standard HTTP status codes as defined in RFC 7231:

| Code | Reason Phrase | Description |
|------|---------------|-------------|
| 200 | OK | Successful response for /hello endpoint |
| 400 | Bad Request | Malformed request |
| 404 | Not Found | Resource not found |
| 405 | Method Not Allowed | Unsupported HTTP method |
| 500 | Internal Server Error | Server error |

## Integration Examples

### Node.js HTTP Module

```javascript
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/hello',
  method: 'GET'
};

const req = http.request(options, (res) => {
  res.on('data', (chunk) => {
    console.log(`Response: ${chunk}`);
  });
});

req.end();
```

### Axios

```javascript
const axios = require('axios');

axios.get('http://localhost:3000/hello')
  .then(response => {
    console.log(response.data); // "Hello world"
  })
  .catch(error => {
    console.error(error.response.data);
  });
```

### Express.js Client

```javascript
const express = require('express');
const app = express();

app.get('/proxy', async (req, res) => {
  try {
    const response = await fetch('http://localhost:3000/hello');
    const data = await response.text();
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Testing

The API supports testing with various frameworks:

### Node.js Built-in Test Runner

```javascript
import { test } from 'node:test';
import assert from 'node:assert';

test('GET /hello returns Hello world', async (t) => {
  const response = await fetch('http://localhost:3000/hello');
  const data = await response.text();
  
  assert.strictEqual(response.status, 200);
  assert.strictEqual(data, 'Hello world');
});
```

### SuperTest

```javascript
const request = require('supertest');
const app = require('../src/backend/config/express');

describe('GET /hello', () => {
  it('should return Hello world', async () => {
    const response = await request(app)
      .get('/hello')
      .expect(200)
      .expect('Content-Type', /text\/plain/);
    
    expect(response.text).toBe('Hello world');
  });
});
```

## Monitoring and Health Checks

### Basic Health Check

The `/hello` endpoint can serve as a basic health check:

```bash
curl -f http://localhost:3000/hello || echo "Service unavailable"
```

### Logging Monitoring

Monitor application logs for operational insights:

```bash
# Monitor request logs
tail -f server.log | grep "[HTTP]"

# Monitor error logs
tail -f server.log | grep "[ERROR]"
```

## Educational Notes

This API documentation demonstrates several key concepts for Node.js web development:

### Express.js Framework Patterns

- **Middleware Pipeline**: Request logging, error handling, route processing
- **Route Organization**: Modular router design with separation of concerns
- **Error Handling**: Centralized error middleware with standardized responses
- **Lifecycle Management**: Proper server startup and shutdown procedures

### HTTP Protocol Compliance

- **Status Codes**: Proper use of HTTP status codes and reason phrases
- **Content Types**: Appropriate content type headers for different response types
- **Error Responses**: Standardized error response format with helpful messages
- **Request/Response Cycle**: Complete HTTP transaction handling

### Production-Ready Patterns

- **Logging**: Comprehensive request/response logging for observability
- **Error Handling**: Robust error handling with graceful degradation
- **Security**: Basic security practices and header management
- **Performance**: Efficient request processing with minimal overhead

### Node.js Best Practices

- **Process Management**: Signal handling for graceful shutdown
- **Error Resilience**: Uncaught exception and promise rejection handling
- **Resource Management**: Efficient memory and CPU usage
- **Modular Design**: Clear separation of concerns and testable components

## Conclusion

This API documentation provides a comprehensive reference for the Node.js tutorial application's HTTP API. The implementation demonstrates fundamental web server concepts while maintaining production-ready patterns suitable for educational purposes.

The API serves as a foundation for learning Node.js web development, Express.js framework usage, HTTP protocol compliance, and server lifecycle management. It provides clear examples of best practices that can be extended and adapted for more complex applications.

For additional information about the implementation details, refer to the source code in the `src/backend/` directory, which includes comprehensive documentation and educational comments throughout the codebase.

---

**API Version**: 1.0.0  
**Last Updated**: 2024  
**Node.js Version**: 22.x LTS  
**Express.js Version**: 5.1.0  
**Documentation Format**: Markdown