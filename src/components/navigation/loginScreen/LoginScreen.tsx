import {useTranslation} from 'react-i18next';
import Layout from '../../common/layout/Layout';
import {View} from 'react-native';
import CustomInput from '../../common/customInput/CustomInput';
import PowerButton from '../../common/powerButton/PowerButton';
import {handleLoginAsync} from '../../../api/Auth';
import {setUser} from '../../../store/userSlice';
import {loadTrainingPlans} from '../../../store/trainingPlansSlice';
import {useAppDispatch} from '../../../store';
import {useState} from 'react';
import {IconFontEnum} from '../../../constants/interfaces';

export default function LoginScreen() {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const [userLogin, setUserLogin] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');

    const onLogin = async () => {
        handleLoginAsync(userLogin, userPassword).then(res => {
            if (!res) return;
            dispatch(setUser(res?.user));
            dispatch(loadTrainingPlans());
        });
    };

    return (
        <Layout hasBurger={false} bgImageType={'right-center'} customStyle={{paddingHorizontal: 20}}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <CustomInput
                    value={userLogin}
                    onChangeText={setUserLogin}
                    placeholder={t('email')}
                    iconName={'person-fill'}
                    iconFont={IconFontEnum.Octicons}
                />
                <CustomInput
                    value={userPassword}
                    onChangeText={setUserPassword}
                    placeholder={t('password')}
                    iconName={'lock'}
                    iconFont={IconFontEnum.MaterialIcons}
                />
                <PowerButton onPress={onLogin} />
            </View>
        </Layout>
    );
}
