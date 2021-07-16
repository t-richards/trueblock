var rule: chrome.declarativeNetRequest.Rule = {
  id: 123,
  priority: 1,
  action: {
    type: "block"
  },
  condition: {
    urlFilter: "||youtube.com"
  }
}

var checkError = () => {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError.message)
  }
}

chrome.declarativeNetRequest.updateDynamicRules(
  { addRules: [rule] },
  checkError
)
