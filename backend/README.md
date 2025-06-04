# Unleash Demo App Backend

This is the backend service for the Unleash Demo App. It's built with Express and TypeScript, and serves both the static frontend files and provides API endpoints.

## Setup

```bash
# Install dependencies
yarn
```

## Available Scripts

```bash
# Start development server with hot-reload
yarn dev

# Start production server
yarn start
```

## API Endpoints

- `GET /api/info` - Returns information about the backend service including name, version, timestamp, and environment

## Configuration

The server can be configured using the following environment variables:

- `PORT` - The port on which the server will listen (default: 3000)
- `NODE_ENV` - The environment in which the server is running (default: 'development')

## File Structure

- `src/index.ts` - Main entry point for the Express application
- `dist/` - Compiled JavaScript files (generated after build)

## Static Content

The server serves static content from the frontend build directory (`../../dist`). This allows the backend to serve the frontend application in production environments.
