import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'

import {
  FlagProvider,
  IConfig,
  IContext,
  UnleashClient
} from '@unleash/proxy-client-react'
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

interface IUnleashImpressionEvent {
  context: IContext
  enabled: boolean
  featureName: string
  eventType: string
  impressionData?: boolean
}

client.on('impression', (event: IUnleashImpressionEvent) => {
  const { context, featureName, ...rest } = event
  const data = new Map<string, any>(Object.entries(rest))

  Object.entries(context).forEach(([key, value]) => {
    if (value.length <= 100) {
      data.set(`context_${key}`, value)
    }
  })

  data.set('featureName', featureName)

  gtag('event', `unleash_${event.featureName}`, Object.fromEntries(data))
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FlagProvider unleashClient={client}>
      <App />
    </FlagProvider>
  </React.StrictMode>
)
