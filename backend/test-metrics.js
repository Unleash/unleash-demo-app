import fetch from 'node-fetch';

// Test the metrics endpoint after making some chat requests
async function testMetrics() {
  console.log('Testing metrics collection...');

  try {
    // Make a few chat requests
    console.log('Making chat requests...');

    // Test with different queries
    const queries = [
      'What are my total expenses?',
      'Show me my expense categories',
      'What is my highest expense?',
      'Analyze my spending patterns'
    ];

    for (const query of queries) {
      console.log(`Sending query: "${query}"`);
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();
      console.log(`Response received. Variant: ${data.variant}, Execution time: ${data.executionTimeMs}ms, Cost: $${data.costInDollars}`);
    }

    // Wait a moment for metrics to be updated
    console.log('Waiting for metrics to be updated...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check the metrics endpoint
    console.log('Checking metrics endpoint...');
    const metricsResponse = await fetch('http://localhost:3000/metrics');
    const metricsText = await metricsResponse.text();

    // Check if our metrics are present
    const hasExecutionTimeMetric = metricsText.includes('chat_execution_time_seconds');
    const hasTotalCostMetric = metricsText.includes('chat_total_cost_dollars');
    const hasCostPerCallMetric = metricsText.includes('chat_cost_per_call_dollars');
    const hasCallCountMetric = metricsText.includes('chat_call_count_total');

    console.log('Metrics found:');
    console.log(`- Execution time metric: ${hasExecutionTimeMetric ? 'YES' : 'NO'}`);
    console.log(`- Total cost metric: ${hasTotalCostMetric ? 'YES' : 'NO'}`);
    console.log(`- Cost per call metric: ${hasCostPerCallMetric ? 'YES' : 'NO'}`);
    console.log(`- Call count metric: ${hasCallCountMetric ? 'YES' : 'NO'}`);

    // Print relevant sections of the metrics
    console.log('\nRelevant metrics sections:');

    const executionTimeLines = metricsText.split('\n').filter(line => 
      line.includes('chat_execution_time_seconds')
    );
    console.log('\nExecution time metrics:');
    executionTimeLines.forEach(line => console.log(line));

    const totalCostLines = metricsText.split('\n').filter(line => 
      line.includes('chat_total_cost_dollars')
    );
    console.log('\nTotal cost metrics:');
    totalCostLines.forEach(line => console.log(line));

    const costPerCallLines = metricsText.split('\n').filter(line => 
      line.includes('chat_cost_per_call_dollars')
    );
    console.log('\nCost per call metrics:');
    costPerCallLines.forEach(line => console.log(line));

    const callCountLines = metricsText.split('\n').filter(line => 
      line.includes('chat_call_count_total')
    );
    console.log('\nCall count metrics:');
    callCountLines.forEach(line => console.log(line));

    console.log('\nMetrics test completed!');
  } catch (error) {
    console.error('Error testing metrics:', error);
  }
}

// Run the test
console.log('Starting metrics test. Make sure the server is running on port 3000.');
testMetrics();
