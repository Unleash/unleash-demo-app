import { Icon } from '@iconify/react'

interface IAIChatHeaderProps {
  onNew: () => void
  onClose: () => void
}

export const AIChatHeader = ({ onNew, onClose }: IAIChatHeaderProps) => {
  return (
    <>
      <div className='flex justify-between p-2 bg-unleash text-white'>
        <div className='flex gap-2 ml-2'>
          <Icon icon='fluent-mdl2:chat-bot' className='text-2xl' />
          <p className='font-bold'>AI Assistant (basic)</p>
        </div>
        <div className='flex gap-2'>
          <button title='New chat' onClick={onNew}>
            <Icon icon='ic:outline-post-add' className='text-2xl' />
          </button>
          <button title='Close chat' onClick={onClose}>
            <Icon icon='ic:baseline-close' className='text-2xl' />
          </button>
        </div>
      </div>
    </>
  )
}
