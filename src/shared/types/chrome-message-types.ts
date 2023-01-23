export enum ChromeMessageTypes {
    Disable_Hiding = 'DISABLE_HIDING',
    Enable_Hiding = 'ENABLE_HIDING',
}

export type BaseChromeMessage = {
    type: ChromeMessageTypes;
};
