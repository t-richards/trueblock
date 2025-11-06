# TrueBlock

The simple website blocker which blocks websites and helps you remember why you blocked them.

This extension is a heavy-handed blocker whose purpose is to block entire domains. If you want more granular blocking control, we recommend using a different tool.

## Install

<a href="https://chrome.google.com/webstore/detail/trueblock/adcbggkgllkljeliabhgmmkmpebhdbno"><img src="https://user-images.githubusercontent.com/3905798/152878025-69a67c54-755c-4581-bc73-a99a70dd267d.png" alt="Get TrueBlock for Chrome"></a>

## Usage

First, visit the site you wish to block.

Then, click the extension icon (`T` for "TrueBlock") next to the address bar to open the extension.

![Extension popup](https://user-images.githubusercontent.com/3905798/179385077-deb83f57-6294-43af-bbc1-d285afcbe502.png)

The popup page will show the domain of the current tab. This is the domain that will be blocked.

Optionally, you may enter a reason for blocking the domain. 

Finally, click the "Add site to blocklist" button to block the domain.

You can visit the extension options page to view this note later, to remind yourself why you blocked the domain. Right-click the extension icon, then select "Options".

![Extension options](https://user-images.githubusercontent.com/3905798/181120139-872647f6-262d-49bd-9de4-968376111f10.png)

## For Developers

System requirements:

 - [Bun](https://bun.com/) `>= 1.3.1`
 - [Overmind](https://github.com/DarthSim/overmind)

Getting started:

1. Install dependencies
    ```bash
    bun install
    ```

2. Run build watcher

    ```bash
    bin/dev
    ```

3. Load the unpacked extension from the "dist" directory

    https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked

## Roadmap

General

 - [x] Show "Success" when adding new site to blocklist
 - [ ] Form validation?

## License

[MIT](./LICENSE).
