/**
 * Node.js/Express.js HTTP Server Entry Point
 * 
 * This module serves as the main entry point for the backend HTTP server application,
 * providing comprehensive server lifecycle management including startup, shutdown, and
 * error handling functionality. The implementation demonstrates production-ready
 * patterns for Node.js/Express.js server initialization while maintaining educational
 * clarity and operational transparency.
 * 
 * Key Features:
 * - Robust HTTP server initialization and startup procedures
 * - Graceful shutdown handling with proper cleanup and logging
 * - Comprehensive error handling for uncaught exceptions and unhandled rejections
 * - Process signal management for SIGINT and SIGTERM handling
 * - Educational logging throughout the server lifecycle for learning purposes
 * - Modular design supporting testability and extensibility
 * 
 * The server implementation follows Express.js 5.1.0 best practices and Node.js 22.x LTS
 * patterns, providing a solid foundation for understanding server lifecycle management,
 * error resilience, and operational monitoring in production environments.
 * 
 * Educational Value:
 * This implementation serves as a comprehensive example of professional server
 * initialization patterns, demonstrating how to properly structure a Node.js HTTP
 * server entry point with robust error handling, lifecycle management, and
 * operational visibility for educational and production use.
 * 
 * @fileoverview Main HTTP server entry point with lifecycle management
 * @author Backend Development Team
 * @version 1.0.0
 * @since 2024
 * @requires ./config/express.js
 * @requires ./utils/logger.js
 * @requires process Node.js 22.x LTS
 */

// Internal Dependencies
const app = require('./config/express.js');
const { info, warn, error } = require('./utils/logger.js');

// External Dependencies - Node.js Core Modules
// process - Node.js 22.x LTS global object for environment variables and signal handling

/**
 * Global Variables for Server Lifecycle Management
 * 
 * These variables maintain server state throughout the application lifecycle,
 * enabling proper startup, shutdown, and error handling coordination.
 */

/**
 * Server port configuration
 * 
 * Resolves the HTTP server port from environment variables or defaults to 3000
 * for development. The port configuration supports both local development and
 * production deployment scenarios through environment variable customization.
 * 
 * @constant {number} PORT - HTTP server port number
 * @default 3000
 * @since 1.0.0
 */
const PORT = process.env.PORT || 3000;

/**
 * HTTP server instance reference
 * 
 * Maintains a reference to the active HTTP server instance returned by app.listen()
 * to enable graceful shutdown procedures and server lifecycle management.
 * 
 * @type {http.Server|null} server - HTTP server instance or null if not started
 * @since 1.0.0
 */
let server = null;

/**
 * Shutdown state flag
 * 
 * Boolean flag to prevent multiple shutdown attempts and ensure graceful
 * shutdown procedures are executed only once during the server lifecycle.
 * 
 * @type {boolean} isShuttingDown - Shutdown state tracking flag
 * @default false
 * @since 1.0.0
 */
let isShuttingDown = false;

/**
 * Graceful Server Shutdown Handler
 * 
 * Implements comprehensive server shutdown procedures including connection cleanup,
 * logging, and process termination. This function handles both planned shutdowns
 * (from process signals) and error-induced shutdowns (from uncaught exceptions).
 * 
 * The shutdown process follows these steps:
 * 1. Check for duplicate shutdown attempts and exit early if already shutting down
 * 2. Set shutdown state flag to prevent multiple shutdown executions
 * 3. Log shutdown initiation with the provided reason for operational visibility
 * 4. Close the HTTP server to stop accepting new connections
 * 5. Allow active connections to complete gracefully
 * 6. Log shutdown completion status
 * 7. Exit the process with appropriate exit code
 * 
 * Error Handling:
 * If an error occurs during shutdown, the error is logged with full details
 * and the process exits with code 1 to indicate failure to the operating system.
 * 
 * Educational Value:
 * This implementation demonstrates proper Node.js application shutdown patterns,
 * including state management, error handling, and process lifecycle coordination.
 * 
 * @function shutdown
 * @param {string} reason - Descriptive reason for the shutdown (e.g., 'SIGINT', 'SIGTERM', 'uncaught exception')
 * @returns {void} Performs cleanup operations and exits the process
 * @throws {Error} Logs shutdown errors but always exits the process
 * 
 * @example
 * // Shutdown due to SIGINT signal
 * shutdown('SIGINT signal received');
 * 
 * @example
 * // Shutdown due to uncaught exception
 * shutdown('uncaught exception');
 * 
 * @since 1.0.0
 */
function shutdown(reason) {
    // Step 1: Check if shutdown is already in progress
    // This prevents multiple shutdown attempts from running simultaneously
    // and ensures cleanup procedures are executed only once
    if (isShuttingDown) {
        return;
    }

    // Step 2: Set shutdown state flag
    // Mark the server as shutting down to prevent duplicate shutdown attempts
    // and coordinate shutdown state across different parts of the application
    isShuttingDown = true;

    // Step 3: Log shutdown initiation
    // Provide clear operational visibility about the shutdown process
    // including the reason for shutdown to support debugging and monitoring
    info(`🛑 Server shutdown initiated: ${reason}`);
    info('📋 Beginning graceful shutdown procedures...');

    // Step 4: Close HTTP server gracefully
    // Stop accepting new connections while allowing existing connections
    // to complete their requests before terminating
    if (server) {
        server.close((closeError) => {
            if (closeError) {
                // Log server close error with full details
                error('❌ Error occurred during server shutdown:', closeError);
                error('🔧 Server may have had active connections that failed to close properly');
                
                // Exit with error code to indicate shutdown failure
                info('🚪 Exiting process with error code 1 due to shutdown failure');
                process.exit(1);
            } else {
                // Log successful server closure
                info('✅ HTTP server closed successfully');
                info('🔌 All active connections have been terminated gracefully');
                info('🎯 Server shutdown completed successfully');
                
                // Exit with success code to indicate clean shutdown
                info('🚪 Exiting process with code 0 - shutdown complete');
                process.exit(0);
            }
        });
    } else {
        // Handle case where server was not initialized
        warn('⚠️ Server instance not found during shutdown');
        info('🚪 Exiting process with code 0 - no server to shutdown');
        process.exit(0);
    }
}

/**
 * HTTP Server Startup and Lifecycle Management Function
 * 
 * Initializes and starts the Express.js HTTP server with comprehensive lifecycle
 * management, error handling, and operational logging. This function serves as
 * the main entry point for server operations and demonstrates production-ready
 * patterns for Node.js/Express.js server initialization.
 * 
 * The startup process includes:
 * 1. HTTP server initialization using the configured Express application
 * 2. Startup confirmation logging with port and environment information
 * 3. Process signal handler registration for graceful shutdown
 * 4. Uncaught exception and unhandled rejection handlers for error resilience
 * 5. Comprehensive logging throughout the startup process
 * 
 * Error Handling:
 * The function implements robust error handling for all phases of server startup,
 * including server binding failures, signal handler registration errors, and
 * unexpected exceptions during initialization.
 * 
 * Educational Value:
 * This implementation demonstrates fundamental concepts of Node.js server
 * lifecycle management, process signal handling, error resilience, and
 * operational monitoring suitable for both learning and production environments.
 * 
 * @function startServer
 * @returns {void} Initializes the server and manages its lifecycle
 * @throws {Error} Logs startup errors and exits the process if server cannot be started
 * 
 * @example
 * // Start the server with default configuration
 * startServer();
 * 
 * @example
 * // Start the server with environment-specific port
 * process.env.PORT = '8080';
 * startServer();
 * 
 * @since 1.0.0
 */
function startServer() {
    try {
        // Step 1: Log server startup initiation
        // Provide clear operational visibility about the server startup process
        // including configuration details and environment information
        info('🚀 Starting HTTP server...');
        info(`📍 Server port: ${PORT}`);
        info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
        info(`⚙️ Node.js version: ${process.version}`);
        info(`📦 Process ID: ${process.pid}`);

        // Step 2: Start HTTP server using Express application
        // Call app.listen() to create and start the HTTP server instance
        // The callback function executes once the server is successfully bound to the port
        server = app.listen(PORT, () => {
            // Server startup successful - log confirmation details
            info('✅ HTTP server started successfully');
            info(`🌐 Server listening on port ${PORT}`);
            info(`📡 Server URL: http://localhost:${PORT}`);
            info(`🎯 Ready to accept HTTP requests`);
            info('📋 Available endpoints:');
            info('   └── GET /hello - Returns "Hello world" response');
            info('🔧 Server configuration completed');
        });

        // Step 3: Handle server startup errors
        // Register error event handler for server binding failures
        // and other startup-related errors
        server.on('error', (serverError) => {
            error('❌ HTTP server startup failed:', serverError);
            
            // Provide specific error guidance for common issues
            if (serverError.code === 'EADDRINUSE') {
                error(`🔒 Port ${PORT} is already in use`);
                error('💡 Try using a different port or stop the conflicting process');
            } else if (serverError.code === 'EACCES') {
                error(`🚫 Permission denied for port ${PORT}`);
                error('💡 Try using a port number greater than 1024 or run with elevated privileges');
            } else {
                error('🔧 Check server configuration and try again');
            }
            
            // Exit the process since the server cannot start
            error('🚪 Exiting process due to server startup failure');
            process.exit(1);
        });

        // Step 4: Register process signal handlers for graceful shutdown
        // Set up handlers for SIGINT (Ctrl+C) and SIGTERM (process termination)
        // to ensure the server shuts down gracefully when requested
        
        // SIGINT handler - typically triggered by Ctrl+C in terminal
        process.on('SIGINT', () => {
            info('📨 SIGINT signal received (Ctrl+C pressed)');
            shutdown('SIGINT signal received');
        });

        // SIGTERM handler - typically triggered by process managers or system shutdown
        process.on('SIGTERM', () => {
            info('📨 SIGTERM signal received (process termination requested)');
            shutdown('SIGTERM signal received');
        });

        // Step 5: Register global error handlers
        // Set up handlers for uncaught exceptions and unhandled promise rejections
        // to ensure errors are logged and the process exits gracefully
        
        // Uncaught exception handler
        process.on('uncaughtException', (uncaughtError) => {
            error('💥 Uncaught exception detected:', uncaughtError);
            error('🚨 This indicates a serious application error');
            error('💡 Review the error details and fix the underlying issue');
            
            // Shutdown the server due to fatal error
            shutdown('uncaught exception');
        });

        // Unhandled promise rejection handler
        process.on('unhandledRejection', (rejectionReason, promise) => {
            error('🚫 Unhandled promise rejection detected:', rejectionReason);
            error('📍 Promise:', promise);
            error('⚠️ This indicates improper async error handling');
            error('💡 Add proper .catch() handlers to all promises');
            
            // Shutdown the server due to fatal error
            shutdown('unhandled promise rejection');
        });

        // Step 6: Log startup completion
        // Confirm that all startup procedures have been completed successfully
        // and the server is ready for operation
        info('🎉 Server startup sequence completed successfully');
        info('📖 Server is ready for HTTP requests and lifecycle management');
        info('🛡️ Error handling and shutdown procedures are active');
        info('📊 Process monitoring and logging are operational');

    } catch (startupError) {
        // Handle any errors that occur during the startup process
        error('🚨 Critical error during server startup:', startupError);
        error('🔧 Unable to initialize HTTP server');
        error('💡 Check application configuration and dependencies');
        
        // Exit the process since startup failed
        error('🚪 Exiting process due to startup failure');
        process.exit(1);
    }
}

/**
 * Module Exports
 * 
 * Exports the server startup function for use by the main application entry point
 * or testing frameworks. The modular design enables flexible server initialization
 * and supports various deployment scenarios.
 * 
 * Export Pattern:
 * Named exports are used to provide clear, explicit access to server functionality
 * while supporting tree-shaking in bundled environments and enabling comprehensive
 * testing of server lifecycle management.
 * 
 * Usage Patterns:
 * - Direct execution: Import and call startServer() to initialize the server
 * - Testing: Import startServer for unit testing and integration testing
 * - Deployment: Use in deployment scripts for production server management
 * 
 * Integration Examples:
 * ```javascript
 * // Direct server startup
 * const { startServer } = require('./backend/server.js');
 * startServer();
 * 
 * // Testing integration
 * const { startServer } = require('./backend/server.js');
 * // Test server lifecycle management
 * ```
 * 
 * @exports {function} startServer - Main server startup and lifecycle management function
 * @since 1.0.0
 */
module.exports = {
    startServer
};

/**
 * Educational Notes on Node.js Server Lifecycle Management
 * 
 * This server implementation demonstrates several critical concepts for
 * building production-ready Node.js applications:
 * 
 * 1. **Process Signal Handling**: The server responds to SIGINT and SIGTERM
 *    signals for graceful shutdown, allowing the application to clean up
 *    resources and close connections properly before terminating.
 * 
 * 2. **Error Resilience**: Uncaught exceptions and unhandled promise rejections
 *    are captured and logged, preventing the process from crashing silently
 *    and providing clear error information for debugging.
 * 
 * 3. **Operational Logging**: Comprehensive logging throughout the server
 *    lifecycle provides operational visibility, making it easier to monitor
 *    server status, debug issues, and understand application behavior.
 * 
 * 4. **Graceful Shutdown**: The shutdown procedure ensures that active
 *    connections are allowed to complete before the server terminates,
 *    preventing data loss and providing a better user experience.
 * 
 * 5. **Modular Design**: The server functionality is exported as a function,
 *    making it easy to integrate with testing frameworks, deployment scripts,
 *    and other application components.
 * 
 * 6. **Production Readiness**: The implementation includes error handling,
 *    logging, and lifecycle management patterns suitable for production
 *    deployment while maintaining educational clarity.
 * 
 * 7. **Express.js Integration**: The server properly integrates with the
 *    configured Express.js application, demonstrating how to structure
 *    a web application with clear separation between server management
 *    and application logic.
 * 
 * This implementation serves as a comprehensive example of professional
 * Node.js server development practices and provides a solid foundation
 * for building scalable, maintainable web applications.
 */