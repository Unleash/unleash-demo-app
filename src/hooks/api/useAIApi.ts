const ENDPOINT = 'api/ai'

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export const useAIApi = () => {
  const chat = async (message: string): Promise<ChatMessage> => {
    const response = await fetch(`${ENDPOINT}/chat`, {
      method: 'POST',
      body: JSON.stringify({
        message
      })
    })

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  return {
    chat
  }
}
