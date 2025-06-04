import { handleChatRequest } from './dist/chatService.js';
import { initialize } from 'unleash-client';

// Initialize Unleash client
const unleash = initialize({
  url: process.env.UNLEASH_URL || 'https://app.unleash-hosted.com/demo/api/',
  appName: 'unleash-demo-app',
  customHeaders: {
    Authorization: process.env.UNLEASH_API_KEY || 'expensechat:production.9df64163731c7d23782bf560c2c66b161bbed6d943080a6e2cd35c7e',
  },
});

// Mock Express request and response objects
function createMockReqRes(message) {
  const req = {
    body: { message },
    _isTestRequest: true // Flag to indicate this is a test request
  };

  const res = {
    status: function(statusCode) {
      this.statusCode = statusCode;
      return this;
    },
    json: function(data) {
      this.data = data;
      return this;
    }
  };

  return { req, res };
}

async function testChatAPI() {
  console.log('Testing AI Chat API...');

  try {
    // Test with a question about total expenses
    const { req: totalReq, res: totalRes } = createMockReqRes('What are my total expenses?');
    await handleChatRequest(unleash)(totalReq, totalRes);
    console.log('Total expenses response:', totalRes.data);
    console.log(`Execution time: ${totalRes.data.executionTimeMs}ms, Cost: $${totalRes.data.costInDollars}`);

    // Test with a question about categories
    const { req: categoriesReq, res: categoriesRes } = createMockReqRes('Show me my expense categories');
    await handleChatRequest(unleash)(categoriesReq, categoriesRes);
    console.log('Categories response:', categoriesRes.data);
    console.log(`Execution time: ${categoriesRes.data.executionTimeMs}ms, Cost: $${categoriesRes.data.costInDollars}`);

    // Test with a question about highest expense
    const { req: highestReq, res: highestRes } = createMockReqRes('What is my highest expense?');
    await handleChatRequest(unleash)(highestReq, highestRes);
    console.log('Highest expense response:', highestRes.data);
    console.log(`Execution time: ${highestRes.data.executionTimeMs}ms, Cost: $${highestRes.data.costInDollars}`);

    // Test with a question about spending patterns (advanced feature)
    const { req: patternsReq, res: patternsRes } = createMockReqRes('Analyze my spending patterns');
    await handleChatRequest(unleash)(patternsReq, patternsRes);
    console.log('Spending patterns response:', patternsRes.data);
    console.log(`Execution time: ${patternsRes.data.executionTimeMs}ms, Cost: $${patternsRes.data.costInDollars}`);

    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

// Run the tests
testChatAPI();
