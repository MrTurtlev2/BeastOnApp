// src/store/userSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface User {
    id: number;
    customerName: string;
    email: string;
    role: string;
}

interface UserState {
    userData: User | null;
}

const initialState: UserState = {
    userData: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            console.log(action.payload);
            state.userData = action.payload;
        },
        clearUser(state) {
            state.userData = null;
        },
    },
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
