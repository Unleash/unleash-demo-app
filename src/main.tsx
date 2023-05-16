import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'

import { FlagProvider, IConfig } from '@unleash/proxy-client-react'
import { random } from './util/random.ts'

let userId = localStorage.getItem('userId')

if (!userId) {
  userId = random(100000000).toString()
  localStorage.setItem('userId', userId)
}

const config: IConfig = {
  url: 'https://app.unleash-hosted.com/demo/api/frontend',
  clientKey:
    'demo-app:dev.bf8d2a449a025d1715a28f218dd66a40ef4dcc97b661398f7e05ba67',
  refreshInterval: 2,
  appName: 'unleash-demo-app',
  context: { userId }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FlagProvider config={config}>
      <App />
    </FlagProvider>
  </React.StrictMode>
)
