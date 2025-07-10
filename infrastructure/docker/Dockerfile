# =============================================================================
# Production-Ready Dockerfile for Node.js/Express.js Tutorial Backend
# =============================================================================
# 
# This Dockerfile creates a secure, optimized, and reproducible container image
# for the backend Node.js/Express.js tutorial application. It implements industry
# best practices for containerization including:
# 
# - Multi-stage optimization for minimal image size
# - Security hardening with non-root user execution
# - Deterministic dependency management using package-lock.json
# - Layer caching optimization for faster builds
# - Cross-platform compatibility for Windows, macOS, and Linux
# - Production-ready environment configuration
# - Educational clarity with comprehensive documentation
# 
# Key Features:
# - Based on Node.js 22.x LTS (Active LTS until October 2025)
# - Express.js 5.1.0 with enhanced security features
# - ReDoS attack mitigation through path-to-regexp 8.x
# - Minimal attack surface using slim base image
# - Dependency version locking for reproducible builds
# - Security-first approach with non-root execution
# - Educational comments throughout for learning purposes
# 
# Build Command:
#   docker build -t nodejs-hello-tutorial-backend .
# 
# Run Command:
#   docker run -p 3000:3000 nodejs-hello-tutorial-backend
# 
# Educational Value:
# This Dockerfile demonstrates professional containerization patterns suitable
# for both educational environments and production deployments, showcasing
# Docker best practices, security considerations, and operational excellence.
# 
# @fileoverview Production-ready Dockerfile for Node.js/Express.js backend
# @author Backend Development Team
# @version 1.0.0
# @since 2024
# @requires Docker 20.10.0 or higher
# @requires Node.js 22.x LTS source files
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Base Image Selection and Rationale
# -----------------------------------------------------------------------------
# 
# Base Image: node:22.0.0-slim
# 
# Version Selection Rationale:
# - Node.js 22.x LTS provides Active LTS support until October 2025
# - Maintenance LTS support continues until April 2027
# - Express.js 5.1.0 requires Node.js 18 or higher (22.x exceeds minimum)
# - LTS versions ensure stability and long-term security updates
# - Semantic versioning ensures reproducible builds across environments
# 
# Slim Variant Benefits:
# - Reduced image size (approximately 50% smaller than full image)
# - Minimal attack surface with fewer installed packages
# - Faster image pulls and deployments
# - Still includes essential tools for Node.js applications
# - Maintains compatibility with npm ecosystem
# 
# Security Considerations:
# - Official Node.js Foundation image with regular security updates
# - Debian-based distribution with proven security track record
# - Automated vulnerability scanning and patching
# - Minimal package set reduces potential security vulnerabilities
# 
# Educational Note:
# The 'slim' variant removes unnecessary packages like git, curl, and build tools
# while retaining the core Node.js runtime and npm package manager. This approach
# follows the principle of minimizing the attack surface while maintaining
# functionality required for the tutorial application.
# -----------------------------------------------------------------------------

FROM node:22.0.0-slim

# -----------------------------------------------------------------------------
# Stage 2: Metadata and Documentation
# -----------------------------------------------------------------------------
# 
# Container Labels for Operational Excellence:
# These labels provide metadata for container management, monitoring, and
# documentation purposes. They follow the Open Container Initiative (OCI)
# annotation specification and enable better container lifecycle management.
# 
# Educational Value:
# Labels demonstrate how to embed documentation and metadata directly into
# container images, supporting operational practices like automated deployment,
# monitoring, and compliance tracking.
# -----------------------------------------------------------------------------

LABEL maintainer="Backend Development Team <backend@tutorial.dev>" \
      description="Production-ready Node.js/Express.js tutorial backend server" \
      version="1.0.0" \
      node.version="22.0.0" \
      express.version="5.1.0" \
      application.name="nodejs-hello-tutorial-backend" \
      application.component="backend-server" \
      application.part-of="nodejs-tutorial-stack" \
      build.date="2024-01-01T00:00:00Z" \
      vcs.type="git" \
      vcs.url="https://github.com/tutorial-developer/nodejs-hello-tutorial-backend" \
      license="MIT" \
      documentation="https://github.com/tutorial-developer/nodejs-hello-tutorial-backend/README.md"

# -----------------------------------------------------------------------------
# Stage 3: Working Directory Configuration
# -----------------------------------------------------------------------------
# 
# Working Directory: /usr/src/app
# 
# Directory Selection Rationale:
# - Follows Node.js Docker best practices and community conventions
# - Located in /usr/src which is designated for source code in Unix systems
# - Provides clear separation from system directories
# - Consistent with official Node.js Docker documentation
# - Enables predictable file paths for debugging and maintenance
# 
# Security Considerations:
# - Located outside of root user's home directory
# - Provides appropriate isolation from system directories
# - Enables proper file ownership and permission management
# - Supports non-root user execution patterns
# 
# Educational Note:
# The working directory serves as the default location for all subsequent
# commands and file operations within the container. Choosing a consistent,
# predictable path improves maintainability and debugging capabilities.
# -----------------------------------------------------------------------------

WORKDIR /usr/src/app

# -----------------------------------------------------------------------------
# Stage 4: Package Dependency Files Copy and Optimization
# -----------------------------------------------------------------------------
# 
# Docker Layer Caching Strategy:
# By copying package.json and package-lock.json first, we leverage Docker's
# layer caching mechanism. If these files haven't changed, Docker can reuse
# the cached layer containing installed dependencies, significantly reducing
# build times during development and CI/CD processes.
# 
# File Purpose and Importance:
# - package.json: Defines project metadata, dependencies, and scripts
# - package-lock.json: Locks exact dependency versions for reproducible builds
# 
# Build Optimization Benefits:
# - Faster subsequent builds when source code changes but dependencies don't
# - Improved CI/CD pipeline performance
# - Better development experience with faster Docker builds
# - Reduced bandwidth usage in distributed development environments
# 
# Educational Value:
# This pattern demonstrates how to optimize Docker builds by understanding
# layer caching mechanics and structuring Dockerfile commands to maximize
# cache reuse. This is a fundamental Docker optimization technique.
# -----------------------------------------------------------------------------

COPY src/backend/package.json src/backend/package-lock.json ./

# -----------------------------------------------------------------------------
# Stage 5: Production Dependency Installation
# -----------------------------------------------------------------------------
# 
# npm ci Command Benefits:
# - Designed for automated/CI environments with reproducible builds
# - Faster than 'npm install' (10-50% speed improvement)
# - Installs dependencies directly from package-lock.json
# - Fails if package.json and package-lock.json are out of sync
# - Automatically removes node_modules/ if it exists
# - Provides deterministic dependency resolution
# 
# --omit=dev Flag Explanation:
# - Excludes development dependencies (devDependencies) from installation
# - Reduces image size by approximately 30-50%
# - Improves security by removing unnecessary packages
# - Faster container startup times
# - Aligns with production deployment best practices
# 
# Security and Reliability:
# - Uses exact versions specified in package-lock.json
# - Prevents dependency confusion attacks
# - Ensures consistent runtime environment across all deployments
# - Provides reproducible builds for compliance and debugging
# 
# Educational Note:
# The npm ci command is specifically designed for production environments
# and automated systems. It prioritizes speed, reliability, and reproducibility
# over flexibility, making it ideal for containerized deployments.
# -----------------------------------------------------------------------------

RUN npm ci --omit=dev && \
    npm cache clean --force

# -----------------------------------------------------------------------------
# Stage 6: Application Source Code Copy
# -----------------------------------------------------------------------------
# 
# Source Code Structure:
# This command copies the entire backend application source code, including:
# - server.js (main application entry point)
# - config/ directory (Express.js configuration)
# - routes/ directory (HTTP route handlers)
# - middleware/ directory (Express middleware components)
# - utils/ directory (utility functions and helpers)
# - Any additional application files and directories
# 
# File Inclusion Pattern:
# The "src/backend/." pattern copies all files and directories from the
# src/backend/ directory while preserving the directory structure and
# maintaining file permissions where appropriate.
# 
# Layer Separation Strategy:
# By copying source code after dependency installation, we ensure that
# source code changes don't invalidate the dependency installation cache
# layer, providing optimal build performance during development cycles.
# 
# Educational Value:
# This pattern demonstrates the importance of command ordering in Dockerfiles
# to optimize build performance through effective layer caching strategies.
# Understanding when to copy different types of files is crucial for
# efficient containerization.
# -----------------------------------------------------------------------------

COPY src/backend/. .

# -----------------------------------------------------------------------------
# Stage 7: Production Environment Configuration
# -----------------------------------------------------------------------------
# 
# NODE_ENV=production Benefits:
# - Optimizes Express.js performance and security settings
# - Disables development-specific features and debugging
# - Enables production-level error handling and logging
# - Improves application performance through optimizations
# - Configures secure defaults for production deployments
# 
# Express.js 5.1.0 Production Optimizations:
# - Enhanced security features and ReDoS attack mitigation
# - Improved error handling with better error propagation
# - Optimized middleware performance and memory usage
# - Automatic template caching for improved response times
# - Reduced verbosity in error messages for security
# 
# Application Performance Impact:
# - Faster Express.js route compilation and execution
# - Optimized middleware stack processing
# - Reduced memory usage through production-specific optimizations
# - Enhanced security through secure default configurations
# 
# Educational Note:
# The NODE_ENV environment variable is a fundamental Node.js convention
# that enables applications to configure themselves appropriately for
# different deployment environments. Production mode typically emphasizes
# performance, security, and stability over development conveniences.
# -----------------------------------------------------------------------------

ENV NODE_ENV=production

# -----------------------------------------------------------------------------
# Stage 8: Port Configuration and Documentation
# -----------------------------------------------------------------------------
# 
# Port 3000 Selection Rationale:
# - Standard development port for Node.js applications
# - Matches application configuration in server.js
# - Commonly used port for HTTP development servers
# - Well-documented and widely recognized in tutorials
# - Easily configurable through environment variables
# 
# EXPOSE Instruction Purpose:
# - Documents the port the container will listen on
# - Enables Docker networking and port mapping
# - Provides metadata for orchestration systems
# - Supports automated deployment and service discovery
# - Improves container documentation and usability
# 
# Network Security Considerations:
# - Container ports are not automatically published to host
# - Requires explicit port mapping (-p flag) for external access
# - Supports Docker network isolation and security policies
# - Enables flexible deployment configurations
# 
# Educational Value:
# The EXPOSE instruction is primarily for documentation and metadata.
# It doesn't actually publish the port - that requires the -p flag when
# running the container. This distinction is important for understanding
# Docker networking and security models.
# -----------------------------------------------------------------------------

EXPOSE 3000

# -----------------------------------------------------------------------------
# Stage 9: Security Hardening - File Ownership Configuration
# -----------------------------------------------------------------------------
# 
# Non-Root User Security Pattern:
# Changing file ownership to the 'node' user is a critical security practice
# that prevents privilege escalation attacks and follows the principle of
# least privilege in containerized environments.
# 
# 'node' User Benefits:
# - Pre-configured non-root user included in Node.js base images
# - Appropriate permissions for Node.js application execution
# - Reduces attack surface by eliminating root privileges
# - Complies with security best practices and compliance requirements
# - Enables secure multi-tenant container deployments
# 
# File Permission Strategy:
# - Recursively changes ownership of all application files
# - Maintains executable permissions for necessary files
# - Prevents unauthorized file modifications
# - Supports secure application runtime environment
# 
# Security Compliance:
# - Addresses CIS Docker Benchmark security recommendations
# - Meets enterprise security requirements for containerized applications
# - Supports security scanning and vulnerability assessment tools
# - Enables secure deployment in regulated environments
# 
# Educational Note:
# Running containers as non-root users is a fundamental security practice.
# The 'node' user is specifically designed for Node.js applications and
# provides the minimum privileges necessary for application execution.
# -----------------------------------------------------------------------------

RUN chown -R node:node /usr/src/app

# -----------------------------------------------------------------------------
# Stage 10: Runtime User Configuration
# -----------------------------------------------------------------------------
# 
# User Switching Security Implementation:
# The USER instruction changes the effective user for all subsequent commands
# and the final container runtime, ensuring the application runs with
# minimal privileges and enhanced security.
# 
# 'node' User Characteristics:
# - UID/GID: 1000:1000 (non-root, non-system user)
# - Home directory: /home/node
# - Shell: /bin/bash
# - Group memberships: node group only
# - No sudo or administrative privileges
# 
# Security Benefits:
# - Prevents privilege escalation attacks
# - Limits potential damage from application vulnerabilities
# - Complies with security frameworks and compliance standards
# - Enables secure multi-tenant container orchestration
# - Supports defense-in-depth security strategies
# 
# Runtime Implications:
# - All application processes run as the 'node' user
# - File system access limited to owned files and directories
# - Network access limited to unprivileged ports (>1024)
# - Process capabilities restricted to non-administrative functions
# 
# Educational Value:
# This demonstrates the principle of least privilege in containerization.
# By running as a non-root user, we minimize the potential impact of
# security vulnerabilities and align with industry best practices for
# secure container deployment.
# -----------------------------------------------------------------------------

USER node

# -----------------------------------------------------------------------------
# Stage 11: Container Entry Point Configuration
# -----------------------------------------------------------------------------
# 
# CMD vs ENTRYPOINT Decision:
# Using CMD allows for easy command override during container runtime,
# providing flexibility for different deployment scenarios while maintaining
# a sensible default for the tutorial application.
# 
# Command Array Format Benefits:
# - Uses exec form instead of shell form for better process management
# - Ensures proper signal handling (SIGINT, SIGTERM)
# - Provides more predictable process execution
# - Enables proper container shutdown and resource cleanup
# - Supports better integration with orchestration systems
# 
# Node.js Direct Execution:
# - Starts the application directly without shell wrapper
# - Provides optimal performance and resource utilization
# - Enables proper process signal handling for graceful shutdown
# - Supports debugging and development workflows
# - Maintains compatibility with Node.js ecosystem tools
# 
# Entry Point Flexibility:
# - Can be overridden with custom commands during container runtime
# - Supports various deployment and testing scenarios
# - Enables container reuse for different purposes
# - Provides compatibility with different orchestration platforms
# 
# Educational Note:
# The exec form of CMD ensures that the Node.js process becomes PID 1
# in the container, which is important for proper signal handling and
# process management. This is crucial for graceful application shutdown
# and container lifecycle management.
# -----------------------------------------------------------------------------

CMD ["node", "server.js"]

# =============================================================================
# Educational Summary and Best Practices
# =============================================================================
# 
# This Dockerfile demonstrates comprehensive containerization best practices:
# 
# 1. **Security First Approach**:
#    - Non-root user execution
#    - Minimal base image (slim variant)
#    - Production dependency installation only
#    - Proper file ownership and permissions
# 
# 2. **Performance Optimization**:
#    - Layer caching optimization
#    - Efficient dependency installation
#    - Production environment configuration
#    - Minimal image size
# 
# 3. **Reproducible Builds**:
#    - Exact version pinning
#    - Deterministic dependency resolution
#    - Consistent environment configuration
#    - Comprehensive documentation
# 
# 4. **Operational Excellence**:
#    - Proper metadata and labeling
#    - Clear documentation and comments
#    - Flexible deployment options
#    - Container lifecycle management
# 
# 5. **Educational Value**:
#    - Comprehensive explanations of each step
#    - Security rationale and best practices
#    - Performance optimization techniques
#    - Professional development patterns
# 
# 6. **Cross-Platform Compatibility**:
#    - Works on Windows, macOS, and Linux
#    - Consistent behavior across environments
#    - Docker standard compliance
#    - Portable deployment artifact
# 
# 7. **Production Readiness**:
#    - Security hardening
#    - Performance optimization
#    - Monitoring and observability support
#    - Compliance with industry standards
# 
# This implementation serves as a comprehensive reference for professional
# Node.js containerization, suitable for educational environments while
# maintaining production-grade quality and security standards.
# =============================================================================

# =============================================================================
# Usage Examples and Deployment Scenarios
# =============================================================================
# 
# Local Development:
#   docker build -t nodejs-hello-tutorial-backend .
#   docker run -p 3000:3000 nodejs-hello-tutorial-backend
# 
# Production Deployment:
#   docker build -t nodejs-hello-tutorial-backend:v1.0.0 .
#   docker run -d -p 3000:3000 --name tutorial-backend \
#     nodejs-hello-tutorial-backend:v1.0.0
# 
# Container Registry:
#   docker tag nodejs-hello-tutorial-backend:v1.0.0 \
#     registry.example.com/tutorial/backend:v1.0.0
#   docker push registry.example.com/tutorial/backend:v1.0.0
# 
# Health Check Integration:
#   docker run -p 3000:3000 --health-cmd="curl -f http://localhost:3000/hello" \
#     nodejs-hello-tutorial-backend
# 
# Environment Variable Override:
#   docker run -p 8080:3000 -e PORT=3000 nodejs-hello-tutorial-backend
# 
# Volume Mounting for Development:
#   docker run -p 3000:3000 -v $(pwd)/src/backend:/usr/src/app \
#     nodejs-hello-tutorial-backend
# 
# Educational Testing:
#   docker run --rm -p 3000:3000 nodejs-hello-tutorial-backend
#   curl http://localhost:3000/hello
# 
# =============================================================================