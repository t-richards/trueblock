// 
const setRules = () => {
    const rule: Rule = {
        id: 1,
        priority: 1,
        action: {
            type: "block"
        },
        condition: {
            domains: [
                "||youtube.com",
            ]
        }
    }

    chrome.declarativeNetRequest.getAvailableStaticRuleCount((cnt) => {
        console.log(cnt)
    })

    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [ rule ]
    }, () => {
        console.log(this)
    })
}

// Entrypoint
chrome.runtime.onStartup.addListener(setRules)
