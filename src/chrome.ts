declare type Rule = {
    id: number;
    priority: number | undefined;
    action: RuleAction;
    condition: RuleCondition;
}

declare type RuleAction = {
    redirect: Redirect;
    requestHeaders: ModifyHeaderInfo[];
    responseHeaders: ModifyHeaderInfo[];
    type: RuleActionType;
}

declare type Redirect = {
    extensionPath: string;
    regexSubstitution: string;
    transform: URLTransform;
    url: string | undefined;
}

declare type URLTransform = {
    fragment: string | undefined;
    host: string | undefined;
    password: string | undefined;
    path: string | undefined;
    port: string | undefined;
    query: string | undefined;
    queryTransform: QueryTransform;
    scheme: string | undefined;
}

declare type QueryTransform = {
    addOrReplaceParams: QueryKeyValue[] | undefined;
    removeParams: string[] | undefined;
}

declare type QueryKeyValue = {
    key: string;
    value: string;
}

declare type ModifyHeaderInfo = {
    header: string;
    operation: HeaderOperation;
    value: string | undefined;
}

declare enum HeaderOperation {
    Append = "append",
    Remove = "remove",
    Set = "set",
}

declare enum RuleActionType {
    Allow = "allow",
    AllowAllRequests = "allowAllRequests",
    Block = "block",
    ModifyHeaders = "modifyHeaders",
    Redirect = "redirect",
    UpgradeScheme = "upgradeScheme",
}

declare type RuleCondition = {
    domainType: DomainType | undefined;
    domains: string[] | undefined;
    excludedDomains: string[] | undefined;
    excludedResourceTypes: ResourceType[] | undefined;
    isUrlFilterCaseSensitive: boolean | undefined;
    regexFilter: string | undefined;
    resourceTypes: ResourceType | undefined;
    urlFilter: string | undefined;
}

declare type UpdateRuleOptions = {
    addRules: Rule[];
    removeRuleIds: number[] | undefined;
}

declare namespace chrome.declarativeNetRequest {
    function getAvailableStaticRuleCount(callback: Function): void;
    function updateDynamicRules(options: UpdateRuleOptions, callback: Function): void;
} 
