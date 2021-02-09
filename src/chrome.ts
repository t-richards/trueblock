declare type Rule {
    action: string;
    condition: string;
    id: number;
    priority: number?;
}

declare type UpdateRuleOptions {
    addRules: Rule[],
    removeRuleIds: number[] | undefined
}

declare namespace chrome.declarativeNetRequest {
    function getAvailableStaticRuleCount(callback: Function): void;
    function updateDynamicRules(options: UpdateRuleOptions, callback: Function): void;
} 
