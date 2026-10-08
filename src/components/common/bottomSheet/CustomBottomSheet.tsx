import {ReactNode, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {Colors} from '../../../constants/Colors';
import CustomBackdrop from './CustomBackdrop';

interface ICustomBottomSheet {
    children: ReactNode;
    ref: any;
    snapPoints?: number[] | string[];
}
 
const CustomBottomSheet = ({children, ref, snapPoints}: ICustomBottomSheet) => {
    const renderBackdrop = useCallback((props: any) => <CustomBackdrop animatedIndex={props.animatedIndex} />, []);
    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
            enableDynamicSizing={!snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            backgroundStyle={styles.background}
            handleIndicatorStyle={styles.handleIndicator}>
            {children}
        </BottomSheet>
    );
};
export default CustomBottomSheet;
const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.darkGrey,
    },

    handleIndicator: {
        backgroundColor: '#666',
        width: 40,
        marginBottom: 10,
    },
});
