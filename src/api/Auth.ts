import api, {baseAppUrl} from './config';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {clearUser, setAccessToken, setUser} from '../store/userSlice';
import store from '../store';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import NetInfo from '@react-native-community/netinfo';

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
export const handleRegisterAsync = async (email: string, password: string) => {
    try {
        const response = await api.post(`${baseAppUrl}/api/auth/register`, {
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
    const refreshToken = await SecureStore.getItemAsync('refreshToken');

    const state = store.getState();

    const userData = state.user.userData;
    const accessToken = state.user.accessToken;

    if (!refreshToken || !userData) {
        return false;
    }

    const network = await NetInfo.fetch();

    // OFFLINE
    if (!network.isConnected) {
        console.log('Offline — używam lokalnej sesji');
        store.dispatch(
            setUser({
                user: userData,
                accessToken: accessToken ?? '',
            }),
        );
        return true;
    }

    // online
    try {
        const response = await axios.post(`${baseAppUrl}/api/auth/refresh-token`, {refreshToken});

        const newAccessToken = response?.data?.accessToken;
        const backendUser = response?.data?.user;

        if (!newAccessToken) {
            throw new Error('Brak access token po refreshu');
        }

        await SecureStore.setItemAsync('userToken', newAccessToken);

        store.dispatch(setAccessToken(newAccessToken));

        if (backendUser) {
            store.dispatch(
                setUser({
                    user: backendUser,
                    accessToken: newAccessToken,
                }),
            );
        }

        console.log('Auto-login udany');

        return true;
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
        offlineAccess: true,
        forceCodeForRefreshToken: false,
    });
};

export const handleGoogleLogin = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const response = await GoogleSignin.signIn(); // idToken, scopes, user:{email, familyName, givenName, id, name, photo}
        const idToken = response?.data?.idToken || response.idToken;
        console.log(response);
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
