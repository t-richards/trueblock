/** The chrome.declarativeNetRequest API is used to block or modify network requests by specifying declarative rules. This lets extensions modify network requests without intercepting them and viewing their content, thus providing more privacy. */
declare namespace chrome.declarativeNetRequest {

    export interface Rule {
        /** An id which uniquely identifies a rule. Mandatory and should be >= 1. */
        id: number;
        /** Rule priority. Must be >= 1. */
        priority: number;
        /** The action to take if this rule is matched. */
        action: RuleAction;
        /** The condition under which this rule is triggered. */
        condition: RuleCondition;
    }

    export interface RuleAction {
        /** Describes how the redirect should be performed. Only valid for redirect rules. */
        redirect?: Redirect;
        /** The request headers to modify for the request. Only valid if RuleActionType is ModifyHeaders. */
        requestHeaders?: ModifyHeaderInfo[];
        /** The response headers to modify for the request. Only valid if RuleActionType is ModifyHeaders. */
        responseHeaders?: ModifyHeaderInfo[];
        /** The type of action to perform. */
        type: RuleActionType;
    }

    export interface Redirect {
        /** Path relative to the extension directory. Should start with '/'. */
        extensionPath: string;
        /** Substitution pattern for rules which specify a regexFilter. The first match of regexFilter within the URL will be replaced with this pattern. Within regexSubstitution, backslash-escaped digits (\1 to \9) can be used to insert the corresponding capture groups. \0 refers to the entire matching text. */
        regexSubstitution: string;
        /** URL transformations to perform. */
        transform: URLTransform;
        /** The redirect URL. Redirects to JavaScript URLs are not allowed. */
        url?: string;
    }

    export interface URLTransform {
        /** The new fragment for the request. Should be either empty, in which case the existing fragment is cleared; or should begin with '#'. */
        fragment?: string;
        /** The new host for the request. */
        host?: string;
        /** The new password for the request. */
        password?: string;
        /** The new path for the request. If empty, the existing path is cleared. */
        path?: string;
        /** The new port for the request. If empty, the existing port is cleared. */
        port?: string;
        /** The new query for the request. Should be either empty, in which case the existing query is cleared; or should begin with '?'. */
        query?: string;
        /** Add, remove or replace query key-value pairs. */
        queryTransform?: QueryTransform;
        /** The new scheme for the request. Allowed values are "http", "https", "ftp" and "chrome-extension". */
        scheme?: string;
        /** The new username for the request. */
        username?: string;
    }

    export interface QueryTransform {
        /** The list of query key-value pairs to be added or replaced. */
        addOrReplaceParams?: QueryKeyValue[];
        /** The list of query keys to be removed. */
        removeParams?: string[];
    }

    export interface QueryKeyValue {
        key: string;
        value: string;
    }

    export interface ModifyHeaderInfo {
        /** The name of the header to be modified. */
        header: string;
        /** The operation to be performed on a header */
        operation: HeaderOperation;
        /** The new value for the header. Must be specified for Append and Set operations */
        value?: string;
    }

    export interface RuleCondition {
        /** Specifies whether the network request is first-party or third-party to the domain from which it originated. If omitted, all requests are accepted. */
        domainType?: DomainType;
        /** The rule will only match network requests originating from the list of domains. If the list is omitted, the rule is applied to requests from all domains. An empty list is not allowed. */
        domains?: string[];
        /** The rule will not match network requests originating from the list of excludedDomains. If the list is empty or omitted, no domains are excluded. This takes precedence over domains. */
        excludedDomains?: string[];
        /** List of resource types which the rule won't match. Only one of resourceTypes and excludedResourceTypes should be specified. If neither of them is specified, all resource types except "main_frame" are blocked. */
        excludedResourceTypes?: ResourceType[];
        /** Whether the urlFilter or regexFilter (whichever is specified) is case sensitive. Default is true. */
        isUrlFilterCaseSensitive?: boolean;
        /** Regular expression to match against the network request url. This follows the RE2 syntax. */
        regexFilter?: string;
        /** List of resource types which the rule can match. An empty list is not allowed. */
        resourceTypes?: ResourceType;
        /** The pattern which is matched against the network request url. */
        urlFilter?: string;
    }

    export interface UpdateRuleOptions {
        /** Rules to add. */
        addRules: Rule[];
        /** IDs of the rules to remove. Any invalid IDs will be ignored. */
        removeRuleIds?: number[];
    }

    /** The possible operations for a "modifyHeaders" rule. */
    export type HeaderOperation = "append" | "set" | "remove"

    /** The kind of action to take if a given RuleCondition matches. */
    export type RuleActionType = "allow" | "allowAllRequests" | "block" | "modifyHeaders" | "redirect" | "upgradeScheme"

    /** Whether the request is first or third party to the frame in which it originated. A request is said to be first party if it has the same domain (eTLD+1) as the frame in which the request originated. */
    export type DomainType = "firstParty" | "thirdParty"

    /** The resource type of the network request. */
    export type ResourceType = "csp_report" | "font" | "image" | "main_frame" | "media" | "object" | "other" | "ping" | "script" | "stylesheet" | "sub_frame" | "websocket" | "xmlhttprequest"

    // Functions

    /** Returns the number of static rules an extension can enable before the global static rule limit is reached. */
    export function getAvailableStaticRuleCount(callback: Function): void;
    /** Modifies the current set of dynamic rules for the extension. The rules with IDs listed in options.removeRuleIds are first removed, and then the rules given in options.addRules are added. */
    export function updateDynamicRules(options: UpdateRuleOptions, callback: Function): void;
} 
