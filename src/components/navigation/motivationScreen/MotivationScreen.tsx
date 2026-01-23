import {useTranslation} from 'react-i18next';
import Layout from '../../common/layout/Layout';
import {Text, View} from 'react-native';
import LottiePowerButton from '../../common/lottiePowerButton/LottiePowerButton';
import {styles} from './Style';
import {useNavigation} from '@react-navigation/native';
import ClawTitle from '../../common/clawTitle/ClawTitle';

const MotivationScreen = () => {
    const {t} = useTranslation();
    const navigation = useNavigation();

    return (
        <Layout hasBurger={false} bgImageType={'top-center'} customStyle={{paddingHorizontal: 20}}>
            <View style={styles.logoWrapper}>
                <ClawTitle text={'BeastMode'} type={'heading'} style={{height: 200}} />
            </View>
            <View style={styles.bottom}>
                <LottiePowerButton onPress={() => navigation.navigate('Home')} />
                <Text style={styles.motivationText}>{t('motivationText')}</Text>
            </View>
        </Layout>
    );
};

export default MotivationScreen;
