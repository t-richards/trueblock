import { afterEach, beforeEach, mock } from 'bun:test'
import { GlobalRegistrator } from '@happy-dom/global-registrator'
import { cleanup } from '@testing-library/preact'

GlobalRegistrator.register()

const RuleActionType = {
  ALLOW: 'allow',
  ALLOW_ALL_REQUESTS: 'allowAllRequests',
  BLOCK: 'block',
  MODIFY_HEADERS: 'modifyHeaders',
  REDIRECT: 'redirect',
  UPGRADE_SCHEME: 'upgradeScheme',
}

const ResourceType = {
  CSP_REPORT: 'csp_report',
  FONT: 'font',
  IMAGE: 'image',
  MAIN_FRAME: 'main_frame',
  MEDIA: 'media',
  OBJECT: 'object',
  OTHER: 'other',
  PING: 'ping',
  SCRIPT: 'script',
  STYLESHEET: 'stylesheet',
  SUB_FRAME: 'sub_frame',
  WEBBUNDLE: 'webbundle',
  WEBSOCKET: 'websocket',
  WEBTRANSPORT: 'webtransport',
  XMLHTTPREQUEST: 'xmlhttprequest',
}

// n.b. packages like chrome-mock, chrome-jest-mock, jest-chrome, etc.
// are not suitable for our tests because they are too outdated and/or
// do not provide the subset of chrome APIs we need.
beforeEach(() => {
  Object.assign(globalThis, {
    chrome: {
      tabs: {
        query: mock(async () => []), // no tabs
      },
      storage: {
        sync: {
          get: mock(async () => ({})), // empty storage
          set: mock(),
          remove: mock(),
        },
      },
      declarativeNetRequest: {
        RuleActionType,
        ResourceType,
        getDynamicRules: mock(async () => []), // empty DNR rules
        updateDynamicRules: mock(),
      },
    },
  })
})

afterEach(() => {
  cleanup()
  document.body.innerHTML = ''
  globalThis.chrome = undefined
  delete globalThis.chrome
})
