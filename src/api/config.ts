import axios from 'axios';
import {navigationRef} from '../components/navigation/RootNavigation';
import {Toast} from 'toastify-react-native';
import store from '../store';
import * as SecureStore from 'expo-secure-store';
import {clearUser, setAccessToken} from '../store/userSlice';

export const baseAppUrl: string = 'http://192.168.0.20:8080';

const api = axios.create({
    baseURL: baseAppUrl,
});

api.interceptors.request.use(config => {
    const token = store.getState().user?.accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalReq = error.config;
        const status = error?.response?.status;
        const data = error?.response?.data || {message: 'Nieznany błąd', status: 500, type: 'SERVER_ERROR'};

        if (status === 401 && !originalReq._retry && !originalReq.url?.includes('/api/auth/login')) {
            originalReq._retry = true;
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            if (refreshToken) {
                try {
                    const response = await axios.post(`${baseAppUrl}/api/auth/refresh-token`, {refreshToken});
                    const newAccessToken = response?.data?.accessToken;
                    store.dispatch(setAccessToken(newAccessToken));
                    await SecureStore.setItemAsync('userToken', newAccessToken);

                    originalReq.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axios(originalReq);
                } catch {
                    store.dispatch(clearUser());
                    await SecureStore.deleteItemAsync('userToken');
                    await SecureStore.deleteItemAsync('refreshToken');
                    return Promise.reject(error);
                }
            }
        }
        console.log(data);
        if (data?.message)
            Toast.show({
                type: 'error',
                text1: data?.message,
                // useModal: false,
            });

        if (navigationRef.isReady() && status === 500) {
            // @ts-ignore
            navigationRef.navigate('ErrorScreen', data);
        }

        return Promise.reject(error);
    },
);

export default api;
