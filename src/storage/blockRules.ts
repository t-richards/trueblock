export const RULES_KEY = 'rules'

export interface BlockRule {
  id: number
  domain: string
  note: string
  enabled: boolean
}

export interface BlockRuleStorage {
  [domain: string]: BlockRule
}

export async function fetchRules(): Promise<BlockRuleStorage> {
  return chrome.storage.local.get()
}

export async function updateRule(domain: string, note: string) {
  const site: BlockRule = {
    id: 123,
    domain,
    note,
    enabled: true
  }
  chrome.storage.sync.set({ [domain]: site })

  return site
}

export async function deleteRule(domain: string) {
  return chrome.storage.sync.remove(domain)
}

export async function clearStorage() {
  return chrome.storage.sync.clear()
}
