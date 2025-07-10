# Frontend Directory

## Project Overview

**⚠️ Important Notice: This frontend directory is NOT required for the core Node.js tutorial.**

This directory contains optional frontend code that supplements the main Node.js backend tutorial. The primary educational focus of this project is on backend development with Node.js 22.x LTS and Express.js 5.1.0. The frontend components are provided for completeness and demonstration purposes but are not essential for understanding the core HTTP server concepts taught in the tutorial.

The main tutorial demonstrates a simple HTTP server with a single `/hello` endpoint that returns "Hello world" to HTTP clients. The backend tutorial is completely self-contained and can be completed without any frontend interaction.

## Getting Started

### Prerequisites

- Node.js 22.x LTS (Active LTS until October 2025, Maintenance until April 2027)
- npm 11.4.2 or higher

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd src/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Run tests:**
   ```bash
   npm test
   ```

### Environment Setup

The frontend development environment requires:
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)
- Terminal/Command Line access

## Project Structure

```
src/frontend/
├── public/                 # Static assets
│   ├── index.html         # Main HTML entry point
│   └── favicon.ico        # Application icon
├── src/                   # Source code
│   ├── components/        # React/Vue components (if applicable)
│   ├── services/          # API service modules
│   │   └── api.js        # Backend API integration
│   ├── styles/           # CSS/SCSS stylesheets
│   ├── utils/            # Utility functions
│   └── index.js          # Main application entry
├── tests/                # Test files
│   └── api.test.js       # API integration tests
├── package.json          # Project dependencies and scripts
├── .eslintrc.js          # ESLint configuration
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## Development Notes

### Code Style and Formatting

- **ESLint Configuration**: Project uses ESLint for code quality enforcement
- **Prettier Integration**: Automatic code formatting on save
- **TypeScript Support**: TypeScript configuration available in `tsconfig.json`

### Development Standards

- Follow ES6+ JavaScript standards
- Use semantic HTML5 elements
- Implement responsive design principles
- Maintain accessibility standards (WCAG 2.1)

### Configuration Files

- **`.eslintrc.js`**: Linting rules and code quality standards
- **`tsconfig.json`**: TypeScript compiler configuration (if using TypeScript)
- **`package.json`**: Project metadata, dependencies, and npm scripts

## API Integration

### Backend Communication

The frontend communicates with the Node.js backend through HTTP requests:

```javascript
// Example: src/services/api.js
const API_BASE_URL = 'http://localhost:3000';

export const fetchHelloMessage = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/hello`);
    const message = await response.text();
    return message;
  } catch (error) {
    console.error('Error fetching hello message:', error);
    throw error;
  }
};
```

### API Endpoints

The backend provides the following endpoints:

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/hello` | Returns greeting message | `"Hello world"` (text/plain) |

### Error Handling

- **Network Errors**: Implement proper error boundaries and fallback UI
- **HTTP Status Codes**: Handle 404, 500, and other error responses
- **Loading States**: Show appropriate loading indicators during API calls

## Testing

### Test Framework

The project uses Jest for testing with the following test types:

- **Unit Tests**: Component and function testing
- **Integration Tests**: API communication testing
- **E2E Tests**: User workflow testing (if applicable)

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- api.test.js
```

### Test Files Location

- **Unit Tests**: `tests/unit/`
- **Integration Tests**: `tests/integration/`
- **API Tests**: `tests/api.test.js`

## Contributing

### Development Workflow

1. **Fork the repository** and create a feature branch
2. **Follow coding standards** defined in `.eslintrc.js`
3. **Write tests** for new functionality
4. **Run the test suite** to ensure all tests pass
5. **Submit a pull request** with a clear description

### Code Review Process

- All changes require peer review
- Tests must pass before merging
- Code must follow established style guidelines
- Documentation must be updated for new features

### Issue Reporting

- Use GitHub Issues for bug reports and feature requests
- Provide clear reproduction steps for bugs
- Include environment information (Node.js version, OS, browser)

## Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

**Dependency Issues:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build Failures:**
```bash
# Check Node.js version
node --version  # Should be 22.x LTS

# Verify npm version
npm --version   # Should be 11.4.2+
```

### Backend Connection Issues

1. **Ensure backend server is running** on `localhost:3000`
2. **Check CORS configuration** if cross-origin requests fail
3. **Verify API endpoint availability** using curl or browser

### Development Server Issues

- **Clear browser cache** if changes don't appear
- **Check console errors** in browser developer tools
- **Verify file permissions** for project directories

## Backend Integration Guide

### Running Both Frontend and Backend

1. **Start the backend server** (from project root):
   ```bash
   node server.js
   ```

2. **Start the frontend development server** (from src/frontend):
   ```bash
   npm start
   ```

3. **Access the application**:
   - Backend API: `http://localhost:3000`
   - Frontend UI: `http://localhost:3001` (or configured port)

### API Documentation

For complete API documentation, refer to the **backend README** in the project root. The backend provides:

- **Simple HTTP endpoint**: `/hello` returning "Hello world"
- **Express.js 5.1.0 framework**: Latest stable version with security enhancements
- **Node.js 22.x LTS runtime**: Long-term support version for stability

## License

This frontend code is distributed under the same license as the main project (MIT License). See the `LICENSE` file in the project root for complete license information.

---

**📝 Remember**: This frontend directory is supplementary to the main Node.js backend tutorial. Focus on the backend concepts first, then explore the frontend integration as an optional enhancement to your learning experience.

For backend-specific instructions and the core tutorial content, please refer to the main README.md in the project root directory.