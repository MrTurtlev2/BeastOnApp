import api, {baseAppUrl} from './config';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {clearUser, setAccessToken, setUser} from '../store/userSlice';
import store from '../store';
import {loadTrainingPlans} from '../store/trainingPlansSlice';

export const handleLoginAsync = async (customerName: string, password: string) => {
    try {
        const response = await api.post(`${baseAppUrl}/api/auth/login`, {
            customerName,
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
