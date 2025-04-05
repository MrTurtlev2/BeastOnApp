import axios from 'axios';
import {baseAppUrl} from './config.ts';

export const handleLogin = async () => {
    console.log('wchodze ');
    try {
        axios
            .post(`${baseAppUrl}/api/auth/login`, {
                customerName: 'Wera',
                password: 'MarekMarek',
            })
            .then(({data}) => {
                console.log(data);
                return data;
            })
            .catch(err => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
};
