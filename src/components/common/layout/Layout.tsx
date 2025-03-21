import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import BurgerSvg from '../../../assets/images/svg/BurgerSvg';
import {style} from './Style.ts';

type LayoutProps = {
    children?: React.ReactNode;
};

export default function Layout({children}: LayoutProps) {
    const navigation = useNavigation<DrawerNavigationProp<any>>();

    return (
        <View style={style.main}>
            <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={style.burgerBtn}>
                <BurgerSvg />
            </TouchableOpacity>
            {children}
        </View>
    );
}
