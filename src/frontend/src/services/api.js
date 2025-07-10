/**
 * Frontend API Service Module
 * 
 * This module provides a centralized API service layer for the Node.js tutorial application frontend.
 * It handles HTTP communication with the backend server, specifically for fetching the 'Hello world' 
 * message from the /hello endpoint. The module implements robust error handling, request/response 
 * processing, and provides a clean interface for React components to interact with backend APIs.
 * 
 * Key Features:
 * - Centralized API communication logic
 * - Consistent error handling and formatting
 * - Environment-based configuration support
 * - Promise-based async/await compatible interface
 * - Educational clarity with comprehensive documentation
 * - Extensible architecture for future API endpoints
 * 
 * Design Principles:
 * - Separation of concerns (API logic separated from UI components)
 * - Single responsibility (each function handles one specific API operation)
 * - Error handling consistency (all errors formatted using centralized helper)
 * - Configuration flexibility (API base URL configurable via environment variables)
 * - Future extensibility (easy to add new API functions following the same pattern)
 * 
 * Dependencies:
 * - axios: Promise-based HTTP client for making API requests
 * - formatError: Internal utility for consistent error message formatting
 * 
 * Usage Example:
 * ```javascript
 * import { getHello } from '../services/api';
 * 
 * const fetchHelloMessage = async () => {
 *   try {
 *     const message = await getHello();
 *     console.log('Received message:', message);
 *   } catch (error) {
 *     console.error('API Error:', error);
 *   }
 * };
 * ```
 */

// External Dependencies
import axios from 'axios'; // axios@^1.6.0 - Promise-based HTTP client for the browser and Node.js

// Internal Dependencies
import { formatError } from '../utils/helpers';

// Global Configuration
// API_BASE_URL: Base URL for backend API endpoints, configurable via environment variables
// Defaults to empty string for development environments where relative URLs are used
// In production, this would be set to the full backend server URL (e.g., 'https://api.example.com')
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

/**
 * Fetches the 'Hello world' message from the backend /hello endpoint.
 * 
 * This function demonstrates basic API integration patterns by making an HTTP GET request
 * to the backend server's /hello endpoint. It handles the complete request-response cycle,
 * including URL construction, HTTP request execution, response processing, and error handling.
 * 
 * The function implements the following workflow:
 * 1. Constructs the full API endpoint URL using the configured base URL
 * 2. Sends an HTTP GET request using axios
 * 3. Extracts and returns the response data on success
 * 4. Catches and formats any errors that occur during the request
 * 5. Throws user-friendly error messages for the calling component to handle
 * 
 * Error Handling:
 * - Network errors (no internet connection, server unreachable)
 * - HTTP errors (4xx, 5xx status codes)
 * - Request timeout errors
 * - Invalid response format errors
 * - Any other unexpected errors during the request lifecycle
 * 
 * Performance Considerations:
 * - Uses axios for efficient HTTP request handling
 * - Implements proper error propagation for caller handling
 * - Minimizes memory usage by directly returning response data
 * - Supports request cancellation through axios (future enhancement)
 * 
 * Security Considerations:
 * - Uses HTTPS-compatible axios configuration
 * - Implements secure error handling (no sensitive data in error messages)
 * - Supports CORS configuration through axios defaults
 * - Environment-based URL configuration prevents hardcoded endpoints
 * 
 * @async
 * @function getHello
 * @returns {Promise<string>} A promise that resolves to the 'Hello world' message string 
 *                           from the backend, or rejects with a formatted error message string
 * @throws {string} User-friendly error message if the request fails for any reason
 * 
 * @example
 * // Basic usage in a React component
 * const handleGetHello = async () => {
 *   try {
 *     const message = await getHello();
 *     setHelloMessage(message);
 *     setError(null);
 *   } catch (error) {
 *     setError(error);
 *     setHelloMessage('');
 *   }
 * };
 * 
 * @example
 * // Usage with loading state management
 * const fetchHelloWithLoading = async () => {
 *   setLoading(true);
 *   try {
 *     const message = await getHello();
 *     setHelloMessage(message);
 *     setError(null);
 *   } catch (error) {
 *     setError(error);
 *     setHelloMessage('');
 *   } finally {
 *     setLoading(false);
 *   }
 * };
 */
export async function getHello() {
  try {
    // Step 1: Construct the full URL for the /hello endpoint
    // Combines the configurable API base URL with the specific endpoint path
    // This approach allows for flexible deployment configurations:
    // - Development: API_BASE_URL might be empty, using relative URLs
    // - Production: API_BASE_URL would be the full backend server URL
    const endpoint = `${API_BASE_URL}/hello`;
    
    // Step 2: Send HTTP GET request to the /hello endpoint using axios
    // axios.get() returns a Promise that resolves with the response object
    // The response object contains: data, status, statusText, headers, config, request
    // We're primarily interested in the response.data which contains the actual message
    const response = await axios.get(endpoint);
    
    // Step 3: Extract and return the response data
    // The backend /hello endpoint returns a plain text "Hello world" message
    // response.data contains the actual message content from the server
    // We return this directly as a string for the calling component to use
    return response.data;
    
  } catch (error) {
    // Step 4: Handle any errors that occur during the request process
    // This catch block handles various error scenarios:
    // - Network errors (no internet, server unreachable)
    // - HTTP errors (404, 500, etc.)
    // - Request timeout errors
    // - Invalid response format errors
    // - Any other axios-related errors
    
    // Step 5: Format the error using the centralized formatError helper
    // The formatError function handles different error types and returns
    // user-friendly error messages suitable for display in the UI
    // This ensures consistent error presentation across the application
    const formattedError = formatError(error);
    
    // Step 6: Throw the formatted error string
    // We throw the formatted error as a string so that the calling component
    // can catch it and display it to the user or handle it appropriately
    // This maintains a consistent error handling pattern throughout the application
    throw formattedError;
  }
}

/**
 * API Service Module Exports
 * 
 * This module exports the following functions for use by React components:
 * - getHello: Fetches the 'Hello world' message from the backend
 * 
 * Future Extensibility:
 * Additional API functions can be added following the same pattern:
 * 
 * @example
 * // Future API function example
 * export async function getUser(userId) {
 *   try {
 *     const endpoint = `${API_BASE_URL}/users/${userId}`;
 *     const response = await axios.get(endpoint);
 *     return response.data;
 *   } catch (error) {
 *     const formattedError = formatError(error);
 *     throw formattedError;
 *   }
 * }
 * 
 * @example
 * // Future POST request example
 * export async function createUser(userData) {
 *   try {
 *     const endpoint = `${API_BASE_URL}/users`;
 *     const response = await axios.post(endpoint, userData);
 *     return response.data;
 *   } catch (error) {
 *     const formattedError = formatError(error);
 *     throw formattedError;
 *   }
 * }
 */

// Export statement for getHello function
// This allows React components to import and use the getHello function
// The named export pattern is used for consistency and future extensibility
export { getHello };