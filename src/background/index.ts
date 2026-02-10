import { fetchAllRules, type BlockRuleStorage } from '../storage/blockRules'

const dnrBlockRule = (id: number, domain: string): chrome.declarativeNetRequest.Rule => {
  return {
    id: id,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
    },
    condition: {
      requestDomains: [domain],
      resourceTypes: [
        chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
        chrome.declarativeNetRequest.ResourceType.SUB_FRAME,
        chrome.declarativeNetRequest.ResourceType.STYLESHEET,
        chrome.declarativeNetRequest.ResourceType.SCRIPT,
        chrome.declarativeNetRequest.ResourceType.IMAGE,
        chrome.declarativeNetRequest.ResourceType.FONT,
        chrome.declarativeNetRequest.ResourceType.OBJECT,
        chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
        chrome.declarativeNetRequest.ResourceType.PING,
        chrome.declarativeNetRequest.ResourceType.CSP_REPORT,
        chrome.declarativeNetRequest.ResourceType.MEDIA,
        chrome.declarativeNetRequest.ResourceType.WEBSOCKET,
        chrome.declarativeNetRequest.ResourceType.OTHER,
      ],
    },
  }
}

const addRemainingRules = async (
  desiredRules: BlockRuleStorage,
  existingRules: chrome.declarativeNetRequest.Rule[],
) => {
  const rulesToAdd: chrome.declarativeNetRequest.Rule[] = []
  for (const [domain, rule] of Object.entries(desiredRules)) {
    if (existingRules.find((r) => r.id === rule.id) === undefined && rule.enabled) {
      rulesToAdd.push(dnrBlockRule(rule.id, domain))
    }
  }

  if (rulesToAdd.length > 0) {
    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: rulesToAdd,
    })
  }
}

const deleteUnusedRules = async (
  storageRules: BlockRuleStorage,
  existingRules: chrome.declarativeNetRequest.Rule[],
) => {
  const existingRuleIds = new Set<number>()
  const storageRuleIds = new Set<number>()

  for (const existingRule of existingRules) {
    existingRuleIds.add(existingRule.id)
  }

  for (const key in storageRules) {
    const rule = storageRules[key]
    if (rule.enabled) {
      storageRuleIds.add(rule.id)
    }
  }

  const difference = new Set<number>([...existingRuleIds].filter((x) => !storageRuleIds.has(x)))
  if (difference.size > 0) {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [...difference],
    })
  }
}

const applyRulesDiff = async (
  storageRules: BlockRuleStorage,
  existingRules: chrome.declarativeNetRequest.Rule[],
) => {
  // delete rules that are no longer in storage
  deleteUnusedRules(storageRules, existingRules)

  // construct rules that are not in storage
  addRemainingRules(storageRules, existingRules)
}

const syncStorageToDnr = async () => {
  // first get all rules from storage
  const desiredRules = await fetchAllRules()

  // then see which ones already exist
  const existingRules = await chrome.declarativeNetRequest.getDynamicRules()

  // handle which rules already exist and which ones to update
  await applyRulesDiff(desiredRules, existingRules)
}

// exports for testing
export { syncStorageToDnr }
