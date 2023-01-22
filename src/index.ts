import { safelyGetFromSyncStorage, setToSyncStorage, waitForElementToRender } from './shared/utils';
import { ANNOYING_POPUP_CLASS, YOUTUBE_PLAYER_ID } from './shared/constants';
import { BaseChromeMessage, ChromeMessageTypes } from './shared/types/chrome-message-types';

(async () => {
    const player = (await waitForElementToRender(YOUTUBE_PLAYER_ID)) as HTMLElement;
    const buttonStatus = await safelyGetFromSyncStorage('buttonStatus');


    const popupsProxy = new Proxy<HTMLDivElement[]>([], {
        set: (target, property, value: HTMLDivElement) => {
            if (buttonStatus?.enabled && value instanceof HTMLDivElement) {
                value.style.visibility = 'hidden'
            }

            return Reflect.set(target, property, value);
        }
    });


    const initConfig: MutationObserverInit = {
        subtree: true,
        childList: true,
    };

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach((node) => {
                        if (
                            node instanceof HTMLDivElement &&
                            node.classList.contains(ANNOYING_POPUP_CLASS)
                        ) {
                            popupsProxy.push(node);
                        }
                    });
                }
            }
        }
    });

    observer.observe(player, initConfig);


    chrome.runtime.onMessage.addListener((msg: BaseChromeMessage) => {
        if (msg.type === ChromeMessageTypes.Disable_Hiding) {
            setToSyncStorage({
                buttonStatus: {
                    enabled: false
                },
            });

            for (const popup of popupsProxy) {
                popup.style.visibility = 'visible'
            }
        }

        if (msg.type === ChromeMessageTypes.Enable_Hiding) {
            setToSyncStorage({
                buttonStatus: {
                    enabled: true
                },
            });

            for (const popup of popupsProxy) {
                popup.style.visibility = 'hidden'
            }
        }

        return true;
    })


    window.onunload = (() => {
        observer.disconnect()
    })

})();
