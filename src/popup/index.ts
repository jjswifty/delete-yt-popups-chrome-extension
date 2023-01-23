import { safelyGetFromSyncStorage, setToSyncStorage } from '../shared/utils';
import { ChromeMessageTypes } from '../shared/types';
import { sendMessageFromPopupToAllTabs } from '../shared/utils/send-message-from-popup';

(async () => {
    const toggleButtonElement = document.querySelector('#crx-toggle-show') as HTMLInputElement;
    const buttonStatusFromStorage = await safelyGetFromSyncStorage('buttonStatus');

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

export {};
