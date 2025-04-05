import {Image, StyleProp, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import BurgerSvg from '../../../assets/images/svg/BurgerSvg';
import {style} from './Style.ts';

type LayoutProps = {
    children?: React.ReactNode;
    hasBurger?: boolean;
    bgImageType?: 'left-top' | 'right-center' | 'none';
    customStyle: StyleProp<any>;
};

export default function Layout({children, hasBurger = true, bgImageType = 'left-top', customStyle}: LayoutProps) {
    const navigation = useNavigation<DrawerNavigationProp<any>>();

    const handleBgImage = () => {
        if (bgImageType === 'none') return null;
        if (bgImageType === 'left-top')
            return <Image style={style.bgImageLeftTop} source={require('../../../assets/images/png/layout/top-left-main-monkey.png')} />;
        if (bgImageType === 'right-center')
            return (
                <Image
                    style={style.bgImageRightCenter}
                    source={require('../../../assets/images/png/layout/right-center-main-monkey.png')}
                />
            );
    };

    return (
        <View style={[style.main, customStyle]}>
            {handleBgImage()}
            {hasBurger && (
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={style.burgerBtn}>
                    <BurgerSvg />
                </TouchableOpacity>
            )}
            {children}
        </View>
    );
}
