import { safelyGetFromSyncStorage, setToSyncStorage, waitForElementToRender } from './shared/utils';
import { ANNOYING_POPUP_CLASS, YOUTUBE_PLAYER_ID } from './shared/constants';
import { BaseChromeMessage, ChromeMessageTypes } from './shared/types/chrome-message-types';

(async () => {
    const player = (await waitForElementToRender(YOUTUBE_PLAYER_ID)) as HTMLElement;
    const buttonStatus = await safelyGetFromSyncStorage('buttonStatus');

    const popupsProxy = new Proxy<HTMLDivElement[]>([], {
        set: (target, property, value: HTMLDivElement) => {
            if (buttonStatus?.enabled) {
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
        switch (msg.type) {
            case ChromeMessageTypes.DISABLE_POPUP_SHOW: {

                console.log('Disable')

                setToSyncStorage({
                    buttonStatus: {
                        enabled: false
                    },
                });

                for (const popup of popupsProxy) {
                    popup.style.visibility = 'hidden'
                }

                break
            }

            case ChromeMessageTypes.ENABLE_POPUP_SHOW: {

                console.log('Enable')

                setToSyncStorage({
                    buttonStatus: {
                        enabled: true
                    },
                });

                for (const popup of popupsProxy) {
                    popup.style.visibility = 'visible'
                }

                break;
            }

            default:
                break;
        }

         return true;
    })

})();
