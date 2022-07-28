import { syncStorageToDnr } from './background'

describe('sync storage to declarativeNetRequest', () => {
  describe('with no items in storage', () => {
    it('creates no DNR rules', async () => {
      await syncStorageToDnr()

      expect(chrome.declarativeNetRequest.updateDynamicRules).not.toHaveBeenCalled()
    })
  })

  describe('with one new item in storage', () => {
    it('creates one new DNR rule', async () => {
      chrome.storage.sync.get = jest.fn(async () => {
        // One rule in storage
        return {
          'example.net': { id: 3, enabled: true }
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
