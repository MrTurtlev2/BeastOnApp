import axios from 'axios';
import {baseAppUrl} from './config.ts';
import * as Keychain from 'react-native-keychain';

export const handleLoginAsync = async (
    customerName: string,
    password: string,
) => {
    try {
        const response = await axios.post(`${baseAppUrl}/api/auth/login`, {
            customerName,
            password,
        });
        if (response?.data) {
            await Keychain.setGenericPassword('user', response.data.token, {
                service: 'userToken',
            });
            return response.data;
        }
    } catch (err) {
        console.log(err);
    }
};
