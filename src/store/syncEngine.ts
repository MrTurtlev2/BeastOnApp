import NetInfo from '@react-native-community/netinfo';
import {store} from './index';
import api from '../api/config';
import {removeFromOutbox} from './outboxSlice';

let isSyncing = false;

export const triggerSync = async (): Promise<boolean> => {
    if (isSyncing) return false;

    const network = await NetInfo.fetch();
    if (!network.isConnected) return false;

    const state = store.getState();

    if (!state._persisted?.rehydrated) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    const queue = store.getState().outbox.queue;
    if (queue.length === 0) return true;

    isSyncing = true;

    const sortedQueue = [...queue].sort((a, b) => a.timestamp - b.timestamp);

    try {
        for (const item of sortedQueue) {
            await api.request({
                url: item.url,
                method: item.method,
                data: item.body,
            });
            store.dispatch(removeFromOutbox(item.id));
        }
        return true;
    } catch (error) {
        console.log('SyncEngine: Błąd sieci, przerywam synchronizację', error);
        return false;
    } finally {
        isSyncing = false;
    }
};
