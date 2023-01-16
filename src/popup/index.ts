import { safelyGetFromSyncStorage, setToSyncStorage } from '../shared/utils';
import { ChromeMessageTypes } from '../shared/types';
import { sendMessageFromPopupToAllTabs } from '../shared/utils/send-message-from-popup';

(async () => {
    const toggleButtonElement = document.querySelector('#crx-toggle-show') as HTMLInputElement;
    const buttonStatusFromStorage = await safelyGetFromSyncStorage('buttonStatus');

    console.log(buttonStatusFromStorage, 'buttonStatusFromStorage')

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
                ? ChromeMessageTypes.ENABLE_POPUP_SHOW
                : ChromeMessageTypes.DISABLE_POPUP_SHOW,
        });
    };

    /**
     * Похоже проблемы с асинхронностью. (не сетается значение)
     * Вынести setToSyncStorage из content в background.
     * Хотя content живет, даже если попап умирает.
     * Надо разобраться.
     */

})();

export {};
