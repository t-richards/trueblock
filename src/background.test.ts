import { syncStorageToDnr } from './background'

describe('sync storage to declarativeNetRequest', () => {
  describe('with no items in storage', () => {
    it('creates no DNR rules', async () => {
      const storageGet = jest.fn(async () => ({})) // Empty storage
      const getDynamic = jest.fn(async () => ([])) // Empty DNR rules
      const updateDynamic = jest.fn() // This function should not be called
      Object.assign(global, { chrome: { 
        storage: { sync: { get: storageGet } },
        declarativeNetRequest: {
          getDynamicRules: getDynamic,
          updateDynamicRules: updateDynamic
        }
      } })

      await syncStorageToDnr()

      expect(storageGet).toHaveBeenCalledTimes(1)
      expect(getDynamic).toHaveBeenCalledTimes(1)
      expect(updateDynamic).not.toHaveBeenCalled()
    })
  })
})
