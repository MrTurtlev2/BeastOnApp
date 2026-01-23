import {useTranslation} from 'react-i18next';
import Layout from '../../common/layout/Layout';
import {View} from 'react-native';
import CustomInput from '../../common/customInput/CustomInput';
import {handleLoginAsync} from '../../../api/Auth';
import {setAccessToken, setUser} from '../../../store/userSlice';
import {loadTrainingPlans} from '../../../store/trainingPlansSlice';
import {useAppDispatch} from '../../../store';
import {useRef, useState} from 'react';
import {IconFontEnum, ILottiePowerButtonRef} from '../../../constants/interfaces';
import LottiePowerButton from '../../common/lottiePowerButton/LottiePowerButton';
import ClawTitle from '../../common/clawTitle/ClawTitle';

export default function LoginScreen() {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const [userLogin, setUserLogin] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const powerBtnRef = useRef<ILottiePowerButtonRef>(null);
    const onLogin = async () => {
        handleLoginAsync(userLogin, userPassword).then(res => {
            if (!res) {
                powerBtnRef.current?.resetAnimation();
                return;
            }
            dispatch(setUser(res?.user));
            dispatch(setAccessToken(res?.accessToken));
            dispatch(loadTrainingPlans());
        });
    };

    return (
        <Layout hasBurger={false} bgImageType={'left-bottom'} customStyle={{paddingHorizontal: 20}}>
            <View
                style={{
                    paddingTop: 50,
                    flex: 1,
                    alignItems: 'center',
                }}>
                <ClawTitle text={'BeastMode'} type={'heading'} style={{height: 200}} />
                <CustomInput
                    value={userLogin}
                    onChangeText={setUserLogin}
                    placeholder={t('email')}
                    iconName={'person-fill'}
                    iconFont={IconFontEnum.Octicons}
                    containerStyle={{marginBottom: 30}}
                    textContentType="username"
                    autoComplete="username"
                    keyboardType="email-address"
                />
                <CustomInput
                    value={userPassword}
                    onChangeText={setUserPassword}
                    placeholder={t('password')}
                    iconName={'lock'}
                    iconFont={IconFontEnum.MaterialIcons}
                    containerStyle={{marginBottom: 80}}
                    textContentType="password"
                    autoComplete="password"
                    secureTextEntry
                />
                <LottiePowerButton onPress={onLogin} ref={powerBtnRef} />
            </View>
        </Layout>
    );
}
