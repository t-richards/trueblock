import { getNextID, ID_SEQUENCE_KEY } from './sequence'

export interface BlockRule {
  id: number
  domain: string
  note: string
  enabled: boolean
}

export interface BlockRuleStorage {
  [domain: string]: BlockRule
}

// Retrieves all block rules from storage.
export async function fetchAllRules(): Promise<BlockRuleStorage> {
  const rules = await chrome.storage.sync.get()
  // Exclude the non-rule ID sequence.
  delete rules[ID_SEQUENCE_KEY]
  return rules
}

// Retrieves a single block rule from storage.
export async function fetchRule(domain: string): Promise<BlockRule | null> {
  const rules = await chrome.storage.sync.get([domain])
  if (typeof rules[domain] === 'undefined') {
    return null
  }
  return rules[domain]
}

// Saves a single block rule to storage.
export async function updateRule(domain: string, note: string) {
  // Check if the rule exists.
  const existingRule = await fetchRule(domain)
  let id = null
  if (existingRule !== null) {
    id = existingRule.id
  } else {
    id = await getNextID()
  }

  // Construct the new rule.
  const newRule: BlockRule = {
    id,
    domain,
    note,
    enabled: true
  }

  // Save the rule.
  await chrome.storage.sync.set({ [domain]: newRule })

  // Return the new rule.
  return newRule
}

// Deletes a single block rule from storage.
export async function deleteRule(domain: string) {
  return chrome.storage.sync.remove(domain)
}

// Deletes all storage for the extension.
export async function clearStorage() {
  return chrome.storage.sync.clear()
}
