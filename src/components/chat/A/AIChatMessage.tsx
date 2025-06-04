import { Icon } from '@iconify/react'
import { ChatMessage } from '../../../hooks/api/useAIApi'

interface IAIChatMessageProps {
  from: ChatMessage['role']
  className?: string
  children: string
}

export const AIChatMessage = ({
  from,
  className,
  children
}: IAIChatMessageProps) => {
  if (from === 'user') {
    return (
      <div className='flex justify-end gap-2 my-2 first-of-type:mt-0 last-of-type:mb-0'>
        <div className='chat-message chat-message-user bg-gray-200 before:border-l-gray-200 text-black'>
          <div className='whitespace-pre-wrap break-words overflow-wrap break-word min-w-0'>
            {children}
          </div>
        </div>
        <div className='h-9 flex items-center text-unleash'>
          <Icon icon='ic:baseline-person' className='text-2xl' />
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex justify-start gap-2 my-2 first-of-type:mt-0 last-of-type:mb-0 ${className}`}
    >
      <div className='h-9 flex items-center text-unleash'>
        <Icon icon='fluent-mdl2:chat-bot' className='text-2xl' />
      </div>
      <div className='chat-message chat-message-assistant bg-unleash before:border-r-unleash text-white'>
        <div className='whitespace-pre-wrap break-words overflow-wrap break-word min-w-0'>
          {children}
        </div>
      </div>
    </div>
  )
}
