import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUserLoginState, IUserState} from '../interfaces/userInterface';

const initialState: IUserState = {
    userData: null,
    isLoggedIn: false,
    accessToken: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUserLoginState>) {
            console.log(action?.payload);
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
