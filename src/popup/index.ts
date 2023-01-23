import { safelyGetFromSyncStorage, setToSyncStorage } from '../shared/utils';
import { ChromeMessage } from '../shared/types';

(async () => {
    const toggleButton = document.querySelector('#crx-toggle-show') as HTMLInputElement;

    const buttonStatus = await safelyGetFromSyncStorage('buttonStatus');

    if (buttonStatus) {
        toggleButton.checked = buttonStatus.enabled;

        toggleButton.onclick = async () => {
            await chrome.runtime.sendMessage({
                type: buttonStatus.enabled
                    ? ChromeMessage.ENABLE_POPUP_SHOW
                    : ChromeMessage.DISABLE_POPUP_SHOW,
            });
            await setToSyncStorage({
                buttonStatus,
            });
        };
    } else {
        toggleButton.checked = false;

        toggleButton.onclick = async () => {
            await chrome.runtime.sendMessage({
                type: ChromeMessage.DISABLE_POPUP_SHOW,
            });
            await setToSyncStorage({
                buttonStatus: {
                    enabled: false,
                },
            });
        };
    }
})();

export {};
