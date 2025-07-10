# Node.js Tutorial Application Setup Guide

## Introduction

Welcome to the Node.js Tutorial Application! This guide will help you set up and run a simple Node.js web server that demonstrates fundamental HTTP server concepts using Express.js 5.1.0. The application serves a single endpoint (`/hello`) that returns "Hello world" to help you understand the basics of Node.js and Express.js development.

### What You'll Learn

- How to set up a local Node.js development environment
- How to create a basic HTTP server using Express.js
- How to install and manage dependencies with npm
- How to test HTTP endpoints using various tools
- How to troubleshoot common setup issues

### Application Overview

This tutorial application is intentionally simple, focusing on core concepts:
- **Single Endpoint**: `GET /hello` returns "Hello world"
- **Local Development**: Runs on `localhost:3000`
- **Static Response**: No database or external services required
- **Educational Focus**: Demonstrates HTTP server fundamentals

## Prerequisites

Before starting, ensure you have the following software installed on your system:

### Required Software

| Software | Version Required | Purpose |
|----------|------------------|---------|
| **Node.js** | 22.x LTS or higher | JavaScript runtime environment |
| **npm** | 11.0.0 or higher | Package manager (bundled with Node.js) |
| **Git** | Latest version | Version control (for cloning repository) |

### Recommended Software

| Software | Purpose |
|----------|---------|
| **Visual Studio Code** | Code editor with excellent Node.js support |
| **Terminal/Command Prompt** | Command line interface |
| **Web Browser** | For testing the application (Chrome, Firefox, Safari, etc.) |

### Version Verification

To check if you have the correct versions installed, run these commands in your terminal:

```bash
# Check Node.js version
node --version
# Should output: v22.x.x or higher

# Check npm version
npm --version
# Should output: 11.x.x or higher

# Check Git version
git --version
# Should output: git version x.x.x
```

## Project Structure Overview

The tutorial application follows a simple, educational structure:

```
nodejs-tutorial-app/
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Dependency lock file (auto-generated)
├── server.js                 # Main application file
├── .env.example             # Environment configuration template
├── .gitignore               # Git ignore patterns
├── README.md                # Project documentation
├── docs/                    # Documentation directory
│   ├── setup.md            # This setup guide
│   └── api.md              # API documentation
├── src/                     # Source code directory
│   └── backend/            # Backend application code
│       ├── server.js       # Main server file
│       └── test/           # Test files
│           └── routes/
│               └── hello.test.js
└── node_modules/           # Dependencies (created after npm install)
```

### Key Files Description

- **`package.json`**: Contains project metadata, dependencies, and npm scripts
- **`server.js`**: Main application entry point with Express.js server
- **`.env.example`**: Template for environment variables configuration
- **`package-lock.json`**: Ensures consistent dependency versions across environments

## Backend Setup

Follow these step-by-step instructions to set up the backend server.

### 1. Install Node.js and npm

#### Windows Installation

1. **Download Node.js**:
   - Visit [nodejs.org](https://nodejs.org/)
   - Download the "LTS" version (22.x LTS recommended)
   - Choose the Windows Installer (.msi) for your system architecture

2. **Install Node.js**:
   - Run the downloaded `.msi` file
   - Follow the installation wizard
   - Ensure "Add to PATH" is checked
   - Restart your command prompt after installation

3. **Verify Installation**:
   ```cmd
   node --version
   npm --version
   ```

#### macOS Installation

1. **Download Node.js**:
   - Visit [nodejs.org](https://nodejs.org/)
   - Download the "LTS" version (22.x LTS recommended)
   - Choose the macOS Installer (.pkg)

2. **Install Node.js**:
   - Run the downloaded `.pkg` file
   - Follow the installation wizard
   - Enter your password when prompted

3. **Alternative: Using Homebrew**:
   ```bash
   # Install Homebrew if you haven't already
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js
   brew install node@22
   ```

4. **Verify Installation**:
   ```bash
   node --version
   npm --version
   ```

#### Linux Installation

##### Ubuntu/Debian:
```bash
# Update package index
sudo apt update

# Install Node.js 22.x LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

##### CentOS/RHEL/Fedora:
```bash
# Install Node.js 22.x LTS
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo yum install -y nodejs

# For Fedora, use dnf instead of yum
sudo dnf install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-username/nodejs-tutorial-app.git

# Navigate to the project directory
cd nodejs-tutorial-app
```

### 3. Install Backend Dependencies

Navigate to the backend directory and install all required packages:

```bash
# Navigate to the backend directory
cd src/backend

# Install dependencies
npm install
```

This command will install:
- **Express.js 5.1.0**: Web framework for Node.js
- **Other dependencies**: Any additional packages specified in package.json

Expected output:
```
npm WARN deprecated <package>@<version>: <deprecation message>
added 64 packages, and audited 65 packages in 3s

4 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### 4. Configure Environment Variables

1. **Copy the environment template**:
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file**:
   ```bash
   # Open .env in your preferred editor
   nano .env
   # or
   code .env
   ```

3. **Configure variables** (if present):
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   
   # Application Settings
   APP_NAME=nodejs-tutorial-app
   ```

   > **Note**: The tutorial application uses default settings, so you may not need to modify the .env file.

### 5. Start the Backend Server

Start the development server using one of these methods:

#### Method 1: Using npm scripts (Recommended)
```bash
npm start
```

#### Method 2: Direct Node.js execution
```bash
node server.js
```

#### Method 3: Development mode with file watching
```bash
npm run dev
```

**Expected Output**:
```
Server running on port 3000
Express.js 5.1.0 server started
Open your browser to http://localhost:3000/hello
```

## Frontend Setup (Optional)

This tutorial application focuses on backend development and does not require a separate frontend setup. The application can be tested directly through:

- **Web Browser**: Navigate to `http://localhost:3000/hello`
- **Command Line Tools**: Use `curl` or similar tools
- **API Testing Tools**: Use Postman, Insomnia, or similar applications

If you wish to create a simple frontend for educational purposes, you can:

1. **Create a basic HTML file**:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>Node.js Tutorial</title>
   </head>
   <body>
       <h1>Node.js Tutorial Application</h1>
       <button onclick="fetchHello()">Test Hello Endpoint</button>
       <div id="response"></div>
       
       <script>
           async function fetchHello() {
               try {
                   const response = await fetch('/hello');
                   const text = await response.text();
                   document.getElementById('response').innerHTML = text;
               } catch (error) {
                   document.getElementById('response').innerHTML = 'Error: ' + error.message;
               }
           }
       </script>
   </body>
   </html>
   ```

2. **Serve static files** (add to your Express.js server):
   ```javascript
   app.use(express.static('public'));
   ```

## Testing the Application

### 1. Accessing the /hello Endpoint

Once your server is running, you can test the `/hello` endpoint using various methods:

#### Using a Web Browser

1. **Open your web browser**
2. **Navigate to**: `http://localhost:3000/hello`
3. **Expected Response**: You should see "Hello world" displayed on the page

#### Using curl (Command Line)

```bash
# Basic GET request
curl http://localhost:3000/hello

# With verbose output
curl -v http://localhost:3000/hello

# With headers
curl -I http://localhost:3000/hello
```

**Expected Response**:
```
Hello world
```

**Expected Headers**:
```
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Content-Length: 11
Date: Wed, 01 Jan 2025 12:00:00 GMT
Connection: keep-alive
```

#### Using Postman

1. **Open Postman**
2. **Create a new request**:
   - Method: `GET`
   - URL: `http://localhost:3000/hello`
3. **Send the request**
4. **Verify the response**:
   - Status: `200 OK`
   - Body: `Hello world`

### 2. Running Automated Tests

The tutorial application includes basic tests to verify functionality:

```bash
# Navigate to the backend directory
cd src/backend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

**Expected Test Output**:
```
✓ Server starts successfully
✓ GET /hello returns "Hello world"
✓ GET /hello returns status 200
✓ GET /invalid-route returns 404

4 passing (125ms)
```

### 3. Testing Different Scenarios

#### Testing Invalid Routes

```bash
# Test non-existent endpoint
curl http://localhost:3000/invalid-route

# Expected: 404 Not Found
```

#### Testing HTTP Methods

```bash
# Test POST to /hello (should return 405 Method Not Allowed)
curl -X POST http://localhost:3000/hello

# Test PUT to /hello
curl -X PUT http://localhost:3000/hello
```

#### Testing Server Health

```bash
# Check if server is responding
curl -f http://localhost:3000/hello && echo "Server is healthy"
```

## Troubleshooting

### Common Issues and Solutions

#### Issue: Port 3000 Already in Use

**Error Message**:
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions**:
1. **Stop the conflicting process**:
   ```bash
   # Find process using port 3000
   lsof -i :3000
   # Kill the process
   kill -9 <PID>
   ```

2. **Change the port**:
   ```bash
   # Set different port in .env file
   PORT=3001
   
   # Or set environment variable
   PORT=3001 npm start
   ```

3. **Windows-specific**:
   ```cmd
   # Find process using port 3000
   netstat -ano | findstr :3000
   # Kill the process
   taskkill /PID <PID> /F
   ```

#### Issue: Node.js Version Too Low

**Error Message**:
```
Error: This application requires Node.js version 22.x or higher
```

**Solution**:
1. **Check current version**:
   ```bash
   node --version
   ```

2. **Update Node.js**:
   - Download and install Node.js 22.x LTS from [nodejs.org](https://nodejs.org/)
   - Or use a version manager like nvm

3. **Using nvm (Node Version Manager)**:
   ```bash
   # Install nvm (macOS/Linux)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   
   # Install and use Node.js 22
   nvm install 22
   nvm use 22
   ```

#### Issue: Missing Dependencies

**Error Message**:
```
Error: Cannot find module 'express'
```

**Solution**:
```bash
# Install missing dependencies
npm install

# Or install Express.js specifically
npm install express@5.1.0

# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Permission Errors (macOS/Linux)

**Error Message**:
```
Error: EACCES: permission denied
```

**Solution**:
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm

# Or use a Node version manager (recommended)
# Install nvm and use it to manage Node.js versions
```

#### Issue: Cannot Connect to localhost

**Error Message**:
```
This site can't be reached
```

**Solutions**:
1. **Check if server is running**:
   ```bash
   ps aux | grep node
   ```

2. **Verify port binding**:
   ```bash
   netstat -tuln | grep 3000
   ```

3. **Check firewall settings**:
   - Ensure localhost connections are allowed
   - Temporarily disable firewall to test

4. **Try different browsers or tools**:
   ```bash
   # Test with curl
   curl http://localhost:3000/hello
   
   # Test with different IP
   curl http://127.0.0.1:3000/hello
   ```

### Security Dependency Audit

Regularly check for security vulnerabilities:

```bash
# Run security audit
npm audit

# Fix vulnerabilities automatically
npm audit fix

# View detailed audit report
npm audit --audit-level high
```

### Performance Monitoring

Monitor application performance during development:

```bash
# Check memory usage
node --max-old-space-size=4096 server.js

# Monitor with built-in profiler
node --prof server.js

# Use clinic.js for detailed monitoring
npm install -g clinic
clinic doctor -- node server.js
```

## Additional Resources

### Official Documentation

- **Node.js Official Documentation**: [nodejs.org/docs](https://nodejs.org/docs/)
- **Express.js 5.x Documentation**: [expressjs.com](https://expressjs.com/)
- **npm Documentation**: [docs.npmjs.com](https://docs.npmjs.com/)

### Tutorial Resources

- **Node.js Getting Started Guide**: [nodejs.org/en/learn/getting-started](https://nodejs.org/en/learn/getting-started)
- **Express.js Tutorial**: [expressjs.com/en/starter/installing.html](https://expressjs.com/en/starter/installing.html)
- **MDN Web Docs - HTTP**: [developer.mozilla.org/en-US/docs/Web/HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)

### Development Tools

- **Visual Studio Code**: [code.visualstudio.com](https://code.visualstudio.com/)
- **Node.js Extension for VS Code**: [marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)
- **Postman**: [postman.com](https://www.postman.com/)

### Community Resources

- **Node.js Community**: [nodejs.org/community](https://nodejs.org/community/)
- **Express.js Community**: [expressjs.com/resources/community.html](https://expressjs.com/resources/community.html)
- **Stack Overflow**: [stackoverflow.com/questions/tagged/node.js](https://stackoverflow.com/questions/tagged/node.js)

### Advanced Topics

Once you've mastered the basics, explore these advanced topics:

- **Authentication and Authorization**: JWT, Passport.js
- **Database Integration**: MongoDB, PostgreSQL
- **API Design**: REST, GraphQL
- **Testing**: Jest, Mocha, Supertest
- **Deployment**: Docker, Heroku, AWS

## Next Steps

After successfully setting up and running the tutorial application:

1. **Experiment with the code**: Modify the response message or add new endpoints
2. **Add error handling**: Implement proper error handling middleware
3. **Explore middleware**: Add logging, CORS, or security middleware
4. **Learn about routing**: Create multiple endpoints and organize routes
5. **Add persistence**: Integrate with a database for dynamic content
6. **Implement testing**: Write comprehensive tests for your application
7. **Deploy your application**: Learn about production deployment strategies

## Support

If you encounter issues not covered in this guide:

1. **Check the project README**: [README.md](../README.md)
2. **Review the API documentation**: [docs/api.md](./api.md)
3. **Search existing issues**: Check the project's issue tracker
4. **Create a new issue**: Provide detailed information about your problem

---

**Note**: This tutorial application is designed for educational purposes and local development. For production applications, additional security, performance, and deployment considerations are required.

**Version**: This guide is compatible with Node.js 22.x LTS and Express.js 5.1.0.

**Last Updated**: January 2025