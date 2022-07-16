import { BlockRule } from "./storage/blockRules"

// first get all rules from storage
chrome.storage.sync.get(null, (rules) => {
  const keys = Object.keys(rules)

  // for all rules
  for (const k of keys) {
    const site = rules[k] as BlockRule
    const rule: chrome.declarativeNetRequest.Rule = {
      id: site.id,
      priority: 1,
      action: {
        type: chrome.declarativeNetRequest.RuleActionType.BLOCK
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
