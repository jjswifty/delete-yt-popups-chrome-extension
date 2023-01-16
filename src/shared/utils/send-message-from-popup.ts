import { BaseChromeMessage } from '../types/chrome-message-types';

export const sendMessageFromPopupToAllTabs = async (msg: BaseChromeMessage) => {
    // const tabs = await chrome.tabs.query({
    //     currentWindow: true,
    //     active: true
    // });
    //  все работает тут
    // for (const tab of tabs) {
    //     if (tab.id) {
    //         await chrome.tabs.sendMessage(tab.id, msg);
    //     }
    // }

    const tabs = await chrome.tabs.query({
        lastFocusedWindow: true,
        active: true,
        url: 'https://*.youtube.com/*'
    });

    for (const tab of tabs) {
        if (tab.id) {
            await chrome.tabs.sendMessage(tab.id, msg);
        }
    }

}