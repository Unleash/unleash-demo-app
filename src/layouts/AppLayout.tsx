import { useFlagsStatus, useVariant } from '@unleash/proxy-client-react'
import toast, { Toaster } from 'react-hot-toast'
import { User } from '../components/User'
import { ChatBotA } from '../components/chat/A/ChatBotA'
import { ChatBotB } from '../components/chat/B/ChatBotB'

const MENU = ['Dashboard', 'Summary', 'Expenses', 'Wallet', 'Settings']

interface IAppLayoutProps {
  children: React.ReactNode
}

export const AppLayout = ({ children }: IAppLayoutProps) => {
  const { flagsReady, flagsError } = useFlagsStatus()
  const chatbotVariant = useVariant('fsDemoApp.chatbot')

  if (!flagsReady) {
    return null
  }

  if (flagsError) {
    console.error(flagsError)
    return (
      <div className='bg-slate-900 text-white w-full flex flex-col items-center sm:w-auto sm:rounded-3xl sm:flex-row sm:p-5'>
        Something went wrong. Check the console for more information.
      </div>
    )
  }

  const onGetSupport = () => {
    toast.success('Asked for support!')
  }

  return (
    <div className='bg-slate-900 text-white w-full flex flex-col items-center sm:w-auto sm:rounded-3xl sm:flex-row sm:p-5 sm:items-start transition-colors animate-fadeIn relative'>
      <Toaster
        position='top-left'
        containerStyle={{
          position: 'absolute'
        }}
      />
      <div className='p-4 sm:p-0 mt-2 sm:mt-6 sm:mr-6'>
        <User />
        <div className='hidden sm:block'>
          <hr className='my-6 border-gray-600' />
          <ul className='flex flex-col gap-4'>
            {MENU.map((item, index) => {
              if (item === 'Expenses') {
                return (
                  <li
                    key={index}
                    className='text-white text-2xl font-semibold tracking-wider cursor-pointer pl-4 border-l-4'
                  >
                    {item}
                  </li>
                )
              }

              return (
                <li
                  key={index}
                  className='text-white text-2xl font-semibold tracking-wider cursor-pointer pl-4 opacity-50 hover:opacity-100'
                >
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
        <div className='text-center mt-4 sm:absolute sm:bottom-6 sm:mt-auto'>
          <button className='text-white underline' onClick={onGetSupport}>
            Get support
          </button>
        </div>
      </div>
      <div className='bg-white text-slate-950 w-full p-6 rounded-t-3xl overflow-hidden flex flex-col gap-4 sm:rounded-3xl sm:gap-6'>
        {children}
      </div>
      {chatbotVariant.name === 'basic' ? (
        <ChatBotA />
      ) : chatbotVariant.name === 'advanced' ? (
        <ChatBotB />
      ) : null}
    </div>
  )
}
