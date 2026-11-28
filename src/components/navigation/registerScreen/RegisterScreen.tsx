import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../store';
import {useEffect, useRef, useState} from 'react';
import {IconFontEnum, ILottiePowerButtonRef} from '../../../constants/interfaces';
import {IUserLoginState} from '../../../interfaces/userInterface';
import {setUser} from '../../../store/userSlice';
import {loadTrainingPlans} from '../../../store/trainingPlansSlice';
import {configureGoogleSignIn, handleGoogleLogin, handleRegisterAsync} from '../../../api/Auth';
import Layout from '../../common/layout/Layout';
import {Image, View} from 'react-native';
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
import LayoutScroll from '../../common/layoutScroll/LayoutScroll';
import EnergyBlocks from './components/elements/EnergyBlock';
import ClawMarksBg from '../../../assets/images/png/common/claw-marks-bg.png';

const RegisterScreen = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [userRepeatedPassword, setUserRepeatedPassword] = useState<string>('');
    const powerBtnRef = useRef<ILottiePowerButtonRef>(null);

    const formValidator = useRegistrationForm(userEmail, userPassword, userRepeatedPassword);
    const validationItems = [
        {key: 'email', isValid: formValidator.isEmailValid, text: t('emailValid')},
        {key: 'minLen', isValid: formValidator.hasMinLength, text: t('passwordMinLen')},
        {key: 'number', isValid: formValidator.hasNumber, text: t('passwordHasNumber')},
        {key: 'special', isValid: formValidator.hasSpecialChar, text: t('passwordHasSpecialLetter')},
        {key: 'uppercase', isValid: formValidator.hasUppercase, text: t('passwordHasUppercase')},
        {key: 'same', isValid: formValidator.isPasswordSame, text: t('passwordsAreTheSame')},
    ];
    const setUserData = (res: IUserLoginState) => {
        dispatch(setUser(res));
        dispatch(loadTrainingPlans());
    };

    const onRegister = async () => {
        const isFormValid = validationItems.every(validator => validator.isValid === true);
        if (!isFormValid) {
            powerBtnRef.current.resetAnimation();
            return;
        }
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

    const activeCount = validationItems.filter(item => item.isValid).length;

    useEffect(() => {
        configureGoogleSignIn();
    }, []);
    return (
        <Layout hasBackArrow={true} bgImageType={'left-bottom'}>
            <LayoutScroll type={'keyboard-aware'}>
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

                    <View style={styles.validatorCard}>
                        <EnergyBlocks total={validationItems.length} activeCount={activeCount} />
                        {validationItems.map(item => (
                            <RegisterFormValidator key={item.key} isValid={item.isValid} text={item.text} />
                        ))}
                        <Image source={ClawMarksBg} style={styles.clawMarkValidation} />
                    </View>

                    <LottiePowerButton onPress={onRegister} ref={powerBtnRef} />
                    <Separator text={t('registerBy')} />
                    <CircleBtn onPress={onGoogleLogin} icon={<GoogleSvg />} size={80} bgColor={Colors.overlay} />
                </View>
            </LayoutScroll>
        </Layout>
    );
};

export default RegisterScreen;
