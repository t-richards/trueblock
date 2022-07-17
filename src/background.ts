import { BlockRule } from "./storage/blockRules"
import { ID_SEQUENCE_KEY } from "./storage/sequence"

// first get all rules from storage
chrome.storage.sync.get(null, (rules) => {
  delete rules[ID_SEQUENCE_KEY]
  const keys = Object.keys(rules)

  // for all rules
  for (const k of keys) {
    const site = rules[k] as BlockRule
    const rule: chrome.declarativeNetRequest.Rule = {
      id: site.id,
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
