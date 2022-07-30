import { syncStorageToDnr } from "./background"

// Registers event handlers and runs the initial synchronization
// between storage and the declarativeNetRequest rules.
chrome.storage.onChanged.addListener(syncStorageToDnr)
chrome.declarativeNetRequest.setExtensionActionOptions({
  displayActionCountAsBadgeText: true
})

syncStorageToDnr()
