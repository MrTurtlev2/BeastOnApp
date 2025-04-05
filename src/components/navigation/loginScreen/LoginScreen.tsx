import {useTranslation} from 'react-i18next';
import Layout from '../../common/layout/Layout.tsx';
import {Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../common/customInput/CustomInput.tsx';

export default function LoginScreen() {
    const {t} = useTranslation();
    const [userLogin, setUserLogin] = useState<string>('');

    return (
        <Layout hasBurger={false}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>{t('test')}</Text>
                <CustomInput value={userLogin} onChangeText={setUserLogin} />
                {/*<CustomWeekPicker />*/}
                {/*<Button*/}
                {/*    title="Otwórz menu"*/}
                {/*    // onPress={() => navigation.openDrawer()}*/}
                {/*    onPress={() =>*/}
                {/*        handleLogin().then(res => dispatch(setUser(res)))*/}
                {/*    }*/}
                {/*/>*/}
            </View>
        </Layout>
    );
}
