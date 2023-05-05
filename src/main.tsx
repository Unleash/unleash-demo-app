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
  url: 'https://sandbox.getunleash.io/nuno/api/frontend',
  clientKey:
    'demo-app:dev.f2223d96498eb61d2810e1951fd107e9fc663b54e1ac4f1543673596',
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
