import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'

export interface IAIChatInputProps {
  onSend: (message: string) => void
  loading: boolean
  onHeightChange?: () => void
}

export const AIChatInput = ({
  onSend,
  loading,
  onHeightChange
}: IAIChatInputProps) => {
  const [message, setMessage] = useState('')

  const inputContainerRef = useRef<HTMLDivElement | null>(null)
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const previousHeightRef = useRef<number>(0)

  const disabled = !message.trim() || loading

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      const newHeight = entry.contentRect.height

      if (newHeight !== previousHeightRef.current) {
        previousHeightRef.current = newHeight
        onHeightChange?.()
      }
    })

    if (inputContainerRef.current) {
      resizeObserver.observe(inputContainerRef.current)
    }

    return () => {
      if (inputContainerRef.current) {
        resizeObserver.unobserve(inputContainerRef.current)
      }
    }
  }, [onHeightChange])

  useEffect(() => {
    const el = textAreaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.overflow = 'auto'
      if (el.scrollHeight <= 36) {
        el.style.overflow = 'hidden'
      }
      el.style.height = Math.min(el.scrollHeight, 116) + 'px'
    }
  }, [message])

  const send = () => {
    if (!message.trim() || loading) return
    onSend(message)
    setMessage('')
  }

  return (
    <div
      ref={inputContainerRef}
      className='bg-white flex items-center p-2 pt-0'
    >
      <div className='flex relative w-full'>
        <textarea
          ref={textAreaRef}
          className='w-full text-black resize-none rounded-2xl border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400'
          rows={1}
          placeholder='Type your message here'
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => {
            e.stopPropagation()
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send()
            }
          }}
        />
        <div className='flex absolute right-2 bottom-1.5'>
          <button
            className={disabled ? 'text-gray-400' : 'text-orange'}
            disabled={disabled}
            onClick={send}
          >
            <Icon icon='ic:baseline-arrow-upward' className='text-2xl' />
          </button>
        </div>
      </div>
    </div>
  )
}
