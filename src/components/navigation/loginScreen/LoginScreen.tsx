import {useTranslation} from 'react-i18next';
import Layout from '../../common/layout/Layout';
import {Pressable, Text, View} from 'react-native';
import CustomInput from '../../common/customInput/CustomInput';
import {configureGoogleSignIn, handleGoogleLogin, handleLoginAsync} from '../../../api/Auth';
import {setUser} from '../../../store/userSlice';
import {useAppDispatch} from '../../../store';
import {useEffect, useRef, useState} from 'react';
import {IconFontEnum, ILottiePowerButtonRef} from '../../../constants/interfaces';
import LottiePowerButton from '../../common/lottiePowerButton/LottiePowerButton';
import ClawTitle from '../../common/clawTitle/ClawTitle';
import {IUserLoginState} from '../../../interfaces/userInterface';
import Separator from '../../common/separator/Separator';
import CircleBtn from '../../common/CircleBtn/CircleBtn';
import GoogleSvg from '../../../assets/images/svg/buttons/GoogleSvg';
import {Colors} from '../../../constants/Colors';
import {useAppNavigation} from '../../../constants/NavigationInterface';
import {style} from './Style';
import {fetchTrainingPlans} from '../../../api/TrainingShedule';
import {Toast} from 'toastify-react-native';

export default function LoginScreen() {
    const {t} = useTranslation();
    const navigation = useAppNavigation<'Login'>();
    const dispatch = useAppDispatch();
    const [userLogin, setUserLogin] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const powerBtnRef = useRef<ILottiePowerButtonRef>(null);

    const setUserData = async (res: IUserLoginState) => {
        dispatch(setUser(res));
        try {
            await dispatch(fetchTrainingPlans()).unwrap();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error,
            });
        }
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
        <Layout hasBurger={false} bgImageType={'left-bottom'} horizontalSpace>
            <View style={style.container}>
                <ClawTitle text={'BeastMode'} type={'heading'} style={{height: 200}} />
                <CustomInput
                    value={userLogin}
                    onChangeText={setUserLogin}
                    placeholder={t('email')}
                    iconName={'email'}
                    iconFont={IconFontEnum.MaterialIcons}
                    containerStyle={style.loginInput}
                    textContentType="username"
                    autoComplete="username"
                    keyboardType="email-address"
                    importantForAutofill={'yes'}
                />
                <CustomInput
                    value={userPassword}
                    onChangeText={setUserPassword}
                    placeholder={t('password')}
                    iconName={'lock'}
                    iconFont={IconFontEnum.MaterialIcons}
                    containerStyle={style.passwordInput}
                    textContentType="password"
                    autoComplete="password"
                    secureTextEntry
                    importantForAutofill={'yes'}
                />
                <LottiePowerButton onPress={onLogin} ref={powerBtnRef} />
                <Separator text={t('loginBy')} />
                <CircleBtn onPress={onGoogleLogin} icon={<GoogleSvg />} size={80} bgColor={Colors.overlay} />
                
                <Pressable onPress={() => navigation.navigate('Register')} style={style.registerBtn}>
                    <Text style={{color: Colors.pink}}>{t('register')}</Text>
                    <View
                        style={{
                            backgroundColor: Colors.pink,
                            height: 1,
                            width: '100%',
                        }}
                    />
                </Pressable>
            </View>
        </Layout>
    );
}
