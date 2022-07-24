# TrueBlock

The simple website blocker which blocks websites and reminds you why you blocked them.

This extension is a heavy-handed blocker whose purpose is to block entire domains. If you want more granular blocking control, we recommend using a different tool.

## Roadmap

UI
 - [x] Popup page -> sync storage
 - [x] Sync storage -> popup page
 - [ ] Validation states
 - [ ] Saved notification

UI
 - [x] Options page -> sync storage
 - [ ] Sync storage -> options page

Background
 - [ ] Sync storage -> declarativeNetRequest rules
 - [ ] Storage changes -> declarativeNetRequest rules

## Install

<a href="https://chrome.google.com/webstore/detail/adcbggkgllkljeliabhgmmkmpebhdbno"><img src="https://user-images.githubusercontent.com/3905798/152878025-69a67c54-755c-4581-bc73-a99a70dd267d.png" alt="Get TrueBlock for Chrome"></a>

## Usage

First, visit the site you wish to block.

Then, click the extension icon (`T` for "TrueBlock") next to the address bar to open the extension.

![Extension popup](https://user-images.githubusercontent.com/3905798/179385077-deb83f57-6294-43af-bbc1-d285afcbe502.png)

The popup page will show the domain of the current tab. This is the domain that will be blocked.

Optionally, you may enter a reason for blocking the domain. In the future, the extension will show a notification when the domain is blocked, and it will show you this reason to help you remember why you blocked it.

Finally, click the "Add site to blocklist" button to block the domain.


## For Developers

System requirements:

 - Node.js `>= 18.6.0`
 - NPM `>= 8.14`
 - [Overmind](https://github.com/DarthSim/overmind)

Getting started:

1. Install dependencies
    ```bash
    npm install
    ```

2. Run build watcher

    ```bash
    bin/dev
    ```

3. Load the unpacked extension from the "dist" directory

    https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked


## License

[MIT](./LICENSE).
