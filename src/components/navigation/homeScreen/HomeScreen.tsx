import React from 'react';
import {Text, View} from 'react-native';
import Layout from '../../common/layout/Layout.tsx';
import {useTranslation} from 'react-i18next';
import CustomWeekPicker from './elements/CustomWeekPicker/CustomWeekPicker.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import CircleBtn from '../../common/CircleBtn/CircleBtn.tsx';
import {style} from './Style.ts';
import GraphSvg from '../../../assets/images/svg/buttons/GraphSvg';

export default function HomeScreen() {
    const {t} = useTranslation();
    const user = useSelector((state: RootState) => state.user.userData);
    const dispatch = useDispatch();

    console.log('user================');
    console.log(user);

    return (
        <Layout>
            <View
                style={{
                    flex: 1,
                    marginTop: '40%',
                    alignItems: 'center',
                }}>
                <CustomWeekPicker />
                <Text style={style.welcomeText}>
                    Hej <Text style={style.welcomeUserName}>{user?.customerName}</Text>!
                </Text>
                <Text style={style.secondWelcomeText}>{t('configureTodayTraining')}</Text>

                <CircleBtn icon={<GraphSvg />} onPress={() => null} />
                {/*<Button title="Otwórz menu" onPress={() => navigation.openDrawer()} />*/}
            </View>
        </Layout>
    );
}
