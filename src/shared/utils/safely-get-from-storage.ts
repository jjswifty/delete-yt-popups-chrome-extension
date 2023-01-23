import { type SyncStorage, type SyncStorageProps } from '../types';

/**
 * Picks up safely data from sync storage by prop.
 * @param prop Property to get from sync storage.
 * @return Data from sync storage, if it exists, otherwise null.
 */
export const safelyGetFromSyncStorage = async <T extends SyncStorageProps>(
    prop: T,
): Promise<SyncStorage[T] | null> => {
    const valueFromSyncStorage = await chrome.storage.sync.get(prop);

    if (Object.keys(valueFromSyncStorage).length > 0) {
        return valueFromSyncStorage[prop];
    }

    return null;
};
