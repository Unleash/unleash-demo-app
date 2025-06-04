import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import { ChatMessage, useAIApi } from '../../../hooks/api/useAIApi'
import { AIChatHeader } from './AIChatHeader'
import { AIChatInput } from './AIChatInput'
import { AIChatMessage } from './AIChatMessage'
import toast from 'react-hot-toast'

type ScrollOptions = ScrollIntoViewOptions & {
  onlyIfAtEnd?: boolean
}

const AI_ERROR_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: `I'm sorry, I'm having trouble understanding you right now. I've reported the issue to the team. Please try again later.`
}

export const ChatBotB = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [messages, setMessages] = useState<ChatMessage[]>([])

  const { chat } = useAIApi()

  const isAtEndRef = useRef(true)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToEnd = (options?: ScrollOptions) => {
    if (chatEndRef.current) {
      const shouldScroll = !options?.onlyIfAtEnd || isAtEndRef.current

      if (shouldScroll) {
        chatEndRef.current.scrollIntoView(options)
      }
    }
  }

  const onSend = async (content: string) => {
    if (!content.trim() || loading) return

    try {
      setLoading(true)
      setMessages(currentMessages => [
        ...currentMessages,
        { role: 'user', content }
      ])
      const response = await chat(content)
      setMessages(currentMessages => [...currentMessages, response])
    } catch (error: unknown) {
      setMessages(currentMessages => [...currentMessages, AI_ERROR_MESSAGE])
      console.error('AI API error', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollToEnd()
    })

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isAtEndRef.current = entry.isIntersecting
      },
      { threshold: 1.0 }
    )

    if (chatEndRef.current) {
      intersectionObserver.observe(chatEndRef.current)
    }

    return () => {
      if (chatEndRef.current) {
        intersectionObserver.unobserve(chatEndRef.current)
      }
    }
  }, [open])

  useEffect(() => {
    scrollToEnd({ behavior: 'smooth', onlyIfAtEnd: true })
  }, [messages])

  if (!open) {
    return (
      <button
        className='flex items-center justify-center absolute bottom-8 right-8 w-20 h-20 bg-white text-orange rounded-3xl shadow-popup border-4 border-orange animate-fadeInUp'
        onClick={() => setOpen(true)}
      >
        <Icon
          icon='fluent-mdl2:chat-bot'
          className='text-5xl animate-bounceSlightly'
        />
      </button>
    )
  }

  return (
    <div className='absolute bottom-0 right-0 sm:bottom-2 sm:right-2 w-[min(100vw,400px)] h-[min(100vh,500px)] rounded-3xl shadow-popup border-4 border-orange flex flex-col flex-1 overflow-hidden bg-orange animate-fadeIn'>
      <AIChatHeader
        onNew={() => setMessages([])}
        onClose={() => {
          setOpen(false)
        }}
        onHelp={() => toast.success('Asked for support!')}
      />
      <div className='flex flex-col flex-1 p-4 pb-2 overflow-y-auto overflow-x-hidden bg-white'>
        {/* <AIChatDisclaimer /> */}
        <AIChatMessage from='assistant'>
          Hello, how can I assist you?
        </AIChatMessage>
        {messages.map(({ role, content }, index) => (
          <AIChatMessage key={index} from={role}>
            {content}
          </AIChatMessage>
        ))}
        {loading && (
          <AIChatMessage from='assistant'>
            _AI Assistant is typing..._
          </AIChatMessage>
        )}
        <div ref={chatEndRef} />
      </div>
      <AIChatInput
        onSend={onSend}
        loading={loading}
        onHeightChange={() => scrollToEnd({ onlyIfAtEnd: true })}
      />
    </div>
  )
}
