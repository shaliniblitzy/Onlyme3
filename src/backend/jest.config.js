/**
 * Jest Configuration for Backend Node.js/Express.js Tutorial Application
 * 
 * This configuration file sets up Jest testing framework for the backend codebase,
 * ensuring consistent test execution across different environments and platforms.
 * The configuration is optimized for educational purposes while maintaining
 * production-ready standards and best practices.
 * 
 * Jest Version: ^29.0.0
 * Node.js Version: 22.x LTS
 * Express.js Version: 5.1.0
 * 
 * Key Features:
 * - Node.js test environment for backend testing
 * - Support for both JavaScript and TypeScript test files
 * - Comprehensive code coverage collection and reporting
 * - Cross-platform compatibility (Windows, macOS, Linux)
 * - Integration testing support with Supertest
 * - Educational clarity with detailed configuration comments
 */

module.exports = {
  /**
   * Test Environment Configuration
   * 
   * Sets the test environment to 'node' for backend server testing.
   * This ensures that tests run in a Node.js environment rather than a browser
   * environment, which is essential for testing Express.js applications and
   * server-side functionality.
   */
  testEnvironment: 'node',

  /**
   * Test File Pattern Matching
   * 
   * Defines patterns for Jest to identify test files. The configuration
   * supports both JavaScript (.js) and TypeScript (.ts) test files located
   * in the test directory and its subdirectories.
   * 
   * Pattern explanation:
   * - <rootDir>: Jest's root directory (automatically resolved)
   * - test/**/*.test.js: JavaScript test files in test directory
   * - test/**/*.test.ts: TypeScript test files in test directory
   * - **: Recursive directory matching
   * - *.test.*: Files ending with .test before the extension
   */
  testMatch: [
    '<rootDir>/test/**/*.test.js',
    '<rootDir>/test/**/*.test.ts'
  ],

  /**
   * Code Coverage Collection
   * 
   * Enables automatic code coverage collection during test execution.
   * This helps identify which parts of the codebase are covered by tests
   * and which areas may need additional testing for comprehensive coverage.
   * Essential for maintaining code quality and ensuring thorough testing.
   */
  collectCoverage: true,

  /**
   * Coverage Output Directory
   * 
   * Specifies the directory where coverage reports will be generated.
   * The coverage directory will contain detailed reports in multiple formats
   * for different use cases (HTML for browsing, LCOV for CI/CD integration).
   */
  coverageDirectory: '<rootDir>/coverage',

  /**
   * Coverage Report Formats
   * 
   * Defines the output formats for coverage reports to support different
   * consumption scenarios:
   * 
   * - 'text': Console output for immediate feedback during development
   * - 'lcov': Industry-standard format for CI/CD integration and code analysis tools
   * - 'html': Interactive HTML reports for detailed coverage review and education
   * 
   * Multiple formats ensure compatibility with various tools and workflows.
   */
  coverageReporters: [
    'text',
    'lcov',
    'html'
  ],

  /**
   * Module File Extensions
   * 
   * Specifies the file extensions that Jest should consider when resolving
   * modules. This configuration supports:
   * 
   * - 'js': JavaScript files (ES5, ES6+, CommonJS)
   * - 'ts': TypeScript files (for future TypeScript adoption)
   * - 'json': JSON configuration and data files
   * 
   * Order matters: Jest will try to resolve files in the specified order.
   */
  moduleFileExtensions: [
    'js',
    'ts',
    'json'
  ],

  /**
   * Test Root Directories
   * 
   * Defines the root directories that Jest should scan for tests and modules.
   * This configuration ensures that Jest can properly resolve imports and
   * dependencies across the application structure:
   * 
   * - test: Contains all test files and test utilities
   * - routes: Express.js route handlers and API endpoints
   * - config: Application configuration files and settings
   * - middleware: Express.js middleware functions
   * - utils: Utility functions and helper modules
   * 
   * These directories align with the layered architecture pattern used
   * in the tutorial application for clear separation of concerns.
   */
  roots: [
    '<rootDir>/test',
    '<rootDir>/routes',
    '<rootDir>/config',
    '<rootDir>/middleware',
    '<rootDir>/utils'
  ],

  /**
   * Setup Files After Environment
   * 
   * Specifies files to run after the test environment is set up but before
   * tests are executed. Currently empty but available for future extensions
   * such as:
   * 
   * - Global test utilities setup
   * - Mock configurations
   * - Test database initialization
   * - Custom Jest matchers
   * 
   * Educational Note: This array is kept empty for the basic tutorial but
   * demonstrates the extensibility of Jest configuration for complex applications.
   */
  setupFilesAfterEnv: [],

  /**
   * Global Test Timeout
   * 
   * Sets the default timeout for all tests in milliseconds. A 5-second timeout
   * is appropriate for:
   * 
   * - Integration tests with Express.js endpoints
   * - HTTP request/response cycles with Supertest
   * - Asynchronous operations and promises
   * - Cross-platform compatibility considerations
   * 
   * This timeout balances test reliability with reasonable execution time,
   * preventing tests from hanging indefinitely while allowing sufficient
   * time for complex operations to complete.
   */
  testTimeout: 5000
};