import { type SyncStorage, type SyncStorageProps } from '../types';

/**
 * Just sets value to sync storage. Typed.
 * @param prop Property to be set in the sync store.
 */
export const setToSyncStorage = async <T extends SyncStorageProps>(
    prop: Record<SyncStorageProps, SyncStorage[T]>,
) => {
    await chrome.storage.sync.set(prop);
};
