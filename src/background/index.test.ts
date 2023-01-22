import { jest, expect } from '@jest/globals'

import { syncStorageToDnr } from './index'

describe('sync storage to declarativeNetRequest', () => {
  describe('with no items in storage', () => {
    it('creates no DNR rules', async () => {
      await syncStorageToDnr()

      expect(chrome.declarativeNetRequest.updateDynamicRules).not.toHaveBeenCalled()
    })
  })

  describe('with one new item in storage', () => {
    it('creates one new DNR rule', async () => {
      chrome.storage.sync.get = jest.fn(async () => ({
        'example.net': { id: 3, enabled: true }
      }))

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

  describe('with one existing DNR rule that matches storage', () => {
    it('does nothing', async () => {
      chrome.storage.sync.get = jest.fn(async () => ({
        'example.net': { id: 3, enabled: true }
      }))

      chrome.declarativeNetRequest.getDynamicRules = jest.fn(async () => [{
        id: 3,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.BLOCK
        },
        condition: { requestDomains: ['example.net'] }
      }])

      await syncStorageToDnr()

      expect(chrome.declarativeNetRequest.updateDynamicRules).not.toHaveBeenCalled()
    })
  })

  describe('with one existing DNR rule and empty storage', () => {
    it('removes the unused rule', async () => {
      chrome.declarativeNetRequest.getDynamicRules = jest.fn(async () => [{
        id: 3,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.BLOCK
        },
        condition: { requestDomains: ['example.net'] }
      }])

      await syncStorageToDnr()

      expect(chrome.declarativeNetRequest.updateDynamicRules).toHaveBeenCalledWith({
        removeRuleIds: [ 3 ]
      })
    })
  })
})
