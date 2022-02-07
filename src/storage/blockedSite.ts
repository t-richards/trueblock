
export interface BlockedSite {
  id: number
  domain: string
  note: string
  enabled: boolean
}

export async function updateSite(site: BlockedSite) {
  chrome.storage.sync.set({ [site.domain]: site })
}

export async function deleteSite(domain: string) {
  chrome.storage.sync.remove(domain)
}
