import {ReactNode, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {Colors} from '../../../constants/Colors';
import CustomBackdrop from './CustomBackdrop';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ICustomBottomSheet {
    children: ReactNode;
    ref: any;
    snapPoints?: number[] | string[];
}
 
const CustomBottomSheet = ({children, ref, snapPoints}: ICustomBottomSheet) => {
    const renderBackdrop = useCallback((props: any) => <CustomBackdrop animatedIndex={props.animatedIndex} />, []);
    const insets = useSafeAreaInsets();
    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
            enableDynamicSizing={!snapPoints}
            topInset={insets.top}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            style={styles.sheet}
            backgroundStyle={styles.background}
            handleIndicatorStyle={styles.handleIndicator}>
            {children}
        </BottomSheet>
    );
};
export default CustomBottomSheet;
const styles = StyleSheet.create({
    sheet: {
        zIndex: 10,
    },
    background: {
        backgroundColor: Colors.darkGrey,
    },

    handleIndicator: {
        backgroundColor: '#666',
        width: 40,
        marginBottom: 10,
    },
});
