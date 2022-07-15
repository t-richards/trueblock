import { BlockedSite } from "./storage/blockedSite"

// first get all rules from storage
chrome.storage.sync.get(null, (items) => {
  const keys = Object.keys(items)

  // for all rules
  for (const k of keys) {
    const site = items[k] as BlockedSite
    const rule: chrome.declarativeNetRequest.Rule = {
      id: site.id,
      priority: 1,
      action: {
        type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
      },
      condition: {
        urlFilter: `||${site.domain}`
      }
    }

    // add the rule
    chrome.declarativeNetRequest.updateDynamicRules(
      { addRules: [rule] },
      checkError
    )
  }

  // TODO(tom): Remove other ones that didn't match
  // TODO(tom): Use getDynamicRules to compute a diff?
})

const checkError = () => {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError.message)
  }
}
