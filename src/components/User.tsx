import { Icon } from '@iconify/react'
import { toast } from 'react-hot-toast'

export const User = () => {
  const userId = localStorage.getItem('userId')

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userId!)
    toast.success('userId copied to clipboard')
  }

  return (
    <div className='flex flex-col items-center gap-2 w-full sm:max-w-xs'>
      <img
        src='/unleash.svg'
        alt='User profile picture'
        className='h-14 w-14 rounded-xl sm:h-20 sm:w-20'
      />
      <p className='text-xl sm:text-3xl'>Welcome</p>
      <p
        className='flex flex-row items-center bg-unleash text-white px-4 py-2 rounded cursor-pointer'
        title='Click to copy the userId to your clipboard'
        onClick={copyToClipboard}
      >
        <strong className='mr-1'>userId:</strong>
        {userId}
        <Icon icon='ic:round-content-copy' className='ml-2' />
      </p>
      <p className='text-xs text-center sm:text-sm'>
        You will need the userId for some of the steps of the demo
      </p>
    </div>
  )
}
