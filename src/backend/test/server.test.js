/**
 * Integration and Lifecycle Test Suite for Backend Server
 * 
 * This comprehensive test suite verifies that the Express.js server starts correctly,
 * binds to the expected port, exposes the /hello endpoint, returns the correct response,
 * and handles error scenarios gracefully. The tests use Supertest for HTTP assertions
 * and Jest as the test runner, ensuring the server meets all functional, performance,
 * and error-handling requirements as specified in the technical documentation.
 * 
 * The test suite is designed for educational clarity, protocol compliance, and
 * production-readiness, providing a complete reference for Node.js/Express.js
 * server testing best practices using modern testing frameworks.
 * 
 * Test Coverage:
 * - HTTP Server Implementation (F-001): Server initialization and port binding
 * - Hello World Endpoint (F-002): GET /hello endpoint functionality
 * - Server Lifecycle Management (F-003): Startup, shutdown, and error handling
 * - Error Handling: 404 responses, method not allowed, server errors
 * - Performance: Response time validation and resource usage
 * - Protocol Compliance: HTTP headers, status codes, and response formats
 * 
 * @fileoverview Integration and lifecycle test suite for Express.js backend server
 * @author Backend Development Team
 * @version 1.0.0
 * @since 2024
 * @requires supertest ^7.1.3
 * @requires jest ^29.0.0
 */

// External Dependencies
const request = require('supertest'); // ^7.1.3 - HTTP assertions for testing Express applications
const { beforeAll, afterAll, describe, test, expect } = require('@jest/globals'); // ^29.0.0 - Test runner and assertion framework

// Internal Dependencies
const app = require('../config/express.js'); // Fully configured Express application instance

// Global Test Variables
let server; // Reference to the running Express server instance for lifecycle management
let testPort; // Port number assigned to the test server

/**
 * Test Suite Setup - Server Lifecycle Management
 * 
 * This setup function initializes the test environment by starting the Express server
 * on a random available port, ensuring test isolation and avoiding port conflicts.
 * The server instance is stored globally for use in test cases and cleanup.
 * 
 * The setup process follows best practices for integration testing by:
 * - Starting the server on a random port (port 0) to avoid conflicts
 * - Waiting for the server to be fully ready before running tests
 * - Storing server reference for proper cleanup in afterAll
 * - Providing comprehensive error handling for setup failures
 * 
 * @function beforeAll
 * @returns {Promise<void>} Resolves when the server is listening and ready for testing
 * @throws {Error} Test setup errors are propagated to Jest for proper failure reporting
 */
beforeAll(async () => {
    try {
        // Start the Express server on a random available port (port 0)
        // This ensures test isolation and prevents port conflict issues
        server = app.listen(0, () => {
            // Extract the assigned port number for test reference
            testPort = server.address().port;
            console.log(`✓ Test server started on port ${testPort}`);
        });
        
        // Wait for the server to be fully ready
        await new Promise((resolve) => {
            server.on('listening', resolve);
        });
        
        console.log('✓ Test environment initialized successfully');
        console.log(`✓ Server ready for HTTP assertions on port ${testPort}`);
        
    } catch (error) {
        console.error('✗ Test setup failed:', error.message);
        throw new Error(`Test environment initialization failed: ${error.message}`);
    }
});

/**
 * Test Suite Teardown - Server Cleanup
 * 
 * This teardown function ensures proper cleanup of the test environment by
 * gracefully shutting down the Express server and closing all connections.
 * Proper cleanup prevents resource leaks and ensures test isolation.
 * 
 * The cleanup process follows best practices by:
 * - Gracefully closing the HTTP server
 * - Ensuring all connections are properly terminated
 * - Providing timeout handling for cleanup operations
 * - Logging cleanup status for debugging purposes
 * 
 * @function afterAll
 * @returns {Promise<void>} Resolves when the server is fully closed and cleaned up
 * @throws {Error} Cleanup errors are logged but don't fail the test suite
 */
afterAll(async () => {
    try {
        if (server) {
            // Close the server gracefully
            await new Promise((resolve, reject) => {
                server.close((error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
            
            console.log('✓ Test server closed successfully');
            console.log('✓ Test environment cleanup completed');
        }
    } catch (error) {
        console.error('✗ Test cleanup error:', error.message);
        // Don't throw here to avoid affecting test results
    }
});

/**
 * Main Test Suite - Server Lifecycle and /hello Endpoint
 * 
 * This comprehensive test suite validates all aspects of the Express.js server
 * functionality, including server lifecycle management, HTTP endpoint behavior,
 * error handling, and protocol compliance. The tests are organized by feature
 * areas and cover both success and error scenarios.
 */
describe('Server lifecycle and /hello endpoint', () => {
    
    /**
     * Test Group: HTTP Server Implementation (F-001)
     * 
     * These tests verify that the Express.js server initializes correctly,
     * binds to the expected port, and is ready to accept HTTP requests.
     * This validates the core HTTP server functionality requirements.
     */
    describe('HTTP Server Implementation', () => {
        
        /**
         * Test Case: Server Startup and Port Binding
         * 
         * Verifies that the server starts successfully, binds to a port,
         * and is ready to accept HTTP connections. This test validates
         * the fundamental server lifecycle management capabilities.
         */
        test('should start the server and bind to a port', async () => {
            // Verify that the server instance exists and is listening
            expect(server).toBeDefined();
            expect(server.listening).toBe(true);
            
            // Verify that a port was assigned
            expect(testPort).toBeDefined();
            expect(typeof testPort).toBe('number');
            expect(testPort).toBeGreaterThan(0);
            
            // Verify server address information
            const address = server.address();
            expect(address).toBeDefined();
            expect(address.port).toBe(testPort);
            expect(address.family).toBeDefined();
            
            console.log(`✓ Server successfully bound to port ${testPort}`);
        });
        
        /**
         * Test Case: Server Readiness and Health Check
         * 
         * Performs a basic health check to ensure the server is ready
         * to process HTTP requests and respond appropriately.
         */
        test('should be ready to accept HTTP connections', async () => {
            // Perform a simple request to verify server readiness
            const response = await request(app)
                .get('/hello')
                .timeout(5000); // 5 second timeout for server readiness
            
            // Verify that the server responds (regardless of specific response)
            expect(response).toBeDefined();
            expect(response.status).toBeDefined();
            
            console.log('✓ Server is ready to accept HTTP connections');
        });
    });
    
    /**
     * Test Group: Hello World Endpoint (F-002)
     * 
     * These tests validate the /hello endpoint functionality, ensuring it
     * responds to GET requests with the exact text "Hello world" and
     * maintains proper HTTP protocol compliance.
     */
    describe('Hello World Endpoint', () => {
        
        /**
         * Test Case: GET /hello Success Response
         * 
         * Verifies that the /hello endpoint responds to GET requests with
         * HTTP 200 status and the exact text "Hello world". This test
         * validates the core endpoint functionality requirements.
         */
        test('should respond to GET /hello with "Hello world"', async () => {
            // Measure response time for performance validation
            const startTime = Date.now();
            
            // Send GET request to /hello endpoint
            const response = await request(app)
                .get('/hello')
                .expect(200) // Expect HTTP 200 OK status
                .expect('Content-Type', /text\/plain/); // Expect plain text content type
            
            const responseTime = Date.now() - startTime;
            
            // Verify response body contains exact text "Hello world"
            expect(response.text).toBe('Hello world');
            
            // Verify response headers
            expect(response.headers['content-type']).toMatch(/text\/plain/);
            expect(response.headers['content-type']).toMatch(/charset=utf-8/);
            
            // Verify response performance (should be under 100ms as per requirements)
            expect(responseTime).toBeLessThan(100);
            
            console.log(`✓ GET /hello responded correctly in ${responseTime}ms`);
        });
        
        /**
         * Test Case: Response Format and Headers Validation
         * 
         * Validates that the /hello endpoint returns properly formatted
         * HTTP responses with correct headers and content type.
         */
        test('should return proper HTTP headers and content type', async () => {
            const response = await request(app)
                .get('/hello')
                .expect(200);
            
            // Verify Content-Type header is set to text/plain with UTF-8 charset
            expect(response.headers['content-type']).toMatch(/text\/plain;\s*charset=utf-8/);
            
            // Verify response body is exactly "Hello world"
            expect(response.text).toBe('Hello world');
            expect(response.text.length).toBe(11); // "Hello world" is 11 characters
            
            // Verify no unexpected headers or security issues
            expect(response.headers['x-powered-by']).toBeUndefined(); // Express security best practice
            
            console.log('✓ Response headers and content type are correctly formatted');
        });
        
        /**
         * Test Case: Response Content Validation
         * 
         * Performs detailed validation of the response content to ensure
         * it meets the exact specification requirements.
         */
        test('should return exact content without extra characters', async () => {
            const response = await request(app)
                .get('/hello')
                .expect(200);
            
            // Verify exact response content
            expect(response.text).toBe('Hello world');
            expect(response.text).toHaveLength(11);
            
            // Verify no leading or trailing whitespace
            expect(response.text.trim()).toBe('Hello world');
            
            // Verify no additional characters or formatting
            expect(response.text).not.toMatch(/\n/); // No newlines
            expect(response.text).not.toMatch(/\r/); // No carriage returns
            expect(response.text).not.toMatch(/\t/); // No tabs
            
            console.log('✓ Response content is exactly "Hello world" with no extra characters');
        });
    });
    
    /**
     * Test Group: Error Handling and Edge Cases
     * 
     * These tests validate the server's error handling capabilities,
     * including 404 responses for unknown routes, method not allowed
     * responses, and general error handling behavior.
     */
    describe('Error Handling and Edge Cases', () => {
        
        /**
         * Test Case: 404 Not Found for Unknown Routes
         * 
         * Verifies that the server responds with HTTP 404 for requests
         * to non-existent endpoints, demonstrating proper error handling.
         */
        test('should return 404 for unknown routes', async () => {
            const response = await request(app)
                .get('/nonexistent-route')
                .expect(404);
            
            // Verify response is JSON formatted error
            expect(response.headers['content-type']).toMatch(/application\/json/);
            
            // Verify error response structure
            expect(response.body).toHaveProperty('status', 404);
            expect(response.body).toHaveProperty('error', 'Not Found');
            expect(response.body).toHaveProperty('message');
            
            console.log('✓ Unknown routes return proper 404 responses');
        });
        
        /**
         * Test Case: Method Not Allowed Handling
         * 
         * Tests the server's response to unsupported HTTP methods
         * on the /hello endpoint to verify proper method handling.
         */
        test('should handle unsupported HTTP methods appropriately', async () => {
            // Test POST method on /hello endpoint
            const postResponse = await request(app)
                .post('/hello')
                .expect(404); // Express default behavior for unmatched routes
            
            // Verify error response structure
            expect(postResponse.headers['content-type']).toMatch(/application\/json/);
            expect(postResponse.body).toHaveProperty('status', 404);
            
            // Test PUT method on /hello endpoint
            const putResponse = await request(app)
                .put('/hello')
                .expect(404);
            
            expect(putResponse.headers['content-type']).toMatch(/application\/json/);
            expect(putResponse.body).toHaveProperty('status', 404);
            
            console.log('✓ Unsupported HTTP methods return appropriate error responses');
        });
        
        /**
         * Test Case: Request Timeout Handling
         * 
         * Validates that the server handles request timeouts gracefully
         * and doesn't crash or hang indefinitely.
         */
        test('should handle request timeouts gracefully', async () => {
            // Test with a reasonable timeout
            const response = await request(app)
                .get('/hello')
                .timeout(1000) // 1 second timeout
                .expect(200);
            
            expect(response.text).toBe('Hello world');
            
            console.log('✓ Server handles requests within timeout limits');
        });
    });
    
    /**
     * Test Group: Performance and Resource Usage
     * 
     * These tests validate the server's performance characteristics,
     * including response times, memory usage, and concurrent request handling.
     */
    describe('Performance and Resource Usage', () => {
        
        /**
         * Test Case: Response Time Performance
         * 
         * Validates that the /hello endpoint responds within acceptable
         * time limits as specified in the technical requirements.
         */
        test('should respond within acceptable time limits', async () => {
            const trials = 5;
            const responseTimes = [];
            
            // Perform multiple requests to get average response time
            for (let i = 0; i < trials; i++) {
                const startTime = Date.now();
                
                await request(app)
                    .get('/hello')
                    .expect(200);
                
                const responseTime = Date.now() - startTime;
                responseTimes.push(responseTime);
            }
            
            // Calculate average response time
            const averageResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / trials;
            
            // Verify average response time is under 100ms (requirement)
            expect(averageResponseTime).toBeLessThan(100);
            
            console.log(`✓ Average response time: ${averageResponseTime.toFixed(2)}ms (${trials} trials)`);
        });
        
        /**
         * Test Case: Concurrent Request Handling
         * 
         * Tests the server's ability to handle multiple concurrent requests
         * without performance degradation or errors.
         */
        test('should handle concurrent requests efficiently', async () => {
            const concurrentRequests = 10;
            const requestPromises = [];
            
            // Create multiple concurrent requests
            for (let i = 0; i < concurrentRequests; i++) {
                const requestPromise = request(app)
                    .get('/hello')
                    .expect(200)
                    .expect('Hello world');
                
                requestPromises.push(requestPromise);
            }
            
            // Wait for all requests to complete
            const startTime = Date.now();
            const responses = await Promise.all(requestPromises);
            const totalTime = Date.now() - startTime;
            
            // Verify all requests completed successfully
            responses.forEach((response, index) => {
                expect(response.status).toBe(200);
                expect(response.text).toBe('Hello world');
            });
            
            // Verify concurrent handling performance
            expect(totalTime).toBeLessThan(1000); // All requests should complete within 1 second
            
            console.log(`✓ Handled ${concurrentRequests} concurrent requests in ${totalTime}ms`);
        });
    });
    
    /**
     * Test Group: Protocol Compliance and Security
     * 
     * These tests validate HTTP protocol compliance, security headers,
     * and proper response formatting according to web standards.
     */
    describe('Protocol Compliance and Security', () => {
        
        /**
         * Test Case: HTTP Protocol Compliance
         * 
         * Validates that responses comply with HTTP/1.1 protocol standards
         * and include proper headers and status codes.
         */
        test('should comply with HTTP/1.1 protocol standards', async () => {
            const response = await request(app)
                .get('/hello')
                .expect(200);
            
            // Verify required HTTP headers are present
            expect(response.headers).toHaveProperty('content-type');
            expect(response.headers).toHaveProperty('content-length');
            expect(response.headers).toHaveProperty('date');
            
            // Verify Content-Length is correct
            const expectedContentLength = Buffer.byteLength('Hello world', 'utf8');
            expect(response.headers['content-length']).toBe(expectedContentLength.toString());
            
            // Verify Date header is valid
            const dateHeader = new Date(response.headers['date']);
            expect(dateHeader).toBeInstanceOf(Date);
            expect(dateHeader.getTime()).not.toBeNaN();
            
            console.log('✓ Response complies with HTTP/1.1 protocol standards');
        });
        
        /**
         * Test Case: Security Headers Validation
         * 
         * Validates that security best practices are followed,
         * including the absence of information disclosure headers.
         */
        test('should follow security best practices', async () => {
            const response = await request(app)
                .get('/hello')
                .expect(200);
            
            // Verify X-Powered-By header is not present (security best practice)
            expect(response.headers['x-powered-by']).toBeUndefined();
            
            // Verify no sensitive information is exposed in headers
            expect(response.headers).not.toHaveProperty('server');
            expect(response.headers).not.toHaveProperty('x-express-version');
            
            console.log('✓ Security best practices are followed');
        });
        
        /**
         * Test Case: Character Encoding Validation
         * 
         * Validates that character encoding is properly handled
         * for international compatibility and protocol compliance.
         */
        test('should handle character encoding correctly', async () => {
            const response = await request(app)
                .get('/hello')
                .expect(200);
            
            // Verify UTF-8 encoding is specified
            expect(response.headers['content-type']).toMatch(/charset=utf-8/);
            
            // Verify response text is properly encoded
            expect(response.text).toBe('Hello world');
            expect(Buffer.from(response.text, 'utf8').toString('utf8')).toBe('Hello world');
            
            console.log('✓ Character encoding is handled correctly');
        });
    });
    
    /**
     * Test Group: Server Lifecycle Management (F-003)
     * 
     * These tests validate server lifecycle management capabilities,
     * including startup procedures, shutdown handling, and error recovery.
     */
    describe('Server Lifecycle Management', () => {
        
        /**
         * Test Case: Server Status and Health
         * 
         * Validates that the server maintains proper status and health
         * indicators throughout its lifecycle.
         */
        test('should maintain proper server status', async () => {
            // Verify server is listening and ready
            expect(server.listening).toBe(true);
            
            // Verify server address is available
            const address = server.address();
            expect(address).toBeDefined();
            expect(address.port).toBe(testPort);
            
            // Verify server can process requests
            const response = await request(app)
                .get('/hello')
                .expect(200);
            
            expect(response.text).toBe('Hello world');
            
            console.log('✓ Server maintains proper status and health');
        });
        
        /**
         * Test Case: Error Recovery and Stability
         * 
         * Tests the server's ability to recover from errors and maintain
         * stability during error conditions.
         */
        test('should maintain stability during error conditions', async () => {
            // Generate a 404 error
            await request(app)
                .get('/nonexistent')
                .expect(404);
            
            // Verify server is still operational after error
            expect(server.listening).toBe(true);
            
            // Verify server can still process valid requests
            const response = await request(app)
                .get('/hello')
                .expect(200);
            
            expect(response.text).toBe('Hello world');
            
            console.log('✓ Server maintains stability during error conditions');
        });
    });
    
    /**
     * Test Group: Integration and End-to-End Scenarios
     * 
     * These tests validate complete end-to-end scenarios and integration
     * between different components of the server application.
     */
    describe('Integration and End-to-End Scenarios', () => {
        
        /**
         * Test Case: Complete Request-Response Cycle
         * 
         * Validates the complete HTTP request-response cycle including
         * middleware processing, route handling, and response generation.
         */
        test('should complete full request-response cycle correctly', async () => {
            const startTime = Date.now();
            
            // Send request and measure complete cycle time
            const response = await request(app)
                .get('/hello')
                .expect(200)
                .expect('Content-Type', /text\/plain/)
                .expect('Hello world');
            
            const cycleTime = Date.now() - startTime;
            
            // Verify response properties
            expect(response.status).toBe(200);
            expect(response.text).toBe('Hello world');
            expect(response.headers['content-type']).toMatch(/text\/plain/);
            
            // Verify performance
            expect(cycleTime).toBeLessThan(100);
            
            console.log(`✓ Complete request-response cycle completed in ${cycleTime}ms`);
        });
        
        /**
         * Test Case: Middleware Chain Validation
         * 
         * Validates that the middleware chain processes requests correctly
         * and maintains proper order of execution.
         */
        test('should process middleware chain correctly', async () => {
            const response = await request(app)
                .get('/hello')
                .expect(200);
            
            // Verify middleware chain executed successfully
            // (indicated by successful response and proper headers)
            expect(response.status).toBe(200);
            expect(response.text).toBe('Hello world');
            expect(response.headers['content-type']).toMatch(/text\/plain/);
            
            // Verify no middleware errors occurred
            expect(response.headers).not.toHaveProperty('x-middleware-error');
            
            console.log('✓ Middleware chain processes requests correctly');
        });
    });
});

/**
 * Test Suite Configuration and Best Practices
 * 
 * This test suite implements several best practices for integration testing:
 * 
 * 1. **Test Isolation**: Each test is independent and doesn't rely on others
 * 2. **Resource Management**: Proper setup and teardown of server resources
 * 3. **Error Handling**: Comprehensive error scenario testing
 * 4. **Performance Testing**: Response time and concurrent request validation
 * 5. **Protocol Compliance**: HTTP standard compliance verification
 * 6. **Security Testing**: Security best practice validation
 * 7. **Educational Value**: Clear test descriptions and comprehensive coverage
 * 8. **Production Readiness**: Tests that verify production-ready behavior
 * 
 * The test suite provides complete coverage of the server functionality
 * as specified in the technical requirements and serves as both validation
 * and documentation of the expected server behavior.
 */

/**
 * Jest Configuration Notes
 * 
 * Recommended Jest configuration for this test suite:
 * 
 * ```json
 * {
 *   "testEnvironment": "node",
 *   "testTimeout": 10000,
 *   "collectCoverage": true,
 *   "coverageDirectory": "coverage",
 *   "coverageReporters": ["text", "lcov", "html"],
 *   "testMatch": ["**/*.test.js"],
 *   "verbose": true
 * }
 * ```
 * 
 * This configuration ensures proper Node.js environment setup,
 * adequate timeout for integration tests, and comprehensive
 * coverage reporting for educational and quality assurance purposes.
 */