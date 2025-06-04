import { Icon } from '@iconify/react'

interface IAIChatHeaderProps {
  onNew: () => void
  onClose: () => void
  onHelp: () => void
}

export const AIChatHeader = ({
  onNew,
  onClose,
  onHelp
}: IAIChatHeaderProps) => {
  return (
    <>
      <div className='flex justify-between p-2 bg-orange text-white'>
        <div className='flex gap-2 ml-2'>
          <Icon icon='fluent-mdl2:chat-bot' className='text-2xl' />
          <p className='font-bold'>AI Assistant</p>
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
      <div className='p-1 bg-orange flex items-center justify-center text-center w-full text-xs rounded-t gap-2'>
        Assistant not being helpful?{' '}
        <button
          className='bg-orange font-bold rounded underline'
          onClick={onHelp}
        >
          Get support
        </button>
      </div>
    </>
  )
}
