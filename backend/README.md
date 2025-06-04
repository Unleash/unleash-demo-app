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

# Test the metrics collection
yarn test-metrics
```

## API Endpoints

- `GET /api/info` - Returns information about the backend service including name, version, timestamp, and environment
- `POST /api/chat` - AI-powered chat endpoint that answers questions about user expenses
  - Request body: `{ "message": "your question here" }`
  - Response: `{ "response": "AI response", "variant": "basic|advanced", "executionTimeMs": 123, "costInDollars": 0.02 }`
  - Supports questions about total expenses, expense categories, highest expenses, and spending patterns (advanced variant only)
- `GET /api/flag/variant` - Returns the current variant of the 'fsDemoApp.chatbot' feature flag
- `GET /metrics` - Prometheus metrics endpoint for monitoring chat performance and costs

## Metrics

The backend collects the following metrics for chat queries:

- `chat_execution_time_seconds` - Execution time of chat queries in seconds (Histogram)
  - Buckets optimized for basic variant (0.3-0.7s) and advanced variant (1.5-2.5s)
- `chat_total_cost_dollars` - Total accumulated cost of chat queries in dollars (Counter)
- `chat_cost_per_call_dollars` - Cost per individual chat query in dollars (Histogram)
  - Buckets optimized for basic variant ($0.1) and advanced variant ($0.2)
- `chat_call_count_total` - Total number of chat calls (Counter)

These metrics are available at the `/metrics` endpoint and can be scraped by Prometheus for monitoring and alerting.

## Configuration

The server can be configured using the following environment variables:

- `PORT` - The port on which the server will listen (default: 3000)
- `NODE_ENV` - The environment in which the server is running (default: 'development')
- `UNLEASH_URL` - The URL of the Unleash server (default: 'https://app.unleash-hosted.com/demo/api/')
- `UNLEASH_API_KEY` - The API key for the Unleash server (default: 'unleash-fullstack-demo-app:production.7d1f7105647713d79ee78dee96463f10ab990081f7ac22cf1066feec')
- `VITE_UNLEASH_FRONTEND_API_URL` - The URL of the Unleash frontend API (default: 'https://app.unleash-hosted.com/demo/api/frontend')
- `VITE_UNLEASH_FRONTEND_API_KEY` - The API key for the Unleash frontend API (default: 'unleash-fullstack-demo-app:production.3416d5c4fad0c6eccd5093b19b1c94ade9c9c0cd81c2034704ef9165')

## Feature Flags

The application uses the following feature flags:

- `fsDemoApp.chatbot` - Controls which variant of the AI chat to use:
  - When enabled: Uses the advanced AI chat with detailed expense analysis
  - When disabled: Uses the basic AI chat with simple expense information

## File Structure

- `src/index.ts` - Main entry point for the Express application
- `src/chatService.ts` - Service for handling AI chat functionality
- `src/metricsService.ts` - Service for collecting and exposing Prometheus metrics
- `test-chat-api.js` - Script for testing the chat API
- `test-metrics.js` - Script for testing metrics collection
- `dist/` - Compiled JavaScript files (generated after build)

## Static Content

The server serves static content from the frontend build directory (`../../dist`). This allows the backend to serve the frontend application in production environments.
