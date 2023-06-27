import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'

import {
  FlagProvider,
  IConfig,
  UnleashClient
} from '@unleash/proxy-client-react'
import uaga from '@nunogois/unleash-analytics-ga'
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
  context: { userId },
  impressionDataAll: true
}

const client = new UnleashClient(config)

client.on('impression', uaga)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FlagProvider unleashClient={client}>
      <App />
    </FlagProvider>
  </React.StrictMode>
)
