/**
 * Express Error-Handling Middleware Module
 * 
 * This module provides centralized error handling for the Express.js 5.1.0 tutorial application,
 * capturing both synchronous and asynchronous errors from all routes and middleware. It ensures
 * robust error management with comprehensive logging, standardized HTTP responses, and educational
 * clarity for understanding error handling patterns in Node.js applications.
 * 
 * The middleware leverages Express 5.x enhanced error handling capabilities, including automatic
 * promise rejection handling and improved error propagation through the middleware chain.
 * 
 * Used throughout the Express application to provide consistent error responses, operational
 * transparency, and educational examples of production-ready error management patterns.
 * 
 * @fileoverview Centralized Express error-handling middleware for logging and standardized responses
 * @author Backend Development Team
 * @version 1.0.0
 * @since 2024
 */

// Import required utilities from the centralized logger and HTTP status modules
const { error } = require('../utils/logger.js'); // Winston v3.11.0 - Centralized logging utility
const { getReasonPhrase } = require('../utils/httpStatus.js'); // HTTP status code utility

/**
 * Default HTTP status code for unhandled errors
 * 
 * This constant defines the fallback HTTP status code used when an error does not
 * specify its own status code or statusCode property. Following HTTP protocol standards,
 * 500 Internal Server Error is the appropriate response for unhandled server exceptions.
 * 
 * @constant {number} DEFAULT_ERROR_STATUS
 * @readonly
 */
const DEFAULT_ERROR_STATUS = 500;

/**
 * Express Error-Handling Middleware Function
 * 
 * This middleware function implements the Express.js error-handling pattern with the signature
 * (err, req, res, next), capturing all errors passed to next(err) throughout the application.
 * It provides comprehensive error logging, standardized HTTP responses, and educational
 * transparency for understanding error management in production Node.js applications.
 * 
 * The middleware handles various error types including:
 * - Application errors with custom status codes
 * - System errors and exceptions
 * - Validation errors from middleware
 * - Asynchronous errors from promise rejections (Express 5.x automatic handling)
 * - Network and database connection errors
 * 
 * Error responses follow a standardized JSON format with status code, reason phrase,
 * and appropriate error message for both development and production environments.
 * 
 * @param {Error|object|string} err - Error object, error details, or error message string
 * @param {object} req - Express request object containing HTTP request information
 * @param {object} res - Express response object for sending HTTP responses
 * @param {function} next - Express next function for middleware chain continuation
 * @returns {void} Sends an HTTP error response and terminates the request-response cycle
 * 
 * @example
 * // Register error handler as the last middleware in Express application
 * app.use(errorHandler);
 * 
 * @example
 * // Error thrown in route handler is automatically caught by this middleware
 * app.get('/api/data', async (req, res) => {
 *     throw new Error('Database connection failed');
 *     // Error automatically forwarded to errorHandler in Express 5.x
 * });
 * 
 * @example
 * // Manually pass error to error handler
 * app.get('/api/users', (req, res, next) => {
 *     const error = new Error('User not found');
 *     error.status = 404;
 *     next(error); // Forwards to errorHandler middleware
 * });
 * 
 * @since 1.0.0
 */
function errorHandler(err, req, res, next) {
    // Step 1: Determine the HTTP status code from err.status, err.statusCode, or default to DEFAULT_ERROR_STATUS (500)
    let statusCode;
    
    // Check for status code in various common property names used by different libraries
    if (err.status && typeof err.status === 'number') {
        statusCode = err.status;
    } else if (err.statusCode && typeof err.statusCode === 'number') {
        statusCode = err.statusCode;
    } else {
        // Default to 500 Internal Server Error for unhandled exceptions
        statusCode = DEFAULT_ERROR_STATUS;
    }
    
    // Ensure status code is within valid HTTP range (100-599)
    if (statusCode < 100 || statusCode > 599) {
        statusCode = DEFAULT_ERROR_STATUS;
    }
    
    // Step 2: Resolve the reason phrase using getReasonPhrase(statusCode)
    const reasonPhrase = getReasonPhrase(statusCode);
    
    // Step 3: Extract error message from err.message, or use a generic message for production environments
    let errorMessage;
    
    if (err && typeof err.message === 'string' && err.message.trim().length > 0) {
        // Use the specific error message if available
        errorMessage = err.message;
    } else if (typeof err === 'string' && err.trim().length > 0) {
        // Handle case where err is a string rather than an Error object
        errorMessage = err;
    } else {
        // Provide a generic error message for production safety
        errorMessage = 'An unexpected error occurred';
    }
    
    // Step 4: Check if headers have already been sent to prevent Express default error handler conflicts
    if (res.headersSent) {
        // If headers are already sent, delegate to Express's default error handler
        // This prevents "Cannot set headers after they are sent" errors
        return next(err);
    }
    
    // Step 5: Log the error using the error() logger, including stack trace and request context
    const logMetadata = {
        method: req.method,
        path: req.originalUrl || req.url,
        statusCode: statusCode,
        userAgent: req.get('User-Agent') || 'Unknown',
        timestamp: new Date().toISOString(),
        requestId: req.id || 'unknown' // If request ID middleware is used
    };
    
    // Log error with comprehensive context for debugging and monitoring
    error(err, logMetadata);
    
    // Step 6: Set the response status code and Content-Type to application/json
    res.status(statusCode);
    res.set('Content-Type', 'application/json');
    
    // Step 7: Send a JSON response with { status: statusCode, error: reasonPhrase, message: errorMessage }
    const errorResponse = {
        status: statusCode,
        error: reasonPhrase,
        message: errorMessage
    };
    
    // Add additional development information if in development environment
    if (process.env.NODE_ENV === 'development' && err.stack) {
        errorResponse.stack = err.stack;
    }
    
    // Send the standardized error response
    res.json(errorResponse);
    
    // Note: We don't call next() here as we've handled the error and sent a response
    // The request-response cycle is complete
}

/**
 * Export the errorHandler function for use throughout the Express application
 * 
 * This named export provides the error handling middleware for registration
 * in the Express application middleware stack. The middleware should be
 * registered as the last middleware to catch all errors that occur during
 * request processing.
 * 
 * The errorHandler follows Express.js conventions and integrates seamlessly
 * with Express 5.x enhanced error handling features, including automatic
 * promise rejection handling and improved error propagation.
 * 
 * @example
 * // Import and register the error handler in Express application
 * const { errorHandler } = require('./middleware/errorHandler');
 * app.use(errorHandler);
 */
module.exports = {
    errorHandler
};