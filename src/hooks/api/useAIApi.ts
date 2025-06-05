import {useUnleashClient} from "@unleash/proxy-client-react";
import { createUnleashContextHeaders } from "../../utils/createUnleashContextHeaders.ts";

const ENDPOINT = 'api/chat'

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export const useAIApi = () => {
  const client = useUnleashClient();

  const chat = async (message: string): Promise<ChatMessage> => {
    // Get all context parameters from Unleash client and create headers
    const context = client.getContext();
    const headers = createUnleashContextHeaders(context);

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
