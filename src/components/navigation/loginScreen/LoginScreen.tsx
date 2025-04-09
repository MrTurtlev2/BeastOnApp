import {useTranslation} from 'react-i18next';
import Layout from '../../common/layout/Layout.tsx';
import {Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../common/customInput/CustomInput.tsx';
import i18n from '../../../language/i18n';
import PowerButton from '../../common/powerButton/PowerButton.tsx';
import {handleLoginAsync} from '../../../api/Auth.ts';
import {setUser} from '../../../store/userSlice.ts';
import {loadTrainingPlans} from '../../../store/trainingPlansSlice.ts';
import {useAppDispatch} from '../../../store';

export default function LoginScreen() {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const [userLogin, setUserLogin] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');

    const onLogin = async () => {
        handleLoginAsync(userLogin, userPassword).then(res => {
            console.log(res);
            dispatch(setUser(res.user));
            dispatch(loadTrainingPlans());
        });
    };

    // const onLogout = async () => {
    //     try {
    //         const credentials = await Keychain.getGenericPassword({
    //             service: 'userToken',
    //         });
    //         if (credentials) {
    //             console.log(
    //                 'Credentials successfully loaded for user ' +
    //                     credentials.password,
    //             );
    //         } else {
    //             console.log('No credentials stored');
    //         }
    //     } catch (e) {
    //         console.log('Something went wrong', e);
    //     }
    // };

    return (
        <Layout hasBurger={false} bgImageType={'right-center'}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>{t('test')}</Text>
                <CustomInput value={userLogin} onChangeText={setUserLogin} placeholder={i18n.t('email')} />
                <CustomInput value={userPassword} onChangeText={setUserPassword} placeholder={i18n.t('password')} />
                <PowerButton onPress={onLogin} />
                {/*<PowerButton onPress={() => onLogout()} />*/}
            </View>
        </Layout>
    );
}
