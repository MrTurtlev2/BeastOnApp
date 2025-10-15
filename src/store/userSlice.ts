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
}

const initialState: UserState = {
    userData: null,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.userData = action.payload;
            state.isLoggedIn = true;
        },
        clearUser(state) {
            state.userData = null;
            state.isLoggedIn = false;
        },
    },
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
