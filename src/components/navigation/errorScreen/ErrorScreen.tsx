import Layout from '../../common/layout/Layout';
import {Text} from 'react-native';
import {style} from './Style';
import i18n from '../../../language/i18n';
import ErrorPinSvg from '../../../assets/images/svg/ErrorPinSvg';
import CircleBtn from '../../common/CircleBtn/CircleBtn';
import RetrySvg from '../../../assets/images/svg/buttons/RetrySvg';
import {useRoute} from '@react-navigation/core';
// import ErrorImage from '../../../assets/images/png/layout/error-monkey.png'

const ErrorScreen = () => {
    const route = useRoute();
    const {message, status, type} = route.params || {};
    return (
        <Layout bgImageType={'none'} hasBurger={false} customStyle={{paddingTop: 40}}>
            {/*<Image style={style.bgImage} source={ErrorImage} />*/}
            <ErrorPinSvg />
            <Text style={style.errorText}>ERROR</Text>
            <Text style={style.infoText}>{i18n.t('baseErrorText')}</Text>
            <Text style={style.infoText}>{message}</Text>
            <CircleBtn onPress={() => null} icon={<RetrySvg />} />
        </Layout>
    );
};
export default ErrorScreen;
