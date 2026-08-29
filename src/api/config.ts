import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import {navigationRef} from '../components/navigation/RootNavigation';
import {Toast} from 'toastify-react-native';
import * as SecureStore from 'expo-secure-store';
import {clearUser, setAccessToken} from '../store/userSlice';
import store from '../store';

export const baseAppUrl: string = 'http://192.168.0.41:8080';

const api = axios.create({
    baseURL: baseAppUrl,
});
let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        try {
            const refreshToken = await SecureStore.getItemAsync('refreshToken');

            if (!refreshToken) {
                return null;
            }

            const response = await axios.post(`${baseAppUrl}/api/auth/refresh-token`, {refreshToken});

            const newAccessToken = response?.data?.accessToken;

            if (!newAccessToken) {
                return null;
            }

            await SecureStore.setItemAsync('userToken', newAccessToken);
            store.dispatch(setAccessToken(newAccessToken));

            return newAccessToken;
        } catch (error) {
            return null;
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
};

const logout = async () => {
    store.dispatch(clearUser());

    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('refreshToken');
};

api.interceptors.request.use(config => {
    const token = store.getState().user?.accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    response => response,

    async (error: AxiosError) => {
        const originalReq = error.config as
            | (InternalAxiosRequestConfig & {
                  _retry?: boolean;
                  isSyncQueue?: boolean;
              })
            | undefined;

        const status = error.response?.status;

        const data = error.response?.data || {
            message: 'Nieznany błąd',
            status: 500,
            type: 'SERVER_ERROR',
        };

        if (
            status === 401 &&
            originalReq &&
            !originalReq._retry &&
            !originalReq.url?.includes('/api/auth/login') &&
            !originalReq.url?.includes('/api/auth/refresh-token')
        ) {
            originalReq._retry = true;

            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
                originalReq.headers.Authorization = `Bearer ${newAccessToken}`;

                return api.request(originalReq);
            }
            await logout();

            return Promise.reject(error);
        }

        if (!originalReq?.isSyncQueue) {
            if ((data as any)?.message) {
                Toast.show({
                    type: 'error',
                    text1: (data as any).message,
                });
            }

            if (navigationRef.isReady() && status === 500) {
                // @ts-ignore
                navigationRef.navigate('ErrorScreen', data);
            }
        }

        return Promise.reject(error);
    },
);

export default api;
