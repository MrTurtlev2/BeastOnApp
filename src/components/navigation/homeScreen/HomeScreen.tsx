import React from 'react';
import {Button, Text, View} from 'react-native';
import Layout from '../../common/layout/Layout.tsx';
import {useTranslation} from 'react-i18next';

export default function HomeScreen({navigation}: any) {
    const {t} = useTranslation();
    return (
        <Layout>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>{t('test')}</Text>
                <Button
                    title="Otwórz menu"
                    onPress={() => navigation.openDrawer()}
                />
            </View>
        </Layout>
    );
}
