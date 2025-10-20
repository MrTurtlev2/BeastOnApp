import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {navigationRef} from '../components/navigation/RootNavigation';
import {Toast} from 'toastify-react-native';

export const baseAppUrl: string = 'http://192.168.0.16:8080';

const api = axios.create({
    baseURL: baseAppUrl,
});

api.interceptors.request.use(
    async config => {
        try {
            const token = await SecureStore.getItemAsync('userToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.warn('Błąd pobierania tokena z Keychain:', error);
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    response => response,
    error => {
        const data = error?.response?.data || {message: 'Nieznany bląd', status: 500, type: 'SERVER_ERROR'};
        const status = error?.response?.status;
        if (navigationRef.isReady() && status === 500) {
            navigationRef.navigate('ErrorScreen', data);
        } else if (data?.message) {
            console.log('TOAST');
            Toast.error(data?.message);
        } else {
            console.warn('Navigation not ready, cannot navigate to ErrorScreen yet.');
        }

        return Promise.reject(error);
    },
);

export default api;
