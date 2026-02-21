import api, {baseAppUrl} from './config';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {clearUser, setAccessToken, setUser} from '../store/userSlice';
import store from '../store';
import {loadTrainingPlans} from '../store/trainingPlansSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const handleLoginAsync = async (email: string, password: string) => {
    try {
        const response = await api.post(`${baseAppUrl}/api/auth/login`, {
            email,
            password,
        });
        if (response?.data) {
            console.log(response.data);
            await SecureStore.setItemAsync('refreshToken', response?.data?.refreshToken);
            return response?.data;
        }
    } catch (err) {
        console.log(err.response.data);
        return null;
    }
};

export const handleAutoLogin = async () => {
    try {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (!refreshToken) {
            console.log('Brak refreshToken — autologowanie pominięte');
            return false;
        }
        const response = await axios.post(`${baseAppUrl}/api/auth/refresh-token`, {refreshToken});
        const newAccessToken = response?.data?.accessToken;
        const userData = response?.data?.user;

        if (newAccessToken) {
            await SecureStore.setItemAsync('userToken', newAccessToken);
            store.dispatch(setAccessToken(newAccessToken));
            if (userData) {
                store.dispatch(setUser(userData));
                store.dispatch(loadTrainingPlans());
            }
            console.log('Auto-login udany');
            return true;
        }

        return false;
    } catch (error) {
        console.log('Auto-login nieudany:', error);
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('refreshToken');
        store.dispatch(clearUser());
        return false;
    }
};

export const configureGoogleSignIn = () => {
    GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
        offlineAccess: true, // jeśli chcesz refresh token
        forceCodeForRefreshToken: false,
    });
};

export const handleGoogleLogin = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const response = await GoogleSignin.signIn(); // idToken, scopes, user:{email, familyName, givenName, id, name, photo}
        const idToken = response?.data?.idToken || response.idToken;
        console.log(idToken);
        if (!idToken) {
            throw new Error('Nie udało się pobrać idTokena z Google');
        }
        // TODO: send user information next to idToken to let backend fill user info DTO
        const ownBackendResponse = await axios.post(`${baseAppUrl}/api/auth/google-login`, {idToken});

        if (ownBackendResponse?.data) {
            console.log(ownBackendResponse.data);
            await SecureStore.setItemAsync('refreshToken', ownBackendResponse?.data?.refreshToken);
            return ownBackendResponse?.data;
        }
    } catch (e) {
        console.error(e);
    }
};
