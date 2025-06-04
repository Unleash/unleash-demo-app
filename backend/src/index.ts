console.log('Starting server...');
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';
import {initialize} from 'unleash-client';
import {handleChatRequest} from './chatService.js';
import { metricsRegistry } from './metricsService.js';

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Unleash client
const unleash = initialize({
  url: process.env.UNLEASH_URL || 'https://app.unleash-hosted.com/demo/api/',
  appName: 'unleash-demo-app',
  customHeaders: {
    Authorization: process.env.UNLEASH_API_KEY || 'expensechat:production.9df64163731c7d23782bf560c2c66b161bbed6d943080a6e2cd35c7e',
  },
});

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Serve static files from the frontend build directory
const distPath = path.join(__dirname, '../../dist');
app.use(express.static(distPath));

// Dynamic endpoint for the frontend
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Unleash Demo App Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// AI Chat endpoint
app.post('/api/chat', handleChatRequest(unleash));

// For any other GET request, send the index.html file
// This enables client-side routing
app.get('/api/flag/variant', (req, res) => {
  res.json(unleash.getVariant('ai-chat-variant'));
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', metricsRegistry.contentType);
    res.end(await metricsRegistry.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving static files from: ${distPath}`);
});
