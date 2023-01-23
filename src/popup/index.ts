import { safelyGetFromSyncStorage, setToSyncStorage } from '../shared/utils';
import { ChromeMessageTypes } from '../shared/types';
import { sendMessageFromPopupToAllTabs } from '../shared/utils/send-message-from-popup';

(async () => {
    const toggleButtonElement = document.querySelector('#crx-toggle-show') as HTMLInputElement;
    const root = document.querySelector('#app') as HTMLDivElement;

    const buttonStatusFromStorage = await safelyGetFromSyncStorage('buttonStatus');

    chrome.tabs.query({ active: true }, tabs => {
        const url = tabs[0].url;

        if (!url) {
            return
        }

        if (!url.includes('youtube.com')) {
            const warnText = document.createElement('p')

            warnText.textContent = 'You are not on YouTube.'
            warnText.classList.add('app_warn-text')

            root.replaceChildren(warnText)
        }
    });


    if (buttonStatusFromStorage) {
        toggleButtonElement.checked = buttonStatusFromStorage.enabled;
    } else {
        toggleButtonElement.checked = false;

        await setToSyncStorage({
            buttonStatus: {
                enabled: toggleButtonElement.checked,
            },
        });
    }

    toggleButtonElement.onclick = async () => {
        await sendMessageFromPopupToAllTabs({
            type: toggleButtonElement.checked
                ? ChromeMessageTypes.Enable_Hiding
                : ChromeMessageTypes.Disable_Hiding,
        });
    };
})();

