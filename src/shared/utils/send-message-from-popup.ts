import { BaseChromeMessage } from '../types';

export const sendMessageFromPopupToAllTabs = async (msg: BaseChromeMessage) => {
    const tabs = await chrome.tabs.query({
        url: 'https://*.youtube.com/*',
    });

    await Promise.all(
        tabs.map(async (tab) => {
            tab.id && (await chrome.tabs.sendMessage(tab.id, msg));
        }),
    );
};
