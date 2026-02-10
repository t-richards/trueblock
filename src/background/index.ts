import { type BlockRuleStorage, fetchAllRules } from '../storage/blockRules'

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
        chrome.declarativeNetRequest.ResourceType.WEBTRANSPORT,
        chrome.declarativeNetRequest.ResourceType.WEBBUNDLE,
        chrome.declarativeNetRequest.ResourceType.OTHER,
      ],
    },
  }
}

const applyRulesDiff = async (
  storageRules: BlockRuleStorage,
  existingRules: chrome.declarativeNetRequest.Rule[],
) => {
  const desiredRuleIds = new Set<number>()
  for (const rule of Object.values(storageRules)) {
    if (rule.enabled) {
      desiredRuleIds.add(rule.id)
    }
  }

  const existingRuleIds = new Set(existingRules.map((r) => r.id))

  const removeRuleIds = existingRules.filter((r) => !desiredRuleIds.has(r.id)).map((r) => r.id)

  const addRules: chrome.declarativeNetRequest.Rule[] = []
  for (const [domain, rule] of Object.entries(storageRules)) {
    if (rule.enabled && !existingRuleIds.has(rule.id)) {
      addRules.push(dnrBlockRule(rule.id, domain))
    }
  }

  if (removeRuleIds.length > 0 || addRules.length > 0) {
    await chrome.declarativeNetRequest.updateDynamicRules({
      ...(removeRuleIds.length > 0 && { removeRuleIds }),
      ...(addRules.length > 0 && { addRules }),
    })
  }
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
