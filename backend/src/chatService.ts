import {Request, Response} from 'express';
import {Unleash} from 'unleash-client';

export interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
}

export interface ChatResponse {
  response: string;
  variant: string;
  executionTimeMs: number;
  costInDollars: number;
}

// Mock user expense data
export const userExpenses: Expense[] = [
  { id: 1, category: 'Food', amount: 125.50, date: '2023-05-01' },
  { id: 2, category: 'Transportation', amount: 45.00, date: '2023-05-02' },
  { id: 3, category: 'Entertainment', amount: 65.75, date: '2023-05-03' },
  { id: 4, category: 'Utilities', amount: 120.00, date: '2023-05-05' },
  { id: 5, category: 'Shopping', amount: 250.30, date: '2023-05-07' }
];

export function generateBasicChatResponse(message: string, expenses: Expense[]): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('total expenses')) {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    return `Your total expenses are $${total.toFixed(2)}.`;
  } else if (lowerMessage.includes('categories')) {
    const categories = [...new Set(expenses.map(expense => expense.category))];
    return `Your expense categories are: ${categories.join(', ')}.`;
  } else if (lowerMessage.includes('highest expense')) {
    const highest = expenses.reduce((max, expense) => expense.amount > max.amount ? expense : max, expenses[0]);
    return `Your highest expense is $${highest.amount.toFixed(2)} for ${highest.category} on ${highest.date}.`;
  } else {
    return `I can answer questions about your total expenses, expense categories, or highest expense. How can I help you?`;
  }
}

export function generateAdvancedChatResponse(message: string, expenses: Expense[]): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('total expenses')) {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const average = total / expenses.length;
    return `Your total expenses are $${total.toFixed(2)}, with an average of $${average.toFixed(2)} per transaction.`;
  } else if (lowerMessage.includes('categories')) {
    const categoryTotals = expenses.reduce((acc: Record<string, number>, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {});

    let response = 'Here\'s a breakdown of your expenses by category:\n';
    for (const [category, total] of Object.entries(categoryTotals)) {
      response += `- ${category}: $${total.toFixed(2)}\n`;
    }
    return response;
  } else if (lowerMessage.includes('highest expense')) {
    const highest = expenses.reduce((max, expense) => expense.amount > max.amount ? expense : max, expenses[0]);
    const percentOfTotal = (highest.amount / expenses.reduce((sum, exp) => sum + exp.amount, 0)) * 100;
    return `Your highest expense is $${highest.amount.toFixed(2)} for ${highest.category} on ${highest.date}. This represents ${percentOfTotal.toFixed(1)}% of your total expenses.`;
  } else if (lowerMessage.includes('spending pattern') || lowerMessage.includes('analysis')) {
    const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let response = 'Based on your spending pattern:\n';
    response += `- Your spending started at $${sortedExpenses[0].amount.toFixed(2)} on ${sortedExpenses[0].date}\n`;
    response += `- Your most recent expense was $${sortedExpenses[sortedExpenses.length-1].amount.toFixed(2)} on ${sortedExpenses[sortedExpenses.length-1].date}\n`;

    const firstHalfAvg = sortedExpenses.slice(0, Math.floor(sortedExpenses.length/2))
      .reduce((sum, exp) => sum + exp.amount, 0) / Math.floor(sortedExpenses.length/2);
    const secondHalfAvg = sortedExpenses.slice(Math.floor(sortedExpenses.length/2))
      .reduce((sum, exp) => sum + exp.amount, 0) / (sortedExpenses.length - Math.floor(sortedExpenses.length/2));

    if (secondHalfAvg > firstHalfAvg) {
      response += `- Your spending is trending upward by ${((secondHalfAvg/firstHalfAvg - 1) * 100).toFixed(1)}%`;
    } else {
      response += `- Your spending is trending downward by ${((1 - secondHalfAvg/firstHalfAvg) * 100).toFixed(1)}%`;
    }

    return response;
  } else {
    return `I can provide detailed analysis of your expenses including total expenses, category breakdowns, highest expenses, and spending patterns. What would you like to know?`;
  }
}

function simulateDelay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const generateChatResponse = (unleash: Unleash) => async (message: string): Promise<ChatResponse>  => {
  // Get the variant from the feature flag
  const variant = unleash.getVariant('ai-chat-variant');
  const variantName = variant.name || 'basic';

  // Set delay and cost based on variant
  // Advanced: faster but more expensive
  // Basic: slower but cheaper

  // Calculate random delay within the specified range
  // Advanced: 500ms ±200ms (300ms to 700ms) - faster but more expensive
  // Basic: 2 seconds ±500ms (1500ms to 2500ms) - slower but cheaper
  const getRandomDelay = (base: number, variation: number) => {
    return base + (Math.random() * 2 - 1) * variation;
  };

  const delayMs = variantName === 'advanced' 
    ? getRandomDelay(500, 200)  // Advanced: 500ms ±200ms - faster
    : getRandomDelay(2000, 500);  // Basic: 2 seconds ±500ms - slower

  const costPerRequest = variantName === 'advanced' ? 0.02 : 0.005; // Advanced is more expensive

  const startTime = Date.now();

  // Simulate AI processing delay
  await simulateDelay(delayMs);

  let response: string;

  if (variantName === 'advanced') {
    response = generateAdvancedChatResponse(message, userExpenses);
  } else {
    response = generateBasicChatResponse(message, userExpenses);
  }

  const executionTimeMs = Date.now() - startTime;

  return {
    response,
    variant: variantName,
    executionTimeMs,
    costInDollars: costPerRequest
  };
}

export const handleChatRequest = (unleash: Unleash) => async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const chatResponse = await generateChatResponse(unleash)(message);

  if (process.env.NODE_ENV !== 'production') {
    res.json(chatResponse);
  } else {
    res.json({
      response: chatResponse.response
    });
  }
}
