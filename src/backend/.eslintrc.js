/**
 * ESLint Configuration for Backend Node.js/Express.js Tutorial Application
 * 
 * This configuration file defines linting rules, environments, parser options, and plugins
 * to enforce code quality, style consistency, and best practices for the backend codebase.
 * 
 * Designed for:
 * - Node.js 22.x LTS (Active LTS until October 2025)
 * - Express.js 5.1.0 (Latest stable with security improvements)
 * - ES2022+ syntax support
 * - CommonJS module system
 * - Educational clarity and maintainability
 * 
 * Security Features:
 * - Includes security-related linting rules to prevent common vulnerabilities
 * - Utilizes ESLint plugins specifically designed for Node.js/Express.js applications
 * - Prevents common Node.js/Express.js pitfalls and enforces best practices
 * 
 * Dependencies:
 * - eslint ^8.0.0 - Core linting engine for JavaScript code quality
 * - eslint-plugin-node ^11.1.0 - Node.js-specific linting rules
 * - eslint-plugin-promise ^6.1.1 - Promise best practices enforcement
 * - eslint-plugin-security ^1.7.1 - Security vulnerability detection
 */

module.exports = {
  // Environment Configuration
  // Defines global variables that are predefined for specific environments
  env: {
    // Node.js global variables and Node.js scoping
    node: true,
    // ES2022 globals and syntax support
    es2022: true,
    // Jest testing framework globals (describe, test, expect, etc.)
    jest: true
  },

  // Extended Configurations
  // Inherits rules from popular ESLint configuration presets
  extends: [
    // ESLint's recommended rules for general JavaScript best practices
    'eslint:recommended',
    // Node.js-specific recommended rules and best practices
    'plugin:node/recommended',
    // Promise handling best practices for async/await patterns
    'plugin:promise/recommended',
    // Security-focused rules to prevent common vulnerabilities
    'plugin:security/recommended'
  ],

  // Plugin Configuration
  // Adds additional linting capabilities beyond core ESLint
  plugins: [
    // Node.js-specific linting rules and environment handling
    'node',
    // Promise and async/await best practices enforcement
    'promise',
    // Security vulnerability detection and prevention
    'security'
  ],

  // Parser Options
  // Configures how ESLint parses JavaScript code
  parserOptions: {
    // ES2022 language features support (class fields, top-level await, etc.)
    ecmaVersion: 2022,
    // 'script' for CommonJS modules (require/module.exports)
    // 'module' would be used for ES6 modules (import/export)
    sourceType: 'script'
  },

  // Custom Rule Configuration
  // Overrides default rules to match project-specific requirements
  rules: {
    // Console Usage
    // Allow console.log/warn/error for educational/debugging purposes
    'no-console': 'off',

    // Variable Usage
    // Warn on unused variables but allow after-used parameters
    'no-unused-vars': ['warn', {
      // Allow unused function parameters after the last used parameter
      args: 'after-used',
      // Allow unused variables in object destructuring rest properties
      ignoreRestSiblings: true
    }],

    // Undefined Variables
    // Error on use of undefined variables to prevent typos
    'no-undef': 'error',

    // Node.js Specific Rules
    // Allow modern ES syntax while maintaining Node.js compatibility
    'node/no-unsupported-features/es-syntax': ['error', {
      // Allow ES6 module syntax for educational purposes
      ignores: ['modules']
    }],

    // Disable strict import checking for tutorial flexibility
    'node/no-missing-import': 'off',

    // Allow dev dependencies in tutorial context
    'node/no-unpublished-require': 'off',

    // Promise Handling Rules
    // Disable strict promise return requirement for educational flexibility
    'promise/always-return': 'off',

    // Warn on promises that don't have catch or return
    'promise/catch-or-return': 'warn',

    // Security Rules
    // Disable object injection detection for tutorial simplicity
    // Note: In production, consider enabling this rule
    'security/detect-object-injection': 'off'
  },

  // Override Configuration
  // Specific rules for different file patterns
  overrides: [
    {
      // Test Files Configuration
      files: ['test/**/*.js', 'test/**/*.ts'],
      env: {
        // Jest testing environment
        jest: true,
        // Node.js environment for test utilities
        node: true
      },
      rules: {
        // Allow unused expressions in test files (for assertion libraries)
        'no-unused-expressions': 'off'
      }
    }
  ],

  // Settings Configuration
  // Additional configuration for plugins and tools
  settings: {
    // Node.js Plugin Settings
    node: {
      // File extensions to try when resolving modules
      tryExtensions: ['.js', '.json', '.node']
    }
  }
};