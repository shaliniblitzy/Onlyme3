/**
 * Home Page Component
 * 
 * A stateless React functional component that serves as the main content area (landing page) 
 * for the frontend of the Node.js tutorial application. The Home component provides a welcome 
 * message, a brief description of the tutorial's purpose, and demonstrates how the frontend 
 * can interact with the backend /hello endpoint.
 * 
 * Key Features:
 * - Welcome message and tutorial description for educational clarity
 * - Live demonstration of API communication with backend /hello endpoint
 * - Comprehensive state management for loading, success, and error scenarios
 * - User-friendly feedback with clear loading indicators and error messages
 * - Semantic HTML structure for accessibility and maintainability
 * - Educational code organization with extensive comments
 * 
 * Design Principles:
 * - Educational clarity: Every interaction is visible and explained to the user
 * - Robust error handling: All possible API call scenarios are handled gracefully
 * - Responsive feedback: Users receive immediate feedback for all actions
 * - Minimal styling: Focus on functionality over presentation for tutorial purposes
 * - Future extensibility: Architecture supports easy addition of new features
 * 
 * State Management:
 * - helloMessage: Stores the response from the backend /hello endpoint
 * - loading: Indicates when an API request is in progress
 * - error: Stores any error messages from failed API requests
 * 
 * User Experience:
 * - Automatic API call on component mount demonstrates backend integration
 * - Loading state provides visual feedback during API requests
 * - Error state displays user-friendly messages when issues occur
 * - Success state shows the actual backend response message
 * 
 * Educational Value:
 * - Demonstrates React hooks (useState, useEffect) in a practical context
 * - Shows proper async/await error handling patterns
 * - Illustrates separation of concerns (API logic in separate service module)
 * - Provides examples of conditional rendering based on component state
 * - Demonstrates proper component lifecycle management
 */

// External Dependencies
import React, { useState, useEffect } from 'react'; // react@^18.0.0 - Core React library for building user interfaces

// Internal Dependencies
import { getHello } from '../services/api';

/**
 * Home Component
 * 
 * Main landing page component that renders the welcome content and demonstrates
 * API integration with the backend /hello endpoint. Manages local state for
 * API response data, loading indicators, and error messages.
 * 
 * Component Lifecycle:
 * 1. Component mounts and initializes state
 * 2. useEffect hook triggers automatic API call to getHello()
 * 3. Loading state is set to true during API request
 * 4. On success: helloMessage is updated with response, error is cleared
 * 5. On failure: error is updated with formatted message, helloMessage is cleared
 * 6. Loading state is set to false when API call completes
 * 7. Component renders appropriate content based on current state
 * 
 * State Management:
 * - Uses React hooks for modern functional component state management
 * - Implements proper cleanup and error handling patterns
 * - Maintains consistent state transitions for predictable behavior
 * 
 * Error Handling:
 * - Catches and displays all API-related errors
 * - Uses formatError helper for consistent error message formatting
 * - Provides clear feedback to users when issues occur
 * - Maintains application stability even when backend is unavailable
 * 
 * @returns {JSX.Element} A semantic main element containing welcome content and API demonstration
 */
export function Home() {
  // State Management
  // Initialize component state using React hooks for modern state management
  
  // helloMessage: Stores the response message from the backend /hello endpoint
  // Type: string - Contains the actual message returned by the API
  // Default: empty string to indicate no message has been received yet
  const [helloMessage, setHelloMessage] = useState('');
  
  // loading: Indicates whether an API request is currently in progress
  // Type: boolean - true during API call, false when idle
  // Default: false since no request is active on initial render
  const [loading, setLoading] = useState(false);
  
  // error: Stores any error messages from failed API requests
  // Type: string|null - null when no error, string containing error message when error occurs
  // Default: null to indicate no error has occurred yet
  const [error, setError] = useState(null);

  // Effect Hook for API Integration
  // Uses useEffect to trigger API call when component mounts
  // This demonstrates how frontend components can interact with backend APIs
  useEffect(() => {
    /**
     * Async function to fetch hello message from backend
     * 
     * Implements proper async/await error handling pattern for API calls.
     * Manages loading state to provide user feedback during request.
     * Handles both success and error scenarios gracefully.
     * 
     * API Call Workflow:
     * 1. Set loading state to true to indicate request start
     * 2. Call getHello() API function from service module
     * 3. On success: update helloMessage state and clear any previous errors
     * 4. On failure: update error state and clear any previous messages
     * 5. Set loading state to false to indicate request completion
     * 
     * Error Handling:
     * - Catches all errors from the API call
     * - Uses formatted error messages from the getHello function
     * - Maintains application stability by preventing unhandled promise rejections
     * - Provides clear feedback to users about what went wrong
     */
    const fetchHelloMessage = async () => {
      // Step 1: Set loading state to true before making API call
      // This triggers the loading indicator in the UI to provide user feedback
      setLoading(true);
      
      try {
        // Step 2: Call getHello API function and await the response
        // The getHello function returns a Promise that resolves to the backend message
        // or rejects with a formatted error message string
        const message = await getHello();
        
        // Step 3: On success, update state with the received message
        // Set helloMessage to the response from the backend
        setHelloMessage(message);
        
        // Clear any previous error messages since the request succeeded
        setError(null);
        
      } catch (errorMessage) {
        // Step 4: On failure, update state with the error information
        // The getHello function throws formatted error strings that are ready for display
        // Set error state to the formatted error message for user display
        setError(errorMessage);
        
        // Clear any previous success message since the request failed
        setHelloMessage('');
      } finally {
        // Step 5: Set loading state to false after API call completes
        // This happens whether the request succeeded or failed
        // Ensures loading indicator is removed from the UI
        setLoading(false);
      }
    };

    // Execute the API call when component mounts
    // This demonstrates automatic backend integration when the page loads
    fetchHelloMessage();
  }, []); // Empty dependency array means this effect runs only once on mount

  // Render Method
  // Returns JSX that defines the component's UI structure
  // Uses semantic HTML elements for accessibility and maintainability
  return (
    <main className="home-page">
      {/* Welcome Section */}
      <section className="welcome-section">
        <h1>Welcome to the Node.js Tutorial Application</h1>
        <p>
          This is a simple educational application that demonstrates the fundamental 
          concepts of building a Node.js web server using Express.js framework. 
          The application showcases how frontend and backend components can work 
          together to create a complete web application.
        </p>
      </section>

      {/* Tutorial Description Section */}
      <section className="tutorial-description">
        <h2>About This Tutorial</h2>
        <p>
          This tutorial application is designed to teach you the basics of:
        </p>
        <ul>
          <li>Setting up a Node.js HTTP server using Express.js</li>
          <li>Creating RESTful API endpoints</li>
          <li>Building a React frontend that communicates with the backend</li>
          <li>Managing API requests and responses</li>
          <li>Handling errors and loading states in web applications</li>
        </ul>
        <p>
          The application demonstrates these concepts through a simple "Hello World" 
          example that shows how data flows between the frontend and backend.
        </p>
      </section>

      {/* API Demonstration Section */}
      <section className="api-demonstration">
        <h2>Backend API Integration</h2>
        <p>
          Below you can see a live demonstration of the frontend communicating 
          with the backend API. The message is fetched from the server's /hello 
          endpoint when this page loads.
        </p>
        
        {/* Backend Response Display */}
        <div className="api-response">
          <h3>Backend Response:</h3>
          
          {/* Conditional rendering based on component state */}
          {loading && (
            <div className="loading-indicator">
              <p>Loading message from backend...</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              <h4>Error:</h4>
              <p>{error}</p>
              <p>
                <small>
                  Make sure the backend server is running on the correct port. 
                  Check the console for more details.
                </small>
              </p>
            </div>
          )}
          
          {helloMessage && !loading && !error && (
            <div className="success-message">
              <h4>Success!</h4>
              <p className="backend-message">"{helloMessage}"</p>
              <p>
                <small>
                  This message was successfully retrieved from the backend 
                  server's /hello endpoint.
                </small>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Educational Notes Section */}
      <section className="educational-notes">
        <h2>How It Works</h2>
        <p>
          This page demonstrates several important web development concepts:
        </p>
        <ol>
          <li>
            <strong>Component Lifecycle:</strong> The API call is made automatically 
            when the component mounts using React's useEffect hook.
          </li>
          <li>
            <strong>State Management:</strong> The component manages loading, success, 
            and error states to provide appropriate user feedback.
          </li>
          <li>
            <strong>API Integration:</strong> The frontend uses the getHello() function 
            from the API service module to communicate with the backend.
          </li>
          <li>
            <strong>Error Handling:</strong> All potential errors are caught and 
            displayed with user-friendly messages.
          </li>
          <li>
            <strong>Separation of Concerns:</strong> API logic is separated from 
            UI components for better maintainability.
          </li>
        </ol>
      </section>

      {/* Future Extensibility Section */}
      <section className="extensibility-notes">
        <h2>Future Enhancements</h2>
        <p>
          This basic example can be extended in many ways:
        </p>
        <ul>
          <li>Add more API endpoints and corresponding UI components</li>
          <li>Implement user authentication and authorization</li>
          <li>Add database integration for persistent data storage</li>
          <li>Include real-time features using WebSockets</li>
          <li>Add comprehensive error handling and logging</li>
          <li>Implement automated testing for both frontend and backend</li>
          <li>Add styling and responsive design for better user experience</li>
        </ul>
        <p>
          The architecture provided here serves as a solid foundation for 
          building more complex web applications.
        </p>
      </section>
    </main>
  );
}

/**
 * Component Export
 * 
 * Exports the Home component as a named export to maintain consistency
 * with the application's export patterns and enable easy importing in
 * other parts of the application.
 * 
 * Usage:
 * import { Home } from './pages/Home';
 * 
 * The component can be rendered in App.js or used in routing configurations
 * to serve as the main landing page for the tutorial application.
 */
export { Home };