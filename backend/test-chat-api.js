import fetch from 'node-fetch';

async function testChatAPI() {
  console.log('Testing AI Chat API...');

  try {
    // Test with a question about total expenses
    const totalResponse = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'What are my total expenses?'
      }),
    });

    const totalData = await totalResponse.json();
    console.log('Total expenses response:', totalData);

    // Test with a question about categories
    const categoriesResponse = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Show me my expense categories'
      }),
    });

    const categoriesData = await categoriesResponse.json();
    console.log('Categories response:', categoriesData);

    // Test with a question about highest expense
    const highestResponse = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'What is my highest expense?'
      }),
    });

    const highestData = await highestResponse.json();
    console.log('Highest expense response:', highestData);

    // Test with a question about spending patterns (advanced feature)
    const patternsResponse = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Analyze my spending patterns'
      }),
    });

    const patternsData = await patternsResponse.json();
    console.log('Spending patterns response:', patternsData);

    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

// Run the tests
testChatAPI();
