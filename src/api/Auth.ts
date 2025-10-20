import api, {baseAppUrl} from './config';
import * as SecureStore from 'expo-secure-store';

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
