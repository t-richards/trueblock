import { syncStorageToDnr } from './background'

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
})
