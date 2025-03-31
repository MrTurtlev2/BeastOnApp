import React from 'react';
import {Button, Text, View} from 'react-native';
import Layout from '../../common/layout/Layout.tsx';
import {useTranslation} from 'react-i18next';
import CustomWeekPicker from './elements/CustomWeekPicker/CustomWeekPicker.tsx';

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
                <CustomWeekPicker />
                <Button
                    title="Otwórz menu"
                    onPress={() => navigation.openDrawer()}
                />
            </View>
        </Layout>
    );
}
