/**
 * Centralized Logger Utility Module
 * 
 * This module provides standardized logging functions for different log levels
 * (info, warn, error, http) and supports both development and production environments.
 * Ensures all logs are timestamped, consistently formatted, and can be extended for
 * colorization or integration with external log management systems.
 * 
 * Used by server lifecycle, middleware, and request/response logging to ensure
 * operational transparency and educational clarity throughout the Express.js 5.1.0
 * application running on Node.js 22.x LTS.
 * 
 * @fileoverview Centralized logging utility for backend operations
 * @author Backend Development Team
 * @version 1.0.0
 * @since 2024
 */

// Import required utilities
const { getReasonPhrase } = require('./httpStatus.js');

/**
 * Log levels and their descriptions for the application
 * 
 * This object defines the available log levels and their intended use cases
 * to provide clarity on when each log level should be used throughout the application.
 * 
 * @constant {Object} LOG_LEVELS
 * @readonly
 */
const LOG_LEVELS = {
    info: 'Informational messages (startup, shutdown, normal operations)',
    warn: 'Warnings (non-critical issues, potential problems)',
    error: 'Errors and exceptions (critical failures, stack traces)',
    http: 'HTTP request/response logs (method, path, status, response time)'
};

/**
 * Development environment detection
 * 
 * This boolean flag determines if the application is running in development mode
 * to potentially enable additional logging features, colorization, or verbose output.
 * 
 * @constant {boolean} IS_DEVELOPMENT
 * @readonly
 */
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

/**
 * Generates an ISO 8601 timestamp string for log entries
 * 
 * This function creates a standardized timestamp format that ensures consistent
 * log entry formatting across all logging functions. The ISO 8601 format provides
 * precision and international compatibility for log analysis and debugging.
 * 
 * @returns {string} Current timestamp in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
 * 
 * @example
 * // Returns something like: '2024-01-15T14:30:45.123Z'
 * const timestamp = formatTimestamp();
 * 
 * @since 1.0.0
 */
function formatTimestamp() {
    // Get the current date and time
    const now = new Date();
    
    // Format as ISO 8601 string
    const isoString = now.toISOString();
    
    // Return the formatted timestamp
    return isoString;
}

/**
 * Logs informational messages with timestamp and standardized format
 * 
 * This function handles general informational logging for normal application
 * operations, startup events, shutdown procedures, and other routine activities.
 * Informational logs help track application flow and provide operational visibility.
 * 
 * @param {string} message - The informational message to log
 * @param {Object} [meta] - Optional metadata object to include with the log entry
 * @returns {void} Outputs the log to stdout via console.log
 * 
 * @example
 * // Basic info logging
 * info('Server starting up');
 * 
 * @example
 * // Info logging with metadata
 * info('Database connection established', { host: 'localhost', port: 5432 });
 * 
 * @since 1.0.0
 */
function info(message, meta) {
    // Generate timestamp using formatTimestamp()
    const timestamp = formatTimestamp();
    
    // Format the log message as '[timestamp] [INFO] message'
    let logMessage = `[${timestamp}] [INFO] ${message}`;
    
    // If meta is provided, append JSON.stringify(meta) to the log
    if (meta !== undefined) {
        logMessage += ` ${JSON.stringify(meta)}`;
    }
    
    // Output to console.log
    console.log(logMessage);
}

/**
 * Logs warning messages with timestamp and standardized format
 * 
 * This function handles warning-level logging for non-critical issues,
 * potential problems, deprecated functionality usage, and situations that
 * may require attention but don't prevent normal operation.
 * 
 * @param {string} message - The warning message to log
 * @param {Object} [meta] - Optional metadata object to include with the log entry
 * @returns {void} Outputs the log to stdout via console.warn
 * 
 * @example
 * // Basic warning logging
 * warn('Configuration file not found, using defaults');
 * 
 * @example
 * // Warning with metadata
 * warn('High memory usage detected', { usage: '85%', threshold: '80%' });
 * 
 * @since 1.0.0
 */
function warn(message, meta) {
    // Generate timestamp using formatTimestamp()
    const timestamp = formatTimestamp();
    
    // Format the log message as '[timestamp] [WARN] message'
    let logMessage = `[${timestamp}] [WARN] ${message}`;
    
    // If meta is provided, append JSON.stringify(meta) to the log
    if (meta !== undefined) {
        logMessage += ` ${JSON.stringify(meta)}`;
    }
    
    // Output to console.warn
    console.warn(logMessage);
}

/**
 * Logs error messages and stack traces with timestamp and standardized format
 * 
 * This function handles error-level logging for exceptions, critical failures,
 * and situations that prevent normal operation. It can handle both Error objects
 * and string messages, automatically extracting stack traces when available.
 * 
 * @param {string|Error} errOrMessage - Error object or error message string
 * @param {Object} [meta] - Optional metadata object to include with the log entry
 * @returns {void} Outputs the log to stderr via console.error
 * 
 * @example
 * // Error logging with string message
 * error('Database connection failed');
 * 
 * @example
 * // Error logging with Error object
 * try {
 *   // some operation
 * } catch (err) {
 *   error(err, { operation: 'user_login' });
 * }
 * 
 * @since 1.0.0
 */
function error(errOrMessage, meta) {
    // Generate timestamp using formatTimestamp()
    const timestamp = formatTimestamp();
    
    let message;
    let stack;
    
    // If errOrMessage is an Error object, extract message and stack
    if (errOrMessage instanceof Error) {
        message = errOrMessage.message;
        stack = errOrMessage.stack;
    } else {
        // Otherwise, treat as string message
        message = String(errOrMessage);
        stack = null;
    }
    
    // Format the log message as '[timestamp] [ERROR] message'
    let logMessage = `[${timestamp}] [ERROR] ${message}`;
    
    // If stack is present, append it to the log
    if (stack) {
        logMessage += `\n${stack}`;
    }
    
    // If meta is provided, append JSON.stringify(meta) to the log
    if (meta !== undefined) {
        logMessage += ` ${JSON.stringify(meta)}`;
    }
    
    // Output to console.error
    console.error(logMessage);
}

/**
 * Logs HTTP request/response events in a standardized format
 * 
 * This function provides specialized logging for HTTP transactions, including
 * method, path, status code, reason phrase, response time, and optional error
 * messages. It supports both successful requests and error scenarios with
 * appropriate output routing.
 * 
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param {string} path - Request path or URL
 * @param {number} statusCode - HTTP status code (200, 404, 500, etc.)
 * @param {number} responseTimeMs - Response time in milliseconds
 * @param {string} [errorMessage] - Optional error message for failed requests
 * @returns {void} Outputs the log to stdout (console.log) or stderr (console.error) based on status code
 * 
 * @example
 * // Successful HTTP request logging
 * http('GET', '/hello', 200, 45);
 * 
 * @example
 * // HTTP request with error
 * http('POST', '/users', 400, 23, 'Invalid request body');
 * 
 * @example
 * // HTTP request with server error
 * http('GET', '/api/data', 500, 156, 'Database connection timeout');
 * 
 * @since 1.0.0
 */
function http(method, path, statusCode, responseTimeMs, errorMessage) {
    // Generate timestamp using formatTimestamp()
    const timestamp = formatTimestamp();
    
    // Use getReasonPhrase(statusCode) to resolve the status reason phrase
    const reasonPhrase = getReasonPhrase(statusCode);
    
    // Format the log message as '[timestamp] [HTTP] METHOD PATH -> STATUS REASON [responseTime ms] [errorMessage?]'
    let logMessage = `[${timestamp}] [HTTP] ${method} ${path} -> ${statusCode} ${reasonPhrase} [${responseTimeMs}ms]`;
    
    // If errorMessage is present, append it to the log
    if (errorMessage) {
        logMessage += ` ${errorMessage}`;
    }
    
    // Output to console.log (or console.error if statusCode >= 400)
    if (statusCode >= 400) {
        console.error(logMessage);
    } else {
        console.log(logMessage);
    }
}

/**
 * Export logging functions for use throughout the application
 * 
 * These exports provide the public API for the logger utility module:
 * - info: Logs informational messages for server lifecycle and general operations
 * - warn: Logs warning messages for non-critical issues or potential problems
 * - error: Logs error messages and stack traces for exceptions and critical failures
 * - http: Logs HTTP request/response events in a standardized, educational format
 * 
 * Named exports are used to provide clear, explicit imports for consuming modules
 * and to support tree-shaking in bundled environments.
 */
module.exports = {
    info,
    warn,
    error,
    http
};