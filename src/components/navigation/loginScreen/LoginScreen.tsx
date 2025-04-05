import {useTranslation} from 'react-i18next';
import Layout from '../../common/layout/Layout.tsx';
import {Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../common/customInput/CustomInput.tsx';
import i18n from '../../../language/i18n';
import PowerButton from '../../common/powerButton/PowerButton.tsx';
import {handleLoginAsync} from '../../../api/Auth.ts';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../../store/userSlice.ts';
import * as Keychain from 'react-native-keychain';
import {RootState} from '../../../store';

export default function LoginScreen() {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [userLogin, setUserLogin] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const user = useSelector((state: RootState) => state.user);
    console.log('user===================');
    console.log(user);
    const onLogin = async () => {
        handleLoginAsync().then(res => {
            console.log(res);
            dispatch(setUser(res.user));
        });
    };

    const onLogout = async () => {
        try {
            const credentials = await Keychain.getGenericPassword({
                service: 'userToken',
            });
            if (credentials) {
                console.log(
                    'Credentials successfully loaded for user ' +
                        credentials.password,
                );
            } else {
                console.log('No credentials stored');
            }
        } catch (e) {
            console.log('Something went wrong', e);
        }
    };

    return (
        <Layout hasBurger={false}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>{t('test')}</Text>
                <CustomInput
                    value={userLogin}
                    onChangeText={setUserLogin}
                    placeholder={i18n.t('email')}
                />
                <CustomInput
                    value={userPassword}
                    onChangeText={setUserPassword}
                    placeholder={i18n.t('password')}
                />
                <PowerButton onPress={onLogin} />
                <PowerButton onPress={() => onLogout()} />
            </View>
        </Layout>
    );
}
