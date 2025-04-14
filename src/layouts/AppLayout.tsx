import { useFlag, useFlagsStatus } from '@unleash/proxy-client-react'
import { Toaster } from 'react-hot-toast'
import { User } from '../components/User'
import { ChatBot } from '../components/ChatBot'

const MENU = ['Dashboard', 'Summary', 'Expenses', 'Wallet', 'Settings']

interface IAppLayoutProps {
  children: React.ReactNode
}

export const AppLayout = ({ children }: IAppLayoutProps) => {
  const { flagsReady, flagsError } = useFlagsStatus()
  const step2 = useFlag('demoApp.step2')
  const step3 = useFlag('demoApp.step3')

  const backgroundColor = step2 ? 'bg-green-900' : 'bg-slate-900'

  if (!flagsReady) {
    return null
  }

  if (flagsError) {
    console.error(flagsError)
    return (
      <div
        className={`${backgroundColor} text-white w-full flex flex-col items-center sm:w-auto sm:rounded-3xl sm:flex-row sm:p-5`}
      >
        Something went wrong. Check the console for more information.
      </div>
    )
  }

  return (
    <div
      className={`${backgroundColor} text-white w-full flex flex-col items-center sm:w-auto sm:rounded-3xl sm:flex-row sm:p-5 sm:items-start transition-colors animate-fadeIn relative`}
    >
      <Toaster
        position='top-left'
        containerStyle={{
          position: 'absolute'
        }}
      />
      <div className='p-4 mt-2 sm:mt-6 sm:mr-6'>
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
      </div>
      <div className='bg-white text-slate-950 w-full p-6 rounded-t-3xl overflow-hidden flex flex-col gap-4 sm:rounded-3xl sm:gap-6'>
        {children}
      </div>
      {step3 && <ChatBot />}
    </div>
  )
}
