import { syncStorageToDnr } from './background'

describe('sync storage to declarativeNetRequest', () => {
  describe('with no items in storage', () => {
    it('creates no DNR rules', async () => {
      // Storage contains an empty object
      const storageGet = jest.fn(async () => ({}))
      Object.assign(global, { chrome: { storage: { sync: { get: storageGet } } } })
      expect(storageGet).toHaveBeenCalledTimes(1)

      // DNR rules are an empty array
      const getDynamic = jest.fn(async () => ([]))
      Object.assign(global, { chrome: { declarativeNetRequest: { getDynamicRules: getDynamic } } })
      expect(getDynamic).toHaveBeenCalledTimes(1)

      // This method should not be called
      const updateDynamic = jest.fn()
      Object.assign(global, { chrome: { declarativeNetRequest: { updateDynamicRules: updateDynamic } } })

      await syncStorageToDnr()

      expect(updateDynamic).not.toHaveBeenCalled()
    })
  })
})
