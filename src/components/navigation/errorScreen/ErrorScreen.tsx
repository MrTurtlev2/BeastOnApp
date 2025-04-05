import Layout from '../../common/layout/Layout.tsx';
import {Image, Text} from 'react-native';
import React from 'react';
import {style} from './Style.ts';
import i18n from '../../../language/i18n';
import ErrorPinSvg from '../../../assets/images/svg/ErrorPinSvg';
import CircleBtn from '../../common/CircleBtn/CircleBtn.tsx';
import RetrySvg from '../../../assets/images/svg/buttons/RetrySvg';

export default function ErrorScreen() {
    return (
        <Layout bgImageType={'none'} hasBurger={false} customStyle={{paddingTop: 40}}>
            <Image style={style.bgImage} source={require('../../../assets/images/png/layout/error-monkey.png')} />
            <ErrorPinSvg />
            <Text style={style.errorText}>ERROR</Text>
            <Text style={style.infoText}>{i18n.t('baseErrorText')}</Text>
            <CircleBtn onPress={() => null} icon={<RetrySvg />} />
        </Layout>
    );
}
