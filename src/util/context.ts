import Bowser from 'bowser'
import { random } from './random.ts'
import { filterOutFalsyFromObject } from './filter'
import { IMutableContext } from '@unleash/proxy-client-react'

export const getLocalContext = (): IMutableContext => {
  let userId = localStorage.getItem('userId')

  if (!userId) {
    userId = random(100000000).toString()
    localStorage.setItem('userId', userId)
  }

  let userAgent = Bowser.parse(window.navigator.userAgent)
  const userAgentContext = filterOutFalsyFromObject({
    platformType: userAgent.platform.type,
    platformVendor: userAgent.platform.vendor,
    browserName: userAgent.browser.name
  })

  return { userId, properties: userAgentContext }
}
