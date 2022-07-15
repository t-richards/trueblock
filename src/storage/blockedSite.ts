export const RULES_KEY = 'rules'

export interface BlockedSite {
  id: number
  domain: string
  note: string
  enabled: boolean
}

export async function updateSite(domain: string, note: string) {
  const site: BlockedSite = {
    id: 123,
    domain,
    note,
    enabled: true
  }
  chrome.storage.sync.set({ [domain]: site })
}

export async function deleteSite(domain: string) {
  chrome.storage.sync.remove(domain)
}
