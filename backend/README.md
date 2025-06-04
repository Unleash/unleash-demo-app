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

# Build the TypeScript code
yarn build

# Start production server
yarn start

# Test the AI chat API
yarn test-chat
```

## API Endpoints

- `GET /api/info` - Returns information about the backend service including name, version, timestamp, and environment
- `POST /api/chat` - AI-powered chat endpoint that answers questions about user expenses
  - Request body: `{ "message": "your question here" }`
  - Response: `{ "response": "AI response", "variant": "basic|advanced" }`
  - Supports questions about total expenses, expense categories, highest expenses, and spending patterns (advanced variant only)

## Configuration

The server can be configured using the following environment variables:

- `PORT` - The port on which the server will listen (default: 3000)
- `NODE_ENV` - The environment in which the server is running (default: 'development')
- `UNLEASH_URL` - The URL of the Unleash server (default: 'https://app.unleash-hosted.com/demo/api/')
- `UNLEASH_API_KEY` - The API key for the Unleash server (default: 'default:development.unleash-insecure-api-token')

## Feature Flags

The application uses the following feature flags:

- `ai-chat-variant` - Controls which variant of the AI chat to use:
  - When enabled: Uses the advanced AI chat with detailed expense analysis
  - When disabled: Uses the basic AI chat with simple expense information

## File Structure

- `src/index.ts` - Main entry point for the Express application
- `dist/` - Compiled JavaScript files (generated after build)

## Static Content

The server serves static content from the frontend build directory (`../../dist`). This allows the backend to serve the frontend application in production environments.
