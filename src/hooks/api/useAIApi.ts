const ENDPOINT = 'api/chat'

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export const useAIApi = () => {
  const chat = async (message: string): Promise<ChatMessage> => {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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
