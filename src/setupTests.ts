const RuleActionType = {
  ALLOW: "allow",
  ALLOW_ALL_REQUESTS: "allowAllRequests",
  BLOCK: "block",
  MODIFY_HEADERS: "modifyHeaders",
  REDIRECT: "redirect",
  UPGRADE_SCHEME: "upgradeScheme"
}

const ResourceType = {
  CSP_REPORT: "csp_report",
  FONT: "font",
  IMAGE: "image",
  MAIN_FRAME: "main_frame",
  MEDIA: "media",
  OBJECT: "object",
  OTHER: "other",
  PING: "ping",
  SCRIPT: "script",
  STYLESHEET: "stylesheet",
  SUB_FRAME: "sub_frame",
  WEBBUNDLE: "webbundle",
  WEBSOCKET: "websocket",
  WEBTRANSPORT: "webtransport",
  XMLHTTPREQUEST: "xmlhttprequest"
}

global.beforeEach(() => {
  Object.assign(global, {
    chrome: {
      storage: {
        sync: {
          get: jest.fn(async () => ({})), // empty storage
          set: jest.fn()
        }
      },
      declarativeNetRequest: {
        RuleActionType,
        ResourceType,
        getDynamicRules: jest.fn(async () => ([])), // empty DNR rules
        updateDynamicRules: jest.fn()
      }
    }
  })
})

global.afterEach(() => {
  global.chrome = undefined
  delete global.chrome
})
