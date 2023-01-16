export enum ChromeMessageTypes {
    DISABLE_POPUP_SHOW = 'DISABLE_POPUP_SHOW',
    ENABLE_POPUP_SHOW = 'ENABLE_POPUP_SHOW',
}

export type BaseChromeMessage = {
    type: ChromeMessageTypes
}