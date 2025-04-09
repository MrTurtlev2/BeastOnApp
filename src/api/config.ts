// config.ts
import axios from 'axios';
import * as Keychain from 'react-native-keychain';

export const baseAppUrl: string = 'http://192.168.0.19:8080';

const api = axios.create({
    baseURL: baseAppUrl,
});

api.interceptors.request.use(
    async config => {
        try {
            const credentials = await Keychain.getGenericPassword({service: 'userToken'});

            if (credentials) {
                config.headers.Authorization = `Bearer ${credentials.password}`;
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
