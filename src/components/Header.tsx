export const Header = () => (
  <div className='hidden sm:flex sticky top-0 bg-web text-white h-12 items-center justify-center gap-4'>
    This demo is controlled by Unleash (production environment).
    <a
      href='https://app.unleash-hosted.com/demo/projects/unleash-fullstack-demo-app/features/fsDemoApp.chatbot'
      target='_blank'
      className='bg-unleash px-6 py-1.5 font-bold rounded text-sm'
    >
      Open Unleash
    </a>
  </div>
)
