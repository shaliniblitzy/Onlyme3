/**
 * Utility/helper module for the frontend React application.
 * Provides reusable functions for formatting errors and other common frontend tasks.
 * Centralizes error formatting logic for API service modules and React components,
 * ensuring consistent, user-friendly error messages throughout the UI.
 * 
 * Designed for educational clarity, maintainability, and extensibility as the frontend grows.
 */

/**
 * Formats an error object (such as one thrown by axios or a failed fetch) into a 
 * user-friendly string suitable for display in the frontend UI.
 * 
 * Handles different error shapes (network errors, HTTP errors, plain strings, etc.) 
 * and ensures that the returned message is clear and non-technical for end users.
 * Used by API service modules and React components to present consistent error messages.
 * 
 * @param {any} error - The error object to format (can be axios error, Error instance, string, etc.)
 * @returns {string} A user-friendly error message string suitable for display in the UI
 */
export function formatError(error) {
  // Step 1: Check if the error is a string; if so, return it directly
  if (typeof error === 'string') {
    return error;
  }

  // Step 2: If the error is an Error instance, return error.message
  if (error instanceof Error && error.message) {
    return error.message;
  }

  // Step 3: If the error is an axios error (error.response exists)
  if (error && error.response) {
    // Check if error.response.data and error.response.data.message exist
    if (error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
    
    // Otherwise, return a generic message based on error.response.status or statusText
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          return 'Bad request. Please check your input and try again.';
        case 401:
          return 'Authentication required. Please log in and try again.';
        case 403:
          return 'You do not have permission to perform this action.';
        case 404:
          return 'The requested resource was not found.';
        case 429:
          return 'Too many requests. Please wait a moment and try again.';
        case 500:
          return 'Internal server error. Please try again later.';
        case 502:
          return 'Bad gateway. The server is temporarily unavailable.';
        case 503:
          return 'Service unavailable. Please try again later.';
        default:
          return error.response.statusText || `Request failed with status ${error.response.status}`;
      }
    }
    
    // Fallback to statusText if available
    if (error.response.statusText) {
      return error.response.statusText;
    }
  }

  // Step 4: If the error is a network error (error.request exists but no response)
  if (error && error.request && !error.response) {
    return 'Network error. Please check your connection and try again.';
  }

  // Step 5: If the error is an object with a message property, return error.message
  if (error && typeof error === 'object' && error.message) {
    return error.message;
  }

  // Step 6: As a fallback, return a generic 'An unexpected error occurred.' message
  return 'An unexpected error occurred. Please try again.';
}