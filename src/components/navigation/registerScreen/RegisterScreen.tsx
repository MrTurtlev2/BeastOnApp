import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../store';
import {useEffect, useRef, useState} from 'react';
import {IconFontEnum, ILottiePowerButtonRef} from '../../../constants/interfaces';
import {IUserLoginState} from '../../../interfaces/userInterface';
import {setUser} from '../../../store/userSlice';
import {loadTrainingPlans} from '../../../store/trainingPlansSlice';
import {configureGoogleSignIn, handleGoogleLogin, handleRegisterAsync} from '../../../api/Auth';
import Layout from '../../common/layout/Layout';
import {ScrollView, View} from 'react-native';
import CustomInput from '../../common/customInput/CustomInput';
import LottiePowerButton from '../../common/lottiePowerButton/LottiePowerButton';
import Separator from '../../common/separator/Separator';
import GoogleSvg from '../../../assets/images/svg/buttons/GoogleSvg';
import CircleBtn from '../../common/CircleBtn/CircleBtn';
import {Colors} from '../../../constants/Colors';
import {styles} from './Style';
import ClawTitle from '../../common/clawTitle/ClawTitle';
import {useRegistrationForm} from './hooks/useRegistrationForm';
import RegisterFormValidator from './components/RegisterFormValidator';

const RegisterScreen = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [userRepeatedPassword, setUserRepeatedPassword] = useState<string>('');
    const powerBtnRef = useRef<ILottiePowerButtonRef>(null);

    const formValidator = useRegistrationForm(userEmail, userPassword, userRepeatedPassword);

    const setUserData = (res: IUserLoginState) => {
        dispatch(setUser(res));
        dispatch(loadTrainingPlans());
    };

    const onRegister = async () => {
        handleRegisterAsync(userEmail, userPassword).then(res => {
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
        // <Layout hasBackArrow={true} bgImageType={'left-bottom'} horizontalSpace isScrollable>
        <Layout hasBackArrow={true} bgImageType={'left-bottom'}>
            <ScrollView contentContainerStyle={{flex: 1}}>
                <View style={styles.header}>
                    <ClawTitle text={'BeastMode'} type={'heading'} style={{height: 200}} />
                    <CustomInput
                        value={userEmail}
                        onChangeText={setUserEmail}
                        placeholder={t('email')}
                        iconName={'email'}
                        iconFont={IconFontEnum.MaterialIcons}
                        containerStyle={styles.emailInput}
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
                        containerStyle={styles.passwordInput}
                        textContentType="password"
                        autoComplete="password"
                        secureTextEntry
                        importantForAutofill={'yes'}
                    />
                    <CustomInput
                        value={userRepeatedPassword}
                        onChangeText={setUserRepeatedPassword}
                        placeholder={t('repeatPassword')}
                        iconName={'lock'}
                        iconFont={IconFontEnum.MaterialIcons}
                        containerStyle={styles.repeatPasswordInput}
                        textContentType="password"
                        autoComplete="password"
                        secureTextEntry
                        importantForAutofill={'yes'}
                    />
                    <View style={{marginBottom: 50}}>
                        <RegisterFormValidator isValid={formValidator.isEmailValid} text={t('emailValid')} />
                        <RegisterFormValidator isValid={formValidator.hasMinLength} text={t('passwordMinLen')} />
                        <RegisterFormValidator isValid={formValidator.hasNumber} text={t('passwordHasNumber')} />
                        <RegisterFormValidator isValid={formValidator.hasSpecialChar} text={t('passwordHasSpecialLetter')} />
                        <RegisterFormValidator isValid={formValidator.hasUppercase} text={t('passwordHasUppercase')} />
                        <RegisterFormValidator isValid={formValidator.isPasswordSame} text={t('passwordsAreTheSame')} />
                    </View>
                    <LottiePowerButton onPress={onRegister} ref={powerBtnRef} />
                    <Separator text={t('registerBy')} />
                    <CircleBtn onPress={onGoogleLogin} icon={<GoogleSvg />} size={80} bgColor={Colors.overlay} />
                </View>
            </ScrollView>
        </Layout>
    );
};

export default RegisterScreen;
