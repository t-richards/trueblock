const rule: chrome.declarativeNetRequest.Rule = {
  id: 123,
  priority: 1,
  action: {
    type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
  },
  condition: {
    urlFilter: "||youtube.com"
  }
}

const checkError = () => {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError.message)
  }
}

chrome.declarativeNetRequest.updateDynamicRules(
  { addRules: [rule] },
  checkError
)
