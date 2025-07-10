/**
 * Express Request Logger Middleware
 * 
 * This middleware provides comprehensive HTTP request and response logging for
 * educational and production environments. It captures method, path, status code,
 * reason phrase, response time, and error messages using the centralized logging
 * utility. Designed to integrate seamlessly with Express.js 5.1.0 applications
 * running on Node.js 22.x LTS.
 * 
 * Key Features:
 * - Standardized request/response logging format
 * - High-resolution response time measurement
 * - Error-safe logging with graceful error handling
 * - Configurable path filtering for ignored routes
 * - Integration with centralized logger and HTTP status utilities
 * - Production-ready performance with minimal overhead
 * 
 * Educational Value:
 * - Demonstrates Express.js middleware patterns and best practices
 * - Shows proper event-driven logging using response 'finish' events
 * - Illustrates error handling and defensive programming techniques
 * - Provides clear examples of modular code organization
 * 
 * @fileoverview Express middleware for comprehensive HTTP request/response logging
 * @author Backend Development Team
 * @version 1.0.0
 * @since 2024
 */

// Import centralized logging utility for HTTP event logging
const { http } = require('../utils/logger.js'); // v1.0.0 - Centralized HTTP logging function

// Import HTTP status utility for reason phrase resolution
const { getReasonPhrase } = require('../utils/httpStatus.js'); // v1.0.0 - HTTP status code to reason phrase mapping

// Optional: Import Node.js HTTP module for constants (if needed for advanced logging)
const http = require('node:http'); // Node.js built-in HTTP module

/**
 * Default paths to ignore during request logging
 * 
 * This array contains commonly requested paths that should be excluded from
 * request logging to reduce noise and improve log readability. These paths
 * typically represent browser-initiated requests or health checks that don't
 * provide meaningful business value in logs.
 * 
 * @constant {string[]} DEFAULT_LOG_IGNORED_PATHS
 * @readonly
 */
const DEFAULT_LOG_IGNORED_PATHS = [
    '/favicon.ico'  // Browser favicon requests are typically not relevant for logging
];

/**
 * Express middleware for logging HTTP requests and responses
 * 
 * This middleware function captures comprehensive information about each HTTP
 * request and its corresponding response, including timing data, status codes,
 * and error conditions. It uses the Express.js middleware pattern and attaches
 * to the response 'finish' event to ensure logging occurs after the response
 * has been completely sent to the client.
 * 
 * The middleware integrates with the centralized logging utility to maintain
 * consistent log formatting across the application and uses the HTTP status
 * utility to provide human-readable status descriptions.
 * 
 * Performance Considerations:
 * - Uses high-resolution timing for accurate response time measurement
 * - Minimal overhead during request processing
 * - Asynchronous logging to avoid blocking the response
 * - Efficient path filtering to reduce unnecessary logging
 * 
 * Error Handling:
 * - Gracefully handles logging errors without affecting the response
 * - Captures and logs error messages from response locals
 * - Defensive programming to prevent middleware from crashing the application
 * 
 * @param {Object} req - Express request object containing HTTP request details
 * @param {Object} res - Express response object for HTTP response handling
 * @param {Function} next - Express next middleware function for pipeline continuation
 * @returns {void} Passes control to the next middleware after logging setup
 * 
 * @example
 * // Basic usage in Express application
 * const express = require('express');
 * const { requestLogger } = require('./middleware/requestLogger');
 * const app = express();
 * 
 * // Register the request logger middleware
 * app.use(requestLogger);
 * 
 * // Define routes after middleware registration
 * app.get('/hello', (req, res) => {
 *   res.send('Hello world');
 * });
 * 
 * @example
 * // Expected log output format:
 * // [2024-01-15T14:30:45.123Z] [HTTP] GET /hello -> 200 OK [45ms]
 * // [2024-01-15T14:30:46.789Z] [HTTP] POST /api/users -> 400 Bad Request [23ms] Invalid request body
 * 
 * @since 1.0.0
 */
function requestLogger(req, res, next) {
    // Extract the request path for filtering and logging
    const requestPath = req.originalUrl || req.url;
    
    // Check if the request path should be ignored based on the configured ignore list
    // This reduces log noise from common browser requests like favicon.ico
    if (DEFAULT_LOG_IGNORED_PATHS.includes(requestPath)) {
        // Skip logging for ignored paths and immediately pass control to next middleware
        return next();
    }
    
    // Record the high-resolution start time for accurate response time calculation
    // Using process.hrtime.bigint() provides nanosecond precision for timing measurements
    const startTime = process.hrtime.bigint();
    
    // Attach an event listener to the response 'finish' event to log after response completion
    // The 'finish' event is emitted when the response has been handed off to the operating system
    // This ensures we capture the complete response time and final status code
    res.on('finish', () => {
        try {
            // Calculate the response time in milliseconds with high precision
            const endTime = process.hrtime.bigint();
            const responseTimeNs = endTime - startTime;
            const responseTimeMs = Math.round(Number(responseTimeNs) / 1000000); // Convert nanoseconds to milliseconds
            
            // Extract HTTP method from the request (GET, POST, PUT, DELETE, etc.)
            const method = req.method;
            
            // Extract the request path or URL for logging
            const path = requestPath;
            
            // Extract the HTTP status code from the response
            const statusCode = res.statusCode;
            
            // Use the HTTP status utility to resolve the status code to a human-readable reason phrase
            const reasonPhrase = getReasonPhrase(statusCode);
            
            // Check for error message in response locals (commonly set by error handling middleware)
            // This allows other middleware to provide context about errors that occurred
            let errorMessage = null;
            if (res.locals && res.locals.errorMessage) {
                errorMessage = res.locals.errorMessage;
            }
            
            // Log the HTTP request/response event using the centralized logging utility
            // The logger.http function handles appropriate output routing based on status code
            http(method, path, statusCode, responseTimeMs, errorMessage);
            
        } catch (loggingError) {
            // Handle any errors that occur during the logging process
            // This ensures that logging errors don't crash the application or affect responses
            // We use console.error directly here to avoid potential circular logging issues
            console.error('[REQUEST_LOGGER_ERROR]', 'Error occurred during request logging:', loggingError.message);
            
            // Optionally, you could use the centralized logger for error logging if safe to do so
            // However, we use console.error to avoid potential issues with the logging system itself
        }
    });
    
    // Continue the middleware chain by calling next()
    // This allows the request to proceed to the next middleware or route handler
    next();
}

/**
 * Export the request logger middleware for use in Express applications
 * 
 * This export makes the requestLogger middleware available for import and use
 * in other parts of the application. The middleware is exported as a named export
 * to provide clear, explicit imports and support tree-shaking in bundled environments.
 * 
 * The exported middleware integrates seamlessly with Express.js applications and
 * provides comprehensive HTTP request/response logging with the following features:
 * 
 * - Standardized log format with timestamps and detailed request information
 * - High-precision response time measurement for performance monitoring
 * - Error-safe operation that won't crash the application
 * - Configurable path filtering for noise reduction
 * - Integration with centralized logging and HTTP status utilities
 * 
 * Usage:
 * - Import and register early in the middleware stack for comprehensive coverage
 * - Ensure proper error handling middleware is registered after route handlers
 * - Consider log rotation and management for production deployments
 * 
 * @exports {Function} requestLogger - Express middleware function for HTTP request/response logging
 */
module.exports = {
    requestLogger
};