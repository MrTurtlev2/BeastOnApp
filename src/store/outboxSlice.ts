import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';

export interface OutboxItem {
    id: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: any;
    timestamp: number;
}

interface OutboxState {
    queue: OutboxItem[];
}

const initialState: OutboxState = {
    queue: [],
};

const outboxSlice = createSlice({
    name: 'outbox',
    initialState,
    reducers: {
        addToOutbox: (state, action: PayloadAction<Omit<OutboxItem, 'id' | 'timestamp'>>) => {
            state.queue.push({
                id: nanoid(),
                timestamp: Date.now(),
                ...action.payload,
            });
        },
        removeFromOutbox: (state, action: PayloadAction<string>) => {
            state.queue = state.queue.filter(item => item.id !== action.payload);
        },
    },
});

export const {addToOutbox, removeFromOutbox} = outboxSlice.actions;
export default outboxSlice.reducer;
