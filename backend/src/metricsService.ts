import { register, Counter, Gauge, Histogram, collectDefaultMetrics } from 'prom-client';

// Initialize default metrics (CPU, memory, etc.)
collectDefaultMetrics({ register });

// Initialize chat-specific metrics

// Histogram for execution time - allows calculation of percentiles (p95, p99)
const chatExecutionTime = new Histogram({
  name: 'chat_execution_time_seconds',
  help: 'Execution time of chat queries in seconds',
  labelNames: ['variant'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 1.5, 2, 2.5, 3] // Buckets based on basic (0.3-0.7s) and advanced (1.5-2.5s) variants
});

// Counter for total cost - accumulates over time
const chatTotalCost = new Counter({
  name: 'chat_total_cost_dollars',
  help: 'Total accumulated cost of chat queries in dollars',
  labelNames: ['variant']
});

// Counter for number of chat calls - tracks call volume
const chatCallCount = new Counter({
  name: 'chat_call_count_total',
  help: 'Total number of chat calls',
  labelNames: ['variant']
});

// Histogram for cost per call - allows for aggregation and trend analysis
const chatCostPerCall = new Histogram({
  name: 'chat_cost_per_call_dollars',
  help: 'Cost per individual chat query in dollars',
  labelNames: ['variant'],
  buckets: [0.05, 0.1, 0.15, 0.2, 0.25] // Buckets based on basic ($0.1) and advanced ($0.2) variants
});

// Function to record metrics for a chat query
export const recordChatMetrics = (variant: string, executionTimeMs: number, costInDollars: number) => {
  // Convert milliseconds to seconds for the histogram
  chatExecutionTime.observe({ variant }, executionTimeMs / 1000);

  // Increment the total cost counter
  chatTotalCost.inc({ variant }, costInDollars);

  // Increment the call count counter
  chatCallCount.inc({ variant });

  // Observe the cost per call
  chatCostPerCall.observe({ variant }, costInDollars);
};

// Export the metrics registry
export const metricsRegistry = register;
