import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const baseAppUrl: string = 'http://192.168.0.19:8080';

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

export default api;
