/**
 * Route Index Module - Central Router Aggregator
 * 
 * This module serves as the central aggregator for all route modules in the backend
 * Express application, following Express.js best practices for modular route organization.
 * It acts as the main entry point for all application routes, mounting feature-specific
 * routers onto their respective paths to enable maintainability, scalability, and
 * educational clarity.
 * 
 * The implementation leverages Express.js 5.1.0's enhanced routing capabilities with
 * improved security through path-to-regexp 8.x upgrade, providing ReDoS attack
 * mitigation and better route matching performance. This design pattern supports
 * easy expansion of the API surface by importing and mounting additional routers
 * as needed.
 * 
 * Key Features:
 * - Central route aggregation and registration
 * - Modular router organization for maintainability
 * - Educational demonstration of Express.js routing patterns
 * - Extensible architecture for future endpoint additions
 * - Production-ready error handling integration
 * - HTTP protocol compliance and best practices
 * 
 * @fileoverview Central router aggregator for Express.js application routes
 * @author Backend Development Team
 * @version 1.0.0
 * @since 2024
 * @requires express ^5.1.0
 * @requires ./hello.js
 */

// External Dependencies
const express = require('express'); // ^5.1.0 - Core web framework for Node.js with enhanced security

// Internal Dependencies - Feature-specific routers
const helloRouter = require('./hello.js'); // Hello World endpoint router implementation

/**
 * Main Express Router Instance
 * 
 * Creates the central router instance that will aggregate all feature-specific
 * routers and provide a single entry point for route registration in the main
 * Express application. This router follows the Express.js best practice of
 * modular route organization for improved maintainability and scalability.
 * 
 * The router utilizes Express.js 5.1.0's enhanced routing capabilities including:
 * - Improved route matching with path-to-regexp 8.x
 * - Enhanced security with ReDoS attack mitigation
 * - Better performance and reliability
 * - Automatic Promise-based error handling
 * 
 * @constant {express.Router} router
 * @since 1.0.0
 */
const router = express.Router();

/**
 * Route Registration Function
 * 
 * Initializes and configures the main Express Router by mounting all feature-specific
 * routers onto their respective paths. This function implements the central route
 * aggregation pattern, providing a single source of truth for all application routes.
 * 
 * The function follows Express.js best practices for modular route organization:
 * - Each feature is implemented in its own router module
 * - Routes are mounted at appropriate paths for clean URL structure
 * - Error handling is integrated through Express.js middleware chain
 * - Educational clarity is maintained through comprehensive documentation
 * 
 * Route Architecture:
 * - Main router serves as the central aggregator
 * - Feature routers define specific endpoint functionality
 * - Error handling propagates through Express.js middleware
 * - HTTP protocol compliance is maintained throughout
 * 
 * Educational Value:
 * This implementation demonstrates fundamental Express.js routing concepts
 * including router composition, middleware integration, and modular design
 * patterns that are essential for building scalable Node.js applications.
 * 
 * @function registerRoutes
 * @returns {express.Router} Fully configured router instance with all application routes registered
 * @throws {Error} Any initialization errors are propagated to Express error handling middleware
 * 
 * @example
 * // Usage in main Express application
 * const mainRouter = require('./routes/index');
 * app.use('/', mainRouter);
 * 
 * @since 1.0.0
 */
function registerRoutes() {
    try {
        // Mount the hello router to make the /hello endpoint accessible
        // 
        // Technical Note: The hello.js router defines its route as GET /hello,
        // so mounting it at the root path (/) creates the final route /hello.
        // This approach aligns with the requirement that the endpoint should be
        // accessible at /hello and follows the integration pattern suggested
        // in the hello.js module documentation.
        // 
        // Route Resolution:
        // - Hello router route definition: GET /hello
        // - Mount path: /
        // - Final accessible route: GET /hello
        // 
        // This mounting strategy ensures proper HTTP protocol compliance and
        // maintains the expected URL structure for the tutorial application.
        router.use('/', helloRouter);
        
        // Future Route Registrations:
        // Additional feature routers can be mounted here following the same pattern:
        // router.use('/api', apiRouter);
        // router.use('/auth', authRouter);
        // router.use('/users', usersRouter);
        
        // Return the fully configured router instance
        return router;
        
    } catch (error) {
        // Propagate any initialization errors to Express error handling middleware
        // This ensures centralized error logging and consistent error responses
        // throughout the application lifecycle
        throw new Error(`Route registration failed: ${error.message}`);
    }
}

/**
 * Router Initialization and Configuration
 * 
 * Execute the route registration function to configure all application routes.
 * This immediate invocation ensures that all routes are properly registered
 * and ready for use when the module is imported by the main application.
 * 
 * The initialization process:
 * 1. Calls registerRoutes() to mount all feature routers
 * 2. Configures error handling integration
 * 3. Prepares the router for export and integration
 * 4. Ensures all routes are accessible via the main Express app
 * 
 * Error Handling:
 * Any errors during initialization are caught and re-thrown with enhanced
 * context to support debugging and troubleshooting during development.
 */
try {
    // Initialize and configure all application routes
    registerRoutes();
    
    // Log successful route registration for development visibility
    // This provides immediate feedback about the application's routing setup
    console.log('✓ Route registration completed successfully');
    console.log('✓ Hello World endpoint available at GET /hello');
    console.log('✓ Router ready for Express application integration');
    
} catch (error) {
    // Handle any initialization errors with comprehensive error information
    console.error('✗ Route registration failed:', error.message);
    console.error('✗ Please check router configuration and imported modules');
    
    // Re-throw the error to prevent the application from starting with
    // improperly configured routes
    throw error;
}

/**
 * Module Exports
 * 
 * Exports the fully configured Express router instance containing all
 * application routes. This router is designed to be integrated into the
 * main Express application using app.use() to provide complete routing
 * functionality.
 * 
 * The exported router includes:
 * - All registered feature-specific routes
 * - Integrated error handling middleware support
 * - HTTP protocol compliance and security features
 * - Educational code clarity and documentation
 * - Production-ready performance and reliability
 * 
 * Integration Pattern:
 * The router follows Express.js best practices for modular route organization,
 * enabling clean separation of concerns and maintainable code architecture.
 * 
 * Usage Example:
 * ```javascript
 * const express = require('express');
 * const mainRouter = require('./routes/index');
 * const app = express();
 * 
 * // Mount the main router at the root path
 * app.use('/', mainRouter);
 * 
 * // Start the server
 * app.listen(3000, () => {
 *     console.log('Server running on port 3000');
 * });
 * ```
 * 
 * Route Architecture:
 * - GET /hello -> Hello World endpoint (via helloRouter)
 * - Future routes can be easily added through additional router mounting
 * - All routes inherit Express.js 5.1.0 security and performance enhancements
 * - Error handling is centralized through Express middleware chain
 * 
 * @exports {express.Router} router - Configured Express router with all application routes
 * @since 1.0.0
 */
module.exports = router;