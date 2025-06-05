import { Icon } from '@iconify/react'
import { toast } from 'react-hot-toast'
import { getLocalContext } from '../util/context'
import { useFlag } from '@unleash/proxy-client-react'

export const User = () => {
  const showContext = useFlag('fsDemoApp.showContext')

  const context = getLocalContext()
  const { userId, properties } = context

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userId!)
    toast.success('userId copied to clipboard')
  }

  return (
    <div className='flex flex-col items-center gap-2 w-full sm:max-w-xs min-w-[230px]'>
      <img
        src='/unleash.svg'
        alt='User profile picture'
        className='h-14 w-14 rounded-xl sm:h-20 sm:w-20'
      />
      <p className='text-xl sm:text-3xl'>Welcome</p>
      <button
        className='flex flex-row items-center bg-unleash text-white px-4 py-2 rounded cursor-pointer'
        title='Click to copy the userId to your clipboard'
        onClick={copyToClipboard}
      >
        <strong className='mr-1'>userId:</strong>
        {userId}
        <Icon icon='ic:round-content-copy' className='ml-2' />
      </button>
      {showContext && (
        <pre className='text-xs p-2 mt-2 rounded-md bg-slate-800 border border-slate-600'>
          {JSON.stringify(properties, null, 2)}
        </pre>
      )}
    </div>
  )
}
