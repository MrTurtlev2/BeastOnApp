import {useTranslation} from 'react-i18next';
import Layout from '../../common/layout/Layout';
import {View} from 'react-native';
import CustomInput from '../../common/customInput/CustomInput';
import {configureGoogleSignIn, handleGoogleLogin, handleLoginAsync} from '../../../api/Auth';
import {setUser} from '../../../store/userSlice';
import {loadTrainingPlans} from '../../../store/trainingPlansSlice';
import {useAppDispatch} from '../../../store';
import {useEffect, useRef, useState} from 'react';
import {IconFontEnum, ILottiePowerButtonRef, useAppNavigation} from '../../../constants/interfaces';
import LottiePowerButton from '../../common/lottiePowerButton/LottiePowerButton';
import ClawTitle from '../../common/clawTitle/ClawTitle';
import {IUserLoginState} from '../../../interfaces/userInterface';
import Separator from '../../common/separator/Separator';
import CustomButton from '../../common/cuctomBtn/CustomButton';
import CircleBtn from '../../common/CircleBtn/CircleBtn';
import GoogleSvg from '../../../assets/images/svg/buttons/GoogleSvg';
import {Colors} from '../../../constants/Colors';

export default function LoginScreen() {
    const {t} = useTranslation();
    const navigation = useAppNavigation<'Login'>();
    const dispatch = useAppDispatch();
    const [userLogin, setUserLogin] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const powerBtnRef = useRef<ILottiePowerButtonRef>(null);

    const setUserData = (res: IUserLoginState) => {
        dispatch(setUser(res));
        dispatch(loadTrainingPlans());
    };

    const onLogin = async () => {
        handleLoginAsync(userLogin, userPassword).then(res => {
            if (!res) {
                powerBtnRef.current?.resetAnimation();
                return;
            }
            setUserData(res);
        });
    };
    const onGoogleLogin = async () => {
        handleGoogleLogin().then(res => {
            if (!res) return;
            setUserData(res);
        });
    };

    useEffect(() => {
        configureGoogleSignIn();
    }, []);

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
                    iconName={'email'}
                    iconFont={IconFontEnum.MaterialIcons}
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
                    containerStyle={{marginBottom: 60}}
                    textContentType="password"
                    autoComplete="password"
                    secureTextEntry
                />
                <LottiePowerButton onPress={onLogin} ref={powerBtnRef} />
                <Separator text={t('loginBy')} style={{paddingHorizontal: 40, marginBottom: 30, marginTop: 40}} />
                <CircleBtn onPress={onGoogleLogin} icon={<GoogleSvg />} size={80} bgColor={Colors.overlay} />

                <CustomButton
                    text={t('register')}
                    onPress={() => navigation.navigate('Register')}
                    type={'secondary'}
                    style={{marginTop: 40}}
                />
            </View>
        </Layout>
    );
}
