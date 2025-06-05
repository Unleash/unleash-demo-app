import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'

import { FlagProvider, IConfig } from '@unleash/proxy-client-react'
import { getContext } from './util/context.ts'

const config: IConfig = {
  url:
    import.meta.env.VITE_UNLEASH_FRONTEND_API_URL ||
    'https://app.unleash-hosted.com/demo/api/frontend',
  clientKey:
    import.meta.env.VITE_UNLEASH_FRONTEND_API_KEY ||
    'unleash-fullstack-demo-app:production.3416d5c4fad0c6eccd5093b19b1c94ade9c9c0cd81c2034704ef9165',
  refreshInterval: 2,
  appName: 'unleash-fullstack-demo-app',
  context: getContext()
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FlagProvider config={config}>
      <App />
    </FlagProvider>
  </React.StrictMode>
)
