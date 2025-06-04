import fetch from 'node-fetch';

// Helper function to make a chat API request
async function makeChatRequest(message) {
  const response = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  return await response.json();
}

async function testChatAPI() {
  console.log('Testing AI Chat API...');

  try {
    // Test with a question about total expenses
    console.log('Sending query: "What are my total expenses?"');
    const totalResponse = await makeChatRequest('What are my total expenses?');
    console.log('Total expenses response:', totalResponse);
    console.log(`Execution time: ${totalResponse.executionTimeMs}ms, Cost: $${totalResponse.costInDollars}`);

    // Test with a question about categories
    console.log('Sending query: "Show me my expense categories"');
    const categoriesResponse = await makeChatRequest('Show me my expense categories');
    console.log('Categories response:', categoriesResponse);
    console.log(`Execution time: ${categoriesResponse.executionTimeMs}ms, Cost: $${categoriesResponse.costInDollars}`);

    // Test with a question about highest expense
    console.log('Sending query: "What is my highest expense?"');
    const highestResponse = await makeChatRequest('What is my highest expense?');
    console.log('Highest expense response:', highestResponse);
    console.log(`Execution time: ${highestResponse.executionTimeMs}ms, Cost: $${highestResponse.costInDollars}`);

    // Test with a question about spending patterns (advanced feature)
    console.log('Sending query: "Analyze my spending patterns"');
    const patternsResponse = await makeChatRequest('Analyze my spending patterns');
    console.log('Spending patterns response:', patternsResponse);
    console.log(`Execution time: ${patternsResponse.executionTimeMs}ms, Cost: $${patternsResponse.costInDollars}`);

    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

// Run the tests
console.log('Starting chat API test. Make sure the server is running on port 3000.');
testChatAPI();
