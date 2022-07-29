const RuleActionType = {
  ALLOW: 'allow',
  ALLOW_ALL_REQUESTS: 'allowAllRequests',
  BLOCK: 'block',
  MODIFY_HEADERS: 'modifyHeaders',
  REDIRECT: 'redirect',
  UPGRADE_SCHEME: 'upgradeScheme'
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
  XMLHTTPREQUEST: 'xmlhttprequest'
}

// n.b. packages like chrome-mock, chrome-jest-mock, jest-chrome, etc.
// are not suitable for our tests because they are too outdated and/or
// do not provide the subset of chrome APIs we need.
const TrueblockChromeMock = {
  chrome: {
    tabs: {
      query: jest.fn(() => []) // no tabs
    },
    storage: {
      sync: {
        get: jest.fn(async () => ({})), // empty storage
        set: jest.fn(),
        remove: jest.fn()
      }
    },
    declarativeNetRequest: {
      RuleActionType,
      ResourceType,
      getDynamicRules: jest.fn(async () => ([])), // empty DNR rules
      updateDynamicRules: jest.fn()
    }
  }
}

global.beforeEach(() => {
  Object.assign(global, TrueblockChromeMock)
})

global.afterEach(() => {
  global.chrome = undefined
  delete global.chrome
})

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
