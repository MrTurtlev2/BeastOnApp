import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../store';
import {useEffect, useRef, useState} from 'react';
import {IconFontEnum, ILottiePowerButtonRef} from '../../../constants/interfaces';
import {IUserLoginState} from '../../../interfaces/userInterface';
import {setUser} from '../../../store/userSlice';
import {loadTrainingPlans} from '../../../store/trainingPlansSlice';
import {configureGoogleSignIn, handleGoogleLogin, handleRegisterAsync} from '../../../api/Auth';
import Layout from '../../common/layout/Layout';
import {View} from 'react-native';
import ClawTitle from '../../common/clawTitle/ClawTitle';
import CustomInput from '../../common/customInput/CustomInput';
import LottiePowerButton from '../../common/lottiePowerButton/LottiePowerButton';
import Separator from '../../common/separator/Separator';
import GoogleSvg from '../../../assets/images/svg/buttons/GoogleSvg';
import CircleBtn from '../../common/CircleBtn/CircleBtn';
import {Colors} from '../../../constants/Colors';

const RegisterScreen = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const [userLogin, setUserLogin] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const powerBtnRef = useRef<ILottiePowerButtonRef>(null);

    const setUserData = (res: IUserLoginState) => {
        dispatch(setUser(res));
        dispatch(loadTrainingPlans());
    };

    const onRegister = async () => {
        handleRegisterAsync(userLogin, userEmail, userPassword).then(res => {
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
        <Layout hasBackArrow={true} bgImageType={'left-bottom'} customStyle={{paddingHorizontal: 20}}>
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
                    placeholder={t('userName')}
                    iconName={'person-fill'}
                    iconFont={IconFontEnum.Octicons}
                    containerStyle={{marginBottom: 30}}
                    textContentType="username"
                    autoComplete="username"
                    keyboardType="email-address"
                />
                <CustomInput
                    value={userEmail}
                    onChangeText={setUserEmail}
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
                <LottiePowerButton onPress={onRegister} ref={powerBtnRef} />
                <Separator text={t('registerBy')} style={{paddingHorizontal: 60, marginBottom: 30, marginTop: 40}} />
                <CircleBtn onPress={onGoogleLogin} icon={<GoogleSvg />} size={80} bgColor={Colors.overlay} />
            </View>
        </Layout>
    );
};

export default RegisterScreen;
