import {useTranslation} from 'react-i18next';
import Layout from '../../common/layout/Layout';
import {Image, View} from 'react-native';
import {useAppDispatch} from '../../../store';
import Logo from '../../../assets/images/png/common/logo.png';
import LottiePowerButton from '../../common/lottiePowerButton/LottiePowerButton';

const MotivationScreen = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const onLogin = async () => {
        // handleLoginAsync(userLogin, userPassword).then(res => {
        //     dispatch(setUser(res?.user));
        //     dispatch(loadTrainingPlans());
        // });
    };

    return (
        <Layout hasBurger={false} bgImageType={'top-center'} customStyle={{paddingHorizontal: 20}}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image source={Logo} />
                <LottiePowerButton onPress={onLogin} />
            </View>
        </Layout>
    );
};

export default MotivationScreen;
