import {useTranslation} from 'react-i18next';
import Layout from '../../common/layout/Layout';
import {Image, Text, View} from 'react-native';
import {useAppDispatch} from '../../../store';
import Logo from '../../../assets/images/png/common/logo.png';
import LottiePowerButton from '../../common/lottiePowerButton/LottiePowerButton';
import {styles} from './Style';
import {useNavigation} from '@react-navigation/native';

const MotivationScreen = () => {
    const {t} = useTranslation();
    const navigation = useNavigation();

    const dispatch = useAppDispatch();

    const onLogin = async () => {
        // handleLoginAsync(userLogin, userPassword).then(res => {
        //     dispatch(setUser(res?.user));
        //     dispatch(loadTrainingPlans());
        // });
    };

    return (
        <Layout hasBurger={false} bgImageType={'top-center'} customStyle={{paddingHorizontal: 20}}>
            <View style={styles.logoWrapper}>
                <Image source={Logo} />
            </View>
            <View style={styles.bottom}>
                <LottiePowerButton onPress={() => navigation.navigate('Home')} />
                <Text style={styles.motivationText}>{t('motivationText')}</Text>
            </View>
        </Layout>
    );
};

export default MotivationScreen;
