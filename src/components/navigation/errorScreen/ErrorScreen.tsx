import Layout from '../../common/layout/Layout.tsx';
import {Image, Text} from 'react-native';
import React from 'react';
import {style} from './Style.ts';
import i18n from '../../../language/i18n';
import ErrorPinSvg from '../../../assets/images/svg/ErrorPinSvg';

export default function ErrorScreen() {
    return (
        <Layout bgImageType={'none'} hasBurger={false} customStyle={{paddingTop: 40}}>
            <ErrorPinSvg />
            <Text style={style.errorText}>ERROR</Text>
            <Text style={style.infoText}>{i18n.t('baseErrorText')}</Text>
            <Image style={style.bgImage} source={require('../../../assets/images/png/layout/error-monkey.png')} />
        </Layout>
    );
}
