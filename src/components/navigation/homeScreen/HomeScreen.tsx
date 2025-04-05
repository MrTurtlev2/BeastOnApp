import React from 'react';
import {Button, Text, View} from 'react-native';
import Layout from '../../common/layout/Layout.tsx';
import {useTranslation} from 'react-i18next';
import CustomWeekPicker from './elements/CustomWeekPicker/CustomWeekPicker.tsx';
import {handleLoginAsync} from '../../../api/Auth.ts';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {setUser} from '../../../store/userSlice.ts';

export default function HomeScreen({navigation}: any) {
    const {t} = useTranslation();
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    console.log('user================');
    console.log(user);

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
                    // onPress={() => navigation.openDrawer()}
                    onPress={() =>
                        handleLoginAsync().then(res => dispatch(setUser(res)))
                    }
                />
            </View>
        </Layout>
    );
}
