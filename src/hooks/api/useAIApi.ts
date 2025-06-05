import {useUnleashClient} from "@unleash/proxy-client-react";

const ENDPOINT = 'api/chat'

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export const useAIApi = () => {
  const client = useUnleashClient();

  const chat = async (message: string): Promise<ChatMessage> => {
    // Get all context parameters from Unleash client
    const context = client.getContext();

    // Create headers for all context parameters
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add all context parameters as headers
    Object.entries(context).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          // Handle properties object
          if (key === 'properties') {
            Object.entries(value).forEach(([propKey, propValue]) => {
              if (propValue !== undefined && propValue !== null) {
                headers[`Unleash-ContextParam-${propKey}`] = String(propValue);
              }
            });
          }
        } else {
          headers[`Unleash-ContextParam-${key}`] = String(value);
        }
      }
    });

    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message
      })
    })

    if (!res.ok) {
      throw new Error(`AI API error: ${res.status} ${res.statusText}`)
    }

    const { response } = await res.json()

    return {
      role: 'assistant',
      content: response
    }
  }

  return {
    chat
  }
}
