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
  url: 'http://localhost:3000/api/frontend',
  clientKey:
    'demo-app:dev.ab507a137aafee28be588844b0ab6db238ba2f3295c1b650bf365619',
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
