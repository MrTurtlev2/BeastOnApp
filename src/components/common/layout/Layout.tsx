import {Image, StyleProp, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import BurgerSvg from '../../../assets/images/svg/BurgerSvg';
import BackArrowSvg from '../../../assets/images/svg/BackArrowSvg';
import {style} from './Style';
import TopLeftMainMonkey from '../../../assets/images/png/layout/top-left-main-monkey.png';
import RightCenterMainMonkey from '../../../assets/images/png/layout/right-center-main-monkey.png';
import TopCenterMainMonkey from '../../../assets/images/png/layout/top-center-main-monkey.png';
import LeftBottomMainMonkey from '../../../assets/images/png/layout/bottom-left-main-monkey.png';
import {ReactNode} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type LayoutProps = {
    children?: ReactNode;
    hasBurger?: boolean;
    hasBackArrow?: boolean;
    bgImageType?: 'left-top' | 'right-center' | 'top-center' | 'left-bottom' | 'none';
    customStyle?: StyleProp<any>;
    onGoBack?: () => void;
    horizontalSpace?: boolean;
};

export default function Layout({
    children,
    hasBurger = false,
    hasBackArrow = false,
    bgImageType = 'left-top',
    customStyle,
    onGoBack,
    horizontalSpace,
}: LayoutProps) {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const insets = useSafeAreaInsets();
    const navigationIconPosition = insets.top + 16;

    const handleBgImage = () => {
        if (bgImageType === 'none') return null;
        if (bgImageType === 'left-top') return <Image style={style.bgImageLeftTop} source={TopLeftMainMonkey} />;
        if (bgImageType === 'right-center') return <Image style={style.bgImageRightCenter} source={RightCenterMainMonkey} />;
        if (bgImageType === 'top-center')
            return <Image style={style.bgImageTopCenter} source={TopCenterMainMonkey} resizeMode={'stretch'} />;
        if (bgImageType === 'left-bottom')
            return <Image style={style.bgImageLeftBottom} source={LeftBottomMainMonkey} resizeMode={'stretch'} />;
    };

    const handleBackArrow = () => {
        if (onGoBack) return onGoBack();
        if (navigation.canGoBack()) return navigation.goBack();
        return null;
    };
    const handleBurgerPress = () => navigation.openDrawer();

    return (
        <View style={[style.main, horizontalSpace && {paddingHorizontal: 20}, customStyle]}>
            {handleBgImage()}
            {hasBurger && (
                <TouchableOpacity onPress={handleBurgerPress} style={[style.burgerBtn, {top: navigationIconPosition}]}>
                    <BurgerSvg />
                </TouchableOpacity>
            )}
            {hasBackArrow && (
                <TouchableOpacity onPress={handleBackArrow} style={[style.backArrowBtn, {top: navigationIconPosition}]}>
                    <BackArrowSvg />
                </TouchableOpacity>
            )}
            {children}
        </View>
    );
}
