/**
 * Express.js Application Configuration Module
 * 
 * This module configures and initializes the Express.js application instance for the backend
 * HTTP server, implementing core middleware setup, route registration, and error handling
 * according to Express.js 5.1.0 best practices. The configuration applies middleware in the
 * correct order to ensure proper request processing, comprehensive logging, and robust error
 * management throughout the application lifecycle.
 * 
 * The implementation centralizes Express app configuration, ensuring consistent middleware
 * application, modular route integration, and production-ready error handling. This design
 * supports the tutorial's educational objectives while demonstrating enterprise-grade
 * application architecture and maintainability patterns.
 * 
 * Key Features:
 * - Centralized Express application configuration
 * - Ordered middleware application for optimal request processing
 * - Modular route integration with comprehensive error handling
 * - Production-ready setup with educational clarity
 * - HTTP protocol compliance and security best practices
 * - Express.js 5.1.0 enhanced features utilization
 * 
 * Middleware Application Order:
 * 1. requestLogger - Logs all incoming HTTP requests and responses
 * 2. express.json() - Parses JSON request bodies (for extensibility)
 * 3. express.urlencoded() - Parses URL-encoded request bodies (for extensibility)
 * 4. router - Mounts all application routes including /hello endpoint
 * 5. errorHandler - Catches and handles all errors (must be last)
 * 
 * @fileoverview Express.js application configuration and initialization
 * @author Backend Development Team
 * @version 1.0.0
 * @since 2024
 * @requires express ^5.1.0
 * @requires ../middleware/index.js
 * @requires ../routes/index.js
 */

// External Dependencies
const express = require('express'); // ^5.1.0 - Core web framework for Node.js with enhanced security and performance

// Internal Dependencies - Middleware
const { requestLogger, errorHandler } = require('../middleware/index.js');

// Internal Dependencies - Routes
const router = require('../routes/index.js');

/**
 * Express Application Configuration Function
 * 
 * Initializes and configures the Express.js application instance with all necessary
 * middleware, route handlers, and error handling components. This function implements
 * the centralized configuration pattern recommended for Express.js applications,
 * ensuring consistent middleware application order and proper error handling setup.
 * 
 * The configuration process follows Express.js best practices:
 * - Middleware is applied in the correct order for optimal request processing
 * - Route registration is centralized through the main router
 * - Error handling middleware is applied last to catch all errors
 * - Body parsing middleware is included for extensibility
 * - Request logging provides comprehensive operational visibility
 * 
 * Express.js 5.1.0 Enhanced Features:
 * - Improved route matching with path-to-regexp 8.x for enhanced security
 * - Automatic Promise rejection handling for async middleware
 * - Enhanced error handling with better error propagation
 * - ReDoS attack mitigation through upgraded routing engine
 * - Better performance and reliability characteristics
 * 
 * Educational Value:
 * This implementation demonstrates fundamental Express.js application setup patterns
 * including middleware composition, route organization, error handling, and the
 * importance of middleware ordering for proper request processing flow.
 * 
 * @function configureExpressApp
 * @returns {express.Application} Fully configured Express application instance ready for HTTP server usage
 * @throws {Error} Configuration errors are propagated to allow application startup failure detection
 * 
 * @example
 * // Usage in main server file
 * const app = configureExpressApp();
 * app.listen(3000, () => {
 *     console.log('Server running on port 3000');
 * });
 * 
 * @since 1.0.0
 */
function configureExpressApp() {
    try {
        // Step 1: Create a new Express application instance
        // This initializes the core Express.js application with all default
        // settings and configurations for HTTP request processing
        const app = express();

        // Step 2: Apply requestLogger middleware globally
        // This middleware logs all incoming HTTP requests and responses with
        // comprehensive information including method, path, status code,
        // response time, and error messages for educational and operational visibility
        app.use(requestLogger);

        // Step 3: Apply built-in body parsing middleware for extensibility
        // These middleware functions parse JSON and URL-encoded request bodies,
        // enabling the application to handle various content types even though
        // the /hello endpoint doesn't require body parsing. This setup supports
        // future extensibility when additional endpoints are added.
        
        // JSON body parsing middleware - handles Content-Type: application/json
        app.use(express.json({
            limit: '1mb',        // Set reasonable request size limit
            strict: true,        // Only parse objects and arrays
            type: 'application/json'  // Explicit content type specification
        }));

        // URL-encoded body parsing middleware - handles Content-Type: application/x-www-form-urlencoded
        app.use(express.urlencoded({
            extended: true,      // Use qs library for rich object parsing
            limit: '1mb',        // Set reasonable request size limit
            type: 'application/x-www-form-urlencoded'  // Explicit content type specification
        }));

        // Step 4: Mount the main router at the root path
        // This registers all application routes including the /hello endpoint
        // through the centralized router that aggregates all feature-specific
        // route handlers. The router is mounted at the root path (/) to ensure
        // all routes are accessible at their intended URLs.
        app.use('/', router);

        // Step 5: Apply errorHandler middleware as the last middleware
        // This middleware catches and handles all errors from routes and
        // previous middleware, providing centralized error logging and
        // standardized HTTP error responses. It must be applied last to
        // ensure all errors are properly caught and handled.
        app.use(errorHandler);

        // Log successful configuration for development visibility
        console.log('✓ Express application configured successfully');
        console.log('✓ Request logging middleware applied');
        console.log('✓ Body parsing middleware configured');
        console.log('✓ Application routes mounted at root path');
        console.log('✓ Error handling middleware applied');
        console.log('✓ Application ready for HTTP server integration');

        // Step 6: Return the fully configured Express application instance
        // The app is now ready to be used by the HTTP server for processing
        // incoming requests according to the configured middleware stack
        return app;

    } catch (error) {
        // Handle any configuration errors with comprehensive error information
        console.error('✗ Express application configuration failed:', error.message);
        console.error('✗ Please check middleware and route configurations');
        
        // Re-throw the error to prevent the application from starting with
        // improperly configured Express instance
        throw new Error(`Express application configuration failed: ${error.message}`);
    }
}

/**
 * Express Application Instance
 * 
 * Creates and configures the Express application instance by calling the
 * configureExpressApp function. This instance is fully configured with all
 * necessary middleware, routes, and error handling components, ready for
 * integration with the HTTP server.
 * 
 * The configured application includes:
 * - Comprehensive request/response logging via requestLogger middleware
 * - JSON and URL-encoded body parsing for extensibility
 * - All application routes mounted via the central router
 * - Centralized error handling through errorHandler middleware
 * - Express.js 5.1.0 enhanced security and performance features
 * - Production-ready configuration with educational clarity
 * 
 * Error Handling:
 * Any configuration errors are caught and logged with detailed information
 * to support debugging and troubleshooting during development and deployment.
 * 
 * @constant {express.Application} app - Configured Express application instance
 * @since 1.0.0
 */
const app = configureExpressApp();

/**
 * Module Exports
 * 
 * Exports the fully configured Express application instance for use by the
 * main server entry point. The exported app is ready to be integrated with
 * Node.js HTTP server functionality and can immediately begin processing
 * HTTP requests according to the configured middleware stack and routes.
 * 
 * The exported Express application provides:
 * - Complete middleware stack with proper ordering
 * - All registered application routes including /hello endpoint
 * - Centralized error handling and logging
 * - HTTP protocol compliance and security features
 * - Production-ready performance and reliability
 * 
 * Integration Pattern:
 * ```javascript
 * const app = require('./config/express');
 * const server = app.listen(3000, () => {
 *     console.log('Server running on port 3000');
 * });
 * ```
 * 
 * Route Availability:
 * - GET /hello - Returns "Hello world" plain text response
 * - All routes include comprehensive logging and error handling
 * - Future routes can be easily added through the modular router system
 * 
 * Middleware Stack:
 * 1. requestLogger - Logs all HTTP requests and responses
 * 2. express.json() - Parses JSON request bodies
 * 3. express.urlencoded() - Parses URL-encoded request bodies
 * 4. router - Processes all application routes
 * 5. errorHandler - Handles all errors with standardized responses
 * 
 * @exports {express.Application} app - Configured Express application instance
 * @since 1.0.0
 */
module.exports = app;

/**
 * Educational Notes on Express.js Configuration
 * 
 * This Express configuration module demonstrates several important concepts
 * for learning Express.js and Node.js development:
 * 
 * 1. **Middleware Ordering**: The order in which middleware is applied is
 *    crucial for proper request processing. This configuration shows:
 *    - Logging middleware first to capture all requests
 *    - Body parsing middleware before routes that might need parsed data
 *    - Routes in the middle of the stack for request processing
 *    - Error handling middleware last to catch all errors
 * 
 * 2. **Centralized Configuration**: By centralizing Express configuration
 *    in a dedicated module, we achieve:
 *    - Consistent middleware application across the application
 *    - Easy maintenance and modification of app configuration
 *    - Clear separation between server setup and application logic
 *    - Educational clarity about Express.js setup patterns
 * 
 * 3. **Modular Route Integration**: The configuration demonstrates how to
 *    integrate modular routes:
 *    - Routes are organized in separate modules for maintainability
 *    - The main router aggregates all feature-specific routes
 *    - Routes are mounted at appropriate paths for clean URL structure
 *    - Error handling is integrated throughout the routing system
 * 
 * 4. **Production Readiness**: The configuration includes production-ready
 *    features while maintaining educational value:
 *    - Comprehensive error handling and logging
 *    - Security best practices with Express.js 5.1.0 features
 *    - Proper HTTP protocol compliance
 *    - Extensible architecture for future enhancements
 * 
 * 5. **Express.js 5.1.0 Features**: The configuration utilizes enhanced
 *    features from Express.js 5.1.0:
 *    - Improved security with path-to-regexp 8.x
 *    - Automatic Promise rejection handling
 *    - Enhanced error handling and propagation
 *    - Better performance and reliability characteristics
 * 
 * This configuration serves as a comprehensive example of Express.js best
 * practices and provides a solid foundation for building scalable, maintainable
 * web applications with Node.js.
 */