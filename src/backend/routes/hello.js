/**
 * Hello World Route Handler Module
 * 
 * This module implements the /hello endpoint as an Express Router, providing
 * a simple GET route that returns a "Hello world" plain text response.
 * The implementation follows Express.js 5.1.0 best practices with proper
 * error handling, HTTP protocol compliance, and modular design patterns.
 * 
 * The route serves as an educational example of Express.js routing fundamentals,
 * demonstrating proper HTTP status code usage, content type headers, and
 * error propagation to centralized middleware. The implementation supports
 * the Node.js tutorial application's learning objectives while maintaining
 * production-ready code quality.
 * 
 * Features:
 * - Protocol-compliant HTTP 200 responses
 * - Proper Content-Type header setting
 * - Centralized error handling integration
 * - Modular router design for maintainability
 * - Educational code clarity and documentation
 * 
 * @fileoverview Express.js route handler for the /hello endpoint
 * @author Backend Development Team
 * @version 1.0.0
 * @since 2024
 * @requires express ^5.1.0
 * @requires ../utils/httpStatus.js
 */

// External Dependencies
const express = require('express'); // ^5.1.0 - Core web framework for Node.js

// Internal Dependencies
const { HTTP_STATUS_CODES } = require('../utils/httpStatus.js');

/**
 * Express Router Instance for Hello Endpoint
 * 
 * Creates a dedicated router instance for the /hello endpoint to support
 * modular route organization and clean separation of concerns. The router
 * will be integrated into the main Express application to provide the
 * complete routing functionality.
 * 
 * Using Express.Router() enables:
 * - Modular route definitions
 * - Middleware isolation
 * - Clean route organization
 * - Easy integration with main application
 * 
 * @constant {express.Router} router
 * @since 1.0.0
 */
const router = express.Router();

/**
 * Hello World Route Handler Function
 * 
 * Processes GET requests to the /hello endpoint and generates a standard
 * HTTP 200 response with "Hello world" plain text content. The handler
 * demonstrates proper Express.js request/response patterns with explicit
 * status code setting, content type specification, and error handling.
 * 
 * The implementation follows HTTP protocol standards by:
 * - Setting explicit HTTP 200 status code using canonical constants
 * - Specifying Content-Type as 'text/plain; charset=utf-8'
 * - Sending the exact response text "Hello world"
 * - Propagating any errors to Express error handling middleware
 * 
 * Error handling utilizes Express.js 5.0's enhanced Promise-based error
 * handling, where thrown errors are automatically passed to the next()
 * middleware function for centralized error processing.
 * 
 * @async
 * @function helloHandler
 * @param {express.Request} req - Express request object containing HTTP request data
 * @param {express.Response} res - Express response object for sending HTTP responses
 * @param {express.NextFunction} next - Express next function for middleware chain control
 * @returns {void} Sends HTTP response or propagates errors to error handling middleware
 * 
 * @throws {Error} Any errors are caught and passed to next(err) for centralized handling
 * 
 * @example
 * // GET /hello
 * // Response: HTTP 200 OK
 * // Content-Type: text/plain; charset=utf-8
 * // Body: Hello world
 * 
 * @since 1.0.0
 */
async function helloHandler(req, res, next) {
    try {
        // Set HTTP status code to 200 (OK) using canonical status code constants
        // This ensures protocol compliance and consistent status code usage
        // throughout the application
        res.status(parseInt(Object.keys(HTTP_STATUS_CODES).find(key => HTTP_STATUS_CODES[key] === 'OK')));
        
        // Set Content-Type header to indicate plain text response with UTF-8 encoding
        // This ensures proper client-side content interpretation and character handling
        res.set('Content-Type', 'text/plain; charset=utf-8');
        
        // Send the response body with the exact string "Hello world"
        // This completes the HTTP response cycle with the required content
        res.send('Hello world');
        
    } catch (error) {
        // Pass any errors to the Express error handling middleware
        // This ensures centralized error logging and consistent error responses
        // Express 5.0 automatically handles Promise rejections, but explicit
        // error handling provides better control and educational clarity
        next(error);
    }
}

/**
 * Route Definition: GET /hello
 * 
 * Defines the GET route handler for the /hello endpoint using the Express
 * router. This route responds to HTTP GET requests with a plain text
 * "Hello world" response, demonstrating basic Express.js routing patterns.
 * 
 * Route Configuration:
 * - Method: GET
 * - Path: /hello
 * - Handler: helloHandler function
 * - Response: HTTP 200 with "Hello world" plain text
 * 
 * The route implementation follows Express.js best practices for:
 * - Clear route path specification
 * - Dedicated handler function usage
 * - Proper HTTP method restriction
 * - Error handling integration
 * 
 * @route GET /hello
 * @handler helloHandler
 * @returns {string} "Hello world" plain text response
 * @since 1.0.0
 */
router.get('/hello', helloHandler);

/**
 * Module Exports
 * 
 * Exports the configured Express router instance containing the /hello
 * endpoint definition. This router can be integrated into the main Express
 * application using app.use() to provide the complete routing functionality.
 * 
 * The exported router includes:
 * - GET /hello route handler
 * - Error handling integration
 * - Protocol-compliant response generation
 * - Modular design for maintainability
 * 
 * Integration Example:
 * const helloRouter = require('./routes/hello');
 * app.use(helloRouter);
 * 
 * @exports {express.Router} router - Configured Express router with /hello endpoint
 * @since 1.0.0
 */
module.exports = router;