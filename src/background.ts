import { BlockRuleStorage } from "./storage/blockRules"
import { ID_SEQUENCE_KEY } from "./storage/sequence"

const dnrBlockRule = (id: number, domain: string): chrome.declarativeNetRequest.Rule => {
  return {
    id: id,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.BLOCK
    },
    condition: {
      urlFilter: `||${domain}`
    }
  }
}

const addRemainingRules = async (
  desiredRules: BlockRuleStorage,
  existingRules: chrome.declarativeNetRequest.Rule[]
) => {
  const rulesToAdd: chrome.declarativeNetRequest.Rule[] = []
  for (const [domain, rule] of Object.entries(desiredRules)) {
    if (existingRules.find(r => r.id === rule.id) === undefined && rule.enabled) {
      rulesToAdd.push(dnrBlockRule(rule.id, domain))
    }
  }

  if (rulesToAdd.length > 0) {
    await chrome.declarativeNetRequest.updateDynamicRules(
      { addRules: rulesToAdd }
    )
  }
}

const deleteUnusedRules = async (
  storageRules: BlockRuleStorage,
  existingRules: chrome.declarativeNetRequest.Rule[]
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

  const difference = new Set<number>([...existingRuleIds].filter(x => !storageRuleIds.has(x)))
  if (difference.size > 0) {
    await chrome.declarativeNetRequest.updateDynamicRules(
      { removeRuleIds: [...difference] }
    )
  }
}

const applyRulesDiff = async (
  storageRules: BlockRuleStorage,
  existingRules: chrome.declarativeNetRequest.Rule[]
) => {
  // delete rules that are no longer in storage
  deleteUnusedRules(storageRules, existingRules)

  // construct rules that are not in storage
  addRemainingRules(storageRules, existingRules)
}

const handleGranularStorageChange = async (changes: object, _areaName: string) => {
  console.log('Storage changes detected: ', changes)
}

// Main registers event handlers and runs the initial synchronization
// between storage and the declarativeNetRequest rules.
const main = async () => {
  // register event listeners
  chrome.storage.onChanged.addListener(handleGranularStorageChange)

  // first get all rules from storage
  const desiredRules = await chrome.storage.sync.get() as BlockRuleStorage
  delete desiredRules[ID_SEQUENCE_KEY]

  // then see which ones already exist
  const existingRules = await chrome.declarativeNetRequest.getDynamicRules()

  // handle which rules already exist and which ones to update
  await applyRulesDiff(desiredRules, existingRules)
}

// entry point
main()
