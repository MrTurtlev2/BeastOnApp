import {Image, StyleProp, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import BurgerSvg from '../../../assets/images/svg/BurgerSvg';
import {style} from './Style';
import TopLeftMainMonkey from '../../../assets/images/png/layout/top-left-main-monkey.png';
import RightCenterMainMonkey from '../../../assets/images/png/layout/right-center-main-monkey.png';
import TopCenterMainMonkey from '../../../assets/images/png/layout/top-center-main-monkey.png';
import LeftBottomMainMonkey from '../../../assets/images/png/layout/bottom-left-main-monkey.png';
import {ReactNode} from 'react';

type LayoutProps = {
    children?: ReactNode;
    hasBurger?: boolean;
    bgImageType?: 'left-top' | 'right-center' | 'top-center' | 'left-bottom' | 'none';
    customStyle?: StyleProp<any>;
};

export default function Layout({children, hasBurger = true, bgImageType = 'left-top', customStyle}: LayoutProps) {
    const navigation = useNavigation<DrawerNavigationProp<any>>();

    const handleBgImage = () => {
        if (bgImageType === 'none') return null;
        if (bgImageType === 'left-top') return <Image style={style.bgImageLeftTop} source={TopLeftMainMonkey} />;
        if (bgImageType === 'right-center') return <Image style={style.bgImageRightCenter} source={RightCenterMainMonkey} />;
        if (bgImageType === 'top-center')
            return <Image style={style.bgImageTopCenter} source={TopCenterMainMonkey} resizeMode={'stretch'} />;
        if (bgImageType === 'left-bottom')
            return <Image style={style.bgImageLeftBottom} source={LeftBottomMainMonkey} resizeMode={'stretch'} />;
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
