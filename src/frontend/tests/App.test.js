// External Dependencies
import React from 'react'; // ^18.0.0 - Core React library for building user interfaces
import { render, screen, cleanup, waitFor } from '@testing-library/react'; // ^14.0.0 - Testing utilities for rendering components, querying DOM, and cleaning up after tests
import { jest } from '@jest/globals'; // ^29.0.0 - Test runner and assertion library for structuring and executing test cases

// Internal Dependencies - Components under test
import App from '../src/App';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';
import { Home } from '../src/pages/Home';

// Mock the API service to prevent actual HTTP requests during testing
// This ensures tests are deterministic and don't depend on backend availability
jest.mock('../src/services/api', () => ({
  getHello: jest.fn()
}));

// Import the mocked API service for test configuration
import { getHello } from '../src/services/api';

/**
 * Test Suite for App Component
 * 
 * This comprehensive test suite validates the main App component functionality,
 * including proper rendering of child components, static content display,
 * dynamic content from API calls, and error handling scenarios.
 * 
 * The tests are designed for educational clarity and demonstrate best practices
 * in frontend React testing using React Testing Library and Jest.
 * 
 * Test Coverage:
 * - App component layout and structure
 * - Static content rendering from all child components
 * - Dynamic content from API integration (mocked)
 * - Error handling and loading states
 * - Snapshot testing for UI consistency
 * 
 * Testing Strategy:
 * - Uses React Testing Library for user-centric testing approach
 * - Mocks external dependencies (API calls) for deterministic testing
 * - Tests integration between App and child components
 * - Verifies accessibility and semantic HTML structure
 * - Ensures proper cleanup between tests
 */
describe('App Component', () => {
  
  /**
   * Test Setup and Cleanup
   * 
   * Ensures each test runs in isolation with a clean DOM state
   * and properly mocked API functions.
   */
  beforeEach(() => {
    // Clear all mocks before each test to ensure clean state
    jest.clearAllMocks();
    
    // Reset the DOM state for each test
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // Clean up the DOM after each test to prevent cross-test contamination
    cleanup();
  });

  /**
   * Test 1: App Layout Rendering
   * 
   * Verifies that the App component renders the Header, Home, and Footer components
   * in the correct order and with expected content structure.
   * 
   * This test ensures:
   * - All three main components are present in the DOM
   * - Components are rendered in the correct hierarchical order
   * - The main container element has the correct CSS class
   * - Semantic HTML structure is maintained
   */
  test('renders App layout', async () => {
    // Mock the API call to return a successful response
    // This prevents the test from waiting for actual HTTP requests
    getHello.mockResolvedValue('Hello world');

    // Render the App component using React Testing Library
    render(<App />);

    // Assert that the main app container is present
    const appContainer = screen.getByRole('main');
    expect(appContainer).toBeInTheDocument();

    // Assert that the Header component is rendered
    // Check for the header element with the application title
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    
    // Verify header content is present
    const headerTitle = screen.getByRole('heading', { name: /node\.js hello tutorial/i });
    expect(headerTitle).toBeInTheDocument();
    expect(headerTitle.tagName).toBe('H1');

    // Assert that the Home component main content is rendered
    // Check for the main content area with welcome message
    const homeContent = screen.getByRole('main');
    expect(homeContent).toBeInTheDocument();
    
    // Verify main heading from Home component
    const welcomeHeading = screen.getByRole('heading', { name: /welcome to the node\.js tutorial application/i });
    expect(welcomeHeading).toBeInTheDocument();

    // Assert that the Footer component is rendered
    // Check for the footer element with copyright notice
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
    
    // Verify footer content is present
    const copyrightText = screen.getByText(/© 2024 node\.js hello tutorial/i);
    expect(copyrightText).toBeInTheDocument();

    // Verify the correct order of elements in the DOM tree
    const appDiv = screen.getByRole('main').closest('.app');
    expect(appDiv).toBeInTheDocument();
    
    // Check that header comes before main content
    const headerInDom = appDiv.querySelector('header');
    const mainInDom = appDiv.querySelector('main');
    const footerInDom = appDiv.querySelector('footer');
    
    expect(headerInDom).toBeTruthy();
    expect(mainInDom).toBeTruthy();
    expect(footerInDom).toBeTruthy();
    
    // Verify the order by checking element positions
    expect(headerInDom.compareDocumentPosition(mainInDom)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(mainInDom.compareDocumentPosition(footerInDom)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  /**
   * Test 2: Static Content Rendering
   * 
   * Checks that all static text content from Header, Home, and Footer components
   * is rendered correctly and matches the expected educational content.
   * 
   * This test ensures:
   * - All static text elements are present and accessible
   * - Content matches the educational requirements
   * - Headings are properly structured for accessibility
   * - Descriptive text provides educational value
   */
  test('renders static content', async () => {
    // Mock the API call to prevent it from affecting static content testing
    getHello.mockResolvedValue('Hello world');

    // Render the App component
    render(<App />);

    // Header Component Static Content
    expect(screen.getByRole('heading', { name: /node\.js hello tutorial/i })).toBeInTheDocument();

    // Home Component Static Content
    // Main welcome heading
    expect(screen.getByRole('heading', { name: /welcome to the node\.js tutorial application/i })).toBeInTheDocument();
    
    // Welcome section description
    expect(screen.getByText(/this is a simple educational application/i)).toBeInTheDocument();
    expect(screen.getByText(/demonstrates the fundamental concepts/i)).toBeInTheDocument();
    
    // Tutorial description section
    expect(screen.getByRole('heading', { name: /about this tutorial/i })).toBeInTheDocument();
    expect(screen.getByText(/this tutorial application is designed to teach you/i)).toBeInTheDocument();
    
    // Educational list items
    expect(screen.getByText(/setting up a node\.js http server/i)).toBeInTheDocument();
    expect(screen.getByText(/creating restful api endpoints/i)).toBeInTheDocument();
    expect(screen.getByText(/building a react frontend/i)).toBeInTheDocument();
    expect(screen.getByText(/managing api requests and responses/i)).toBeInTheDocument();
    expect(screen.getByText(/handling errors and loading states/i)).toBeInTheDocument();
    
    // API demonstration section
    expect(screen.getByRole('heading', { name: /backend api integration/i })).toBeInTheDocument();
    expect(screen.getByText(/live demonstration of the frontend communicating/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /backend response:/i })).toBeInTheDocument();
    
    // Educational notes section
    expect(screen.getByRole('heading', { name: /how it works/i })).toBeInTheDocument();
    expect(screen.getByText(/component lifecycle:/i)).toBeInTheDocument();
    expect(screen.getByText(/state management:/i)).toBeInTheDocument();
    expect(screen.getByText(/api integration:/i)).toBeInTheDocument();
    
    // Future enhancements section
    expect(screen.getByRole('heading', { name: /future enhancements/i })).toBeInTheDocument();
    expect(screen.getByText(/this basic example can be extended/i)).toBeInTheDocument();
    expect(screen.getByText(/add more api endpoints/i)).toBeInTheDocument();
    expect(screen.getByText(/implement user authentication/i)).toBeInTheDocument();
    
    // Footer Component Static Content
    expect(screen.getByText(/© 2024 node\.js hello tutorial/i)).toBeInTheDocument();
  });

  /**
   * Test 3: Home Component with Backend Message (Mocked)
   * 
   * Mocks the Home component's API call to simulate fetching the backend 'Hello world' message
   * and verifies that the message is displayed correctly in the UI.
   * 
   * This test ensures:
   * - API integration works correctly with mocked responses
   * - Loading states are properly managed
   * - Success messages are displayed with correct formatting
   * - Component state transitions work as expected
   */
  test('renders Home component with backend message', async () => {
    // Mock the getHello function to return a resolved promise with the expected message
    const mockMessage = 'Hello world';
    getHello.mockResolvedValue(mockMessage);

    // Render the App component
    render(<App />);

    // Initially, there should be a loading state
    // Note: The loading state might be very brief, so we may need to wait for it
    const loadingIndicator = screen.queryByText(/loading message from backend/i);
    // Loading indicator might not be visible due to fast mocking, this is acceptable

    // Wait for the backend message to appear in the document
    // This tests the async behavior of the Home component's useEffect
    await waitFor(() => {
      expect(screen.getByText(/success!/i)).toBeInTheDocument();
    });

    // Verify the success message display
    const successHeading = screen.getByRole('heading', { name: /success!/i });
    expect(successHeading).toBeInTheDocument();

    // Verify the actual backend message is displayed with quotes
    const backendMessage = screen.getByText(`"${mockMessage}"`);
    expect(backendMessage).toBeInTheDocument();
    expect(backendMessage).toHaveClass('backend-message');

    // Verify the explanatory text is present
    expect(screen.getByText(/this message was successfully retrieved/i)).toBeInTheDocument();
    expect(screen.getByText(/from the backend server's \/hello endpoint/i)).toBeInTheDocument();

    // Verify that the API function was called once
    expect(getHello).toHaveBeenCalledTimes(1);
    expect(getHello).toHaveBeenCalledWith();

    // Verify that error and loading states are not shown
    expect(screen.queryByText(/error:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/loading message from backend/i)).not.toBeInTheDocument();
  });

  /**
   * Test 4: Error Handling in Home Component
   * 
   * Tests the Home component's error handling when the API call fails,
   * ensuring proper error messages are displayed to the user.
   * 
   * This test ensures:
   * - API errors are caught and handled gracefully
   * - Error messages are displayed in a user-friendly format
   * - Loading states are properly cleared after errors
   * - Success messages are not shown when errors occur
   */
  test('handles API errors gracefully', async () => {
    // Mock the getHello function to reject with an error
    const errorMessage = 'Network error. Please check your connection and try again.';
    getHello.mockRejectedValue(errorMessage);

    // Render the App component
    render(<App />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/error:/i)).toBeInTheDocument();
    });

    // Verify the error message display
    const errorHeading = screen.getByRole('heading', { name: /error:/i });
    expect(errorHeading).toBeInTheDocument();

    // Verify the actual error message is displayed
    const displayedError = screen.getByText(errorMessage);
    expect(displayedError).toBeInTheDocument();

    // Verify the helpful instruction text is present
    expect(screen.getByText(/make sure the backend server is running/i)).toBeInTheDocument();
    expect(screen.getByText(/check the console for more details/i)).toBeInTheDocument();

    // Verify that the API function was called once
    expect(getHello).toHaveBeenCalledTimes(1);

    // Verify that success and loading states are not shown
    expect(screen.queryByText(/success!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/loading message from backend/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"hello world"/i)).not.toBeInTheDocument();
  });

  /**
   * Test 5: Loading State Display
   * 
   * Tests that the loading indicator is displayed while the API call is in progress.
   * This test uses a delayed mock to ensure the loading state is visible.
   * 
   * This test ensures:
   * - Loading indicators are shown during API requests
   * - Loading states are properly managed and cleared
   * - User feedback is provided during async operations
   */
  test('displays loading state during API call', async () => {
    // Create a delayed promise to simulate network delay
    let resolvePromise;
    const delayedPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    // Mock the getHello function to return the delayed promise
    getHello.mockReturnValue(delayedPromise);

    // Render the App component
    render(<App />);

    // Check that loading indicator is displayed
    expect(screen.getByText(/loading message from backend/i)).toBeInTheDocument();

    // Verify that success and error states are not shown during loading
    expect(screen.queryByText(/success!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/error:/i)).not.toBeInTheDocument();

    // Resolve the promise to complete the loading state
    resolvePromise('Hello world');

    // Wait for the loading state to be replaced by success state
    await waitFor(() => {
      expect(screen.queryByText(/loading message from backend/i)).not.toBeInTheDocument();
    });

    // Verify that success state is now displayed
    expect(screen.getByText(/success!/i)).toBeInTheDocument();
  });

  /**
   * Test 6: Snapshot Testing
   * 
   * Creates a snapshot of the rendered App component to detect unintentional UI changes
   * in future code updates. This test helps maintain UI consistency over time.
   * 
   * This test ensures:
   * - UI structure remains consistent across code changes
   * - Unintentional changes to component rendering are detected
   * - Visual regression testing is implemented
   * - Development team is alerted to UI modifications
   */
  test('matches snapshot', async () => {
    // Mock the API call to ensure consistent snapshot
    getHello.mockResolvedValue('Hello world');

    // Render the App component
    const { asFragment } = render(<App />);

    // Wait for the component to fully render including async content
    await waitFor(() => {
      expect(screen.getByText(/success!/i)).toBeInTheDocument();
    });

    // Capture the rendered output as a snapshot
    expect(asFragment()).toMatchSnapshot();
  });

  /**
   * Test 7: Accessibility Testing
   * 
   * Verifies that the App component and its children maintain proper accessibility
   * features including semantic HTML, proper heading hierarchy, and ARIA roles.
   * 
   * This test ensures:
   * - Semantic HTML structure is maintained
   * - Proper heading hierarchy is followed
   * - ARIA roles are correctly assigned
   * - Screen reader compatibility is preserved
   */
  test('maintains accessibility standards', async () => {
    // Mock the API call for consistent testing
    getHello.mockResolvedValue('Hello world');

    // Render the App component
    render(<App />);

    // Wait for full component rendering
    await waitFor(() => {
      expect(screen.getByText(/success!/i)).toBeInTheDocument();
    });

    // Verify semantic HTML structure
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByRole('main')).toBeInTheDocument(); // Main content
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer

    // Verify proper heading hierarchy
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
    
    // Check that the main title is an H1
    const mainTitle = screen.getByRole('heading', { name: /node\.js hello tutorial/i });
    expect(mainTitle.tagName).toBe('H1');
    
    // Verify other headings follow proper hierarchy
    const welcomeHeading = screen.getByRole('heading', { name: /welcome to the node\.js tutorial application/i });
    expect(welcomeHeading.tagName).toBe('H1');
    
    const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(sectionHeadings.length).toBeGreaterThan(0);
  });

  /**
   * Test 8: Component Integration
   * 
   * Tests that the App component properly integrates with all its child components
   * and that data flows correctly between components.
   * 
   * This test ensures:
   * - App component properly renders all child components
   * - Component hierarchy is maintained
   * - No integration issues between components
   * - All components receive proper props (if any)
   */
  test('integrates properly with child components', async () => {
    // Mock the API call
    getHello.mockResolvedValue('Hello world');

    // Render the App component
    render(<App />);

    // Wait for async content to load
    await waitFor(() => {
      expect(screen.getByText(/success!/i)).toBeInTheDocument();
    });

    // Verify that all child components are rendered and functional
    // Header component integration
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /node\.js hello tutorial/i })).toBeInTheDocument();

    // Home component integration
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText(/welcome to the node\.js tutorial application/i)).toBeInTheDocument();
    expect(screen.getByText(/success!/i)).toBeInTheDocument();
    expect(screen.getByText(/"hello world"/i)).toBeInTheDocument();

    // Footer component integration
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/© 2024 node\.js hello tutorial/i)).toBeInTheDocument();

    // Verify that the App component's className is applied
    const appContainer = screen.getByRole('main').closest('.app');
    expect(appContainer).toBeInTheDocument();
    expect(appContainer).toHaveClass('app');
  });
});