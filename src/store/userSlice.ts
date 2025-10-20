import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface User {
    id: number;
    customerName: string;
    email: string;
    role: string;
}

interface UserState {
    userData: User | null;
    isLoggedIn: boolean;
    accessToken: string | null;
}

const initialState: UserState = {
    userData: null,
    isLoggedIn: false,
    accessToken: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{user: User; accessToken: string}>) {
            state.userData = action?.payload?.user;
            state.accessToken = action?.payload?.accessToken;
            state.isLoggedIn = true;
        },
        clearUser(state) {
            state.userData = null;
            state.accessToken = null;
            state.isLoggedIn = false;
        },
        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action?.payload;
        },
    },
});

export const {setUser, clearUser, setAccessToken} = userSlice.actions;
export default userSlice.reducer;
