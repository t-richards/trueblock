// 
const setRules = () => {
    const rule = {
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
    })
}

// Entrypoint
chrome.runtime.onStartup.addListener(setRules)
