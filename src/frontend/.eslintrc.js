// ESLint configuration for React frontend application
// This configuration enforces code quality, consistency, and best practices
// for a modern React project using JavaScript (ES2022+) with JSX support

module.exports = {
  // Environment configuration - defines global variables available
  env: {
    browser: true,    // Browser global variables (window, document, etc.)
    es2022: true,     // ES2022 globals and syntax support
    jest: true,       // Jest testing environment globals
    node: false,      // Disable Node.js globals for frontend code
  },

  // Extends configuration from popular rule sets
  extends: [
    'eslint:recommended',                    // ESLint core recommended rules
    'plugin:react/recommended',              // React-specific linting rules
    'plugin:react-hooks/recommended',        // React Hooks rules of hooks
    'plugin:jsx-a11y/recommended',           // JSX accessibility rules
    'plugin:prettier/recommended',           // Prettier integration (must be last)
  ],

  // Plugins provide additional rules and functionality
  plugins: [
    'react',          // React-specific linting rules
    'react-hooks',    // React hooks linting rules
    'jsx-a11y',       // JSX accessibility linting
    'prettier',       // Prettier formatting integration
  ],

  // Parser options for modern JavaScript and JSX
  parserOptions: {
    ecmaVersion: 2022,      // Use ES2022 syntax features
    sourceType: 'module',   // Use ES modules (import/export)
    ecmaFeatures: {
      jsx: true,            // Enable JSX parsing
    },
  },

  // Custom rule configurations
  rules: {
    // Prettier integration - enforce formatting rules
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,      // Use single quotes
        trailingComma: 'all',   // Trailing commas where valid
        printWidth: 80,         // Line length limit
        tabWidth: 2,            // Indentation width
        semi: true,             // Always use semicolons
      },
    ],

    // React-specific rules
    'react/prop-types': 'off',              // Disable prop-types (using TypeScript or not needed)
    'react/react-in-jsx-scope': 'off',      // Not needed with React 17+ JSX transform
    'react/jsx-uses-react': 'off',          // Not needed with React 17+ JSX transform
    'react/jsx-uses-vars': 'error',         // Prevent variables used in JSX from being marked as unused

    // JavaScript best practices
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',              // Check all variables
        args: 'after-used',       // Check arguments after used ones
        ignoreRestSiblings: false, // Don't ignore rest siblings
      },
    ],

    // Console usage - allow warnings and errors, warn on general console.log
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],   // Allow console.warn and console.error
      },
    ],

    // JSX accessibility rules
    'jsx-a11y/anchor-is-valid': 'warn',    // Warn about invalid anchor usage
  },

  // Settings for plugins
  settings: {
    react: {
      version: 'detect',    // Automatically detect React version
    },
  },

  // Global variables available in all files
  globals: {
    React: 'readonly',      // React global variable (for JSX without import)
  },
};