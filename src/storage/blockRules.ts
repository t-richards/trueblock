import { getNextID, ID_SEQUENCE_KEY } from './sequence'

export type BlockRule = {
  id: number
  domain: string
  note: string
  enabled: boolean
}

export type BlockRuleStorage = {
  [domain: string]: BlockRule
}

// Retrieves all block rules from storage.
export async function fetchAllRules(): Promise<BlockRuleStorage> {
  const rules = await chrome.storage.sync.get()
  // Exclude the non-rule ID sequence.
  delete rules[ID_SEQUENCE_KEY]

  // TODO(tom): Remove 'as' cast
  return rules as BlockRuleStorage
}

// Retrieves a single block rule from storage.
export async function fetchRule(domain: string): Promise<BlockRule | null> {
  const rules = await chrome.storage.sync.get([domain])
  if (typeof rules[domain] === 'undefined') {
    return null
  }

  // TODO(tom): Remove 'as' cast
  return rules[domain] as BlockRule
}

// Saves a single block rule to storage.
export async function updateRule(domain: string, note: string, enabled: boolean) {
  // Check if the rule exists.
  const existingRule = await fetchRule(domain)
  let id = null
  if (existingRule) {
    id = existingRule.id
  } else {
    id = await getNextID()
  }

  // Construct the new rule.
  const newRule: BlockRule = {
    id,
    domain,
    note,
    enabled,
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
