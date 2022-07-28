import { syncStorageToDnr } from './background'

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

describe('sync storage to declarativeNetRequest', () => {
  describe('with no items in storage', () => {
    it('creates no DNR rules', async () => {
      Object.assign(global, {
        chrome: {
          storage: {
            sync: {
              get: jest.fn(async () => ({})) // Empty storage
            }
          },
          declarativeNetRequest: {
            getDynamicRules: jest.fn(async () => ([])), // Empty DNR rules
            updateDynamicRules: jest.fn() // Should not be called
          }
        }
      })

      await syncStorageToDnr()

      expect(chrome.declarativeNetRequest.updateDynamicRules).not.toHaveBeenCalled()
    })
  })

  describe('with one new item in storage', () => {
    it('creates one new DNR rule', async () => {
      Object.assign(global, {
        chrome: {
          storage: {
            sync: {
              get: jest.fn(async () => {
                // One rule in storage
                return {
                  'example.net': { id: 3, enabled: true }
                }
              })
            }
          },
          declarativeNetRequest: {
            RuleActionType,
            ResourceType,
            getDynamicRules: jest.fn(async () => ([])), // Empty DNR rules
            updateDynamicRules: jest.fn() // Should be called with one new rule
          }
        }
      })

      await syncStorageToDnr()

      expect(chrome.declarativeNetRequest.updateDynamicRules).toHaveBeenCalledWith(
        expect.objectContaining({
          addRules: expect.arrayContaining([
            expect.objectContaining({
              id: 3,
              condition: expect.objectContaining({
                requestDomains: ['example.net']
              })
            })
          ])
        })
      )
    })
  })
})
