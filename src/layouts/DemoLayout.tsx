import { Header } from '../components/Header'

interface IDemoLayoutProps {
  children: React.ReactNode
}

export const DemoLayout = ({ children }: IDemoLayoutProps) => {
  return (
    <>
      <Header />
      <div className='bg-gray-50 h-full sm:h-[calc(100%-48px)] flex justify-center sm:items-center max-h-screen overflow-hidden'>
        {children}
      </div>
    </>
  )
}
