import {baseAppUrl} from './config';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export const handleLoginAsync = async (customerName: string, password: string) => {
    try {
        const response = await axios.post(`${baseAppUrl}/api/auth/login`, {
            customerName,
            password,
        });
        if (response?.data) {
            await SecureStore.setItemAsync('userToken', response.data.token);
            return response?.data;
        }
    } catch (err) {
        console.log(err.response.data);
        return null;
    }
};
