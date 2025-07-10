/**
 * HTTP Status Code Utility Module
 * 
 * This module provides canonical HTTP status codes and their reason phrases
 * for use throughout the backend application. It ensures protocol compliance,
 * educational clarity, and maintainability by serving as the single source
 * of truth for HTTP status code mappings.
 * 
 * Used by logging, error handling, and route modules to provide consistent
 * status code handling and messaging throughout the Express.js 5.1.0 application
 * running on Node.js 22.x LTS.
 * 
 * @fileoverview HTTP Status Code definitions and utility functions
 * @author Backend Development Team
 * @version 1.0.0
 * @since 2024
 */

/**
 * Canonical HTTP Status Codes and Reason Phrases
 * 
 * This object provides a comprehensive mapping of HTTP status codes to their
 * standardized reason phrases as defined in RFC 7231, RFC 6585, and other
 * HTTP specifications. The mapping includes informational (1xx), success (2xx),
 * redirection (3xx), client error (4xx), and server error (5xx) status codes.
 * 
 * This serves as the authoritative source for HTTP status code definitions
 * throughout the application, ensuring consistency and protocol compliance.
 * 
 * @constant {Object} HTTP_STATUS_CODES
 * @readonly
 */
const HTTP_STATUS_CODES = {
    // 1xx Informational Responses
    // These status codes indicate that the request was received and understood
    '100': 'Continue',
    '101': 'Switching Protocols',
    '102': 'Processing',
    '103': 'Early Hints',
    
    // 2xx Success
    // These status codes indicate that the client's request was successfully received,
    // understood, and accepted
    '200': 'OK',
    '201': 'Created',
    '202': 'Accepted',
    '203': 'Non-Authoritative Information',
    '204': 'No Content',
    '205': 'Reset Content',
    '206': 'Partial Content',
    '207': 'Multi-Status',
    '208': 'Already Reported',
    '226': 'IM Used',
    
    // 3xx Redirection
    // These status codes indicate that further action needs to be taken
    // by the user agent to fulfill the request
    '300': 'Multiple Choices',
    '301': 'Moved Permanently',
    '302': 'Found',
    '303': 'See Other',
    '304': 'Not Modified',
    '305': 'Use Proxy',
    '307': 'Temporary Redirect',
    '308': 'Permanent Redirect',
    
    // 4xx Client Error
    // These status codes indicate that the client seems to have made an error
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '402': 'Payment Required',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '406': 'Not Acceptable',
    '407': 'Proxy Authentication Required',
    '408': 'Request Timeout',
    '409': 'Conflict',
    '410': 'Gone',
    '411': 'Length Required',
    '412': 'Precondition Failed',
    '413': 'Payload Too Large',
    '414': 'URI Too Long',
    '415': 'Unsupported Media Type',
    '416': 'Range Not Satisfiable',
    '417': 'Expectation Failed',
    '418': "I'm a teapot",
    '421': 'Misdirected Request',
    '422': 'Unprocessable Entity',
    '423': 'Locked',
    '424': 'Failed Dependency',
    '425': 'Too Early',
    '426': 'Upgrade Required',
    '428': 'Precondition Required',
    '429': 'Too Many Requests',
    '431': 'Request Header Fields Too Large',
    '451': 'Unavailable For Legal Reasons',
    
    // 5xx Server Error
    // These status codes indicate that the server failed to fulfill
    // a valid request
    '500': 'Internal Server Error',
    '501': 'Not Implemented',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
    '505': 'HTTP Version Not Supported',
    '506': 'Variant Also Negotiates',
    '507': 'Insufficient Storage',
    '508': 'Loop Detected',
    '510': 'Not Extended',
    '511': 'Network Authentication Required'
};

/**
 * Retrieves the canonical reason phrase for a given HTTP status code
 * 
 * This function provides a robust way to resolve HTTP status codes to their
 * human-readable reason phrases. It handles both numeric and string inputs
 * and provides graceful fallback behavior for unknown status codes.
 * 
 * The function is designed to support defensive programming practices by
 * never throwing exceptions and always returning a meaningful string value.
 * This makes it safe to use in logging, error handling, and response
 * formatting throughout the application.
 * 
 * @param {number|string} statusCode - The HTTP status code to resolve
 * @returns {string} The reason phrase corresponding to the status code,
 *                   or 'Unknown Status' if the code is not recognized
 * 
 * @example
 * // Returns 'OK'
 * getReasonPhrase(200);
 * 
 * @example
 * // Returns 'Not Found'
 * getReasonPhrase('404');
 * 
 * @example
 * // Returns 'Unknown Status'
 * getReasonPhrase(999);
 * 
 * @example
 * // Returns 'Unknown Status'
 * getReasonPhrase('invalid');
 * 
 * @since 1.0.0
 */
function getReasonPhrase(statusCode) {
    // Convert the statusCode to a string to ensure consistent lookup
    // This handles both numeric and string inputs gracefully
    const statusCodeString = String(statusCode);
    
    // Look up the statusCode in the HTTP_STATUS_CODES mapping
    // Use hasOwnProperty to ensure we're checking own properties only
    if (HTTP_STATUS_CODES.hasOwnProperty(statusCodeString)) {
        return HTTP_STATUS_CODES[statusCodeString];
    }
    
    // Return fallback value for unknown status codes
    // This ensures the function never returns undefined or null
    return 'Unknown Status';
}

/**
 * Export the HTTP status code mapping and utility function
 * 
 * These exports provide the public API for the HTTP status utility module:
 * - HTTP_STATUS_CODES: Complete mapping of status codes to reason phrases
 * - getReasonPhrase: Utility function for resolving status codes
 * 
 * Named exports are used to provide clear, explicit imports for consuming modules
 * and to support tree-shaking in bundled environments.
 */
module.exports = {
    HTTP_STATUS_CODES,
    getReasonPhrase
};