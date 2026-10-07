import {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {Colors} from '../../../constants/Colors';
import CustomBackdrop from './CustomBackdrop';

const CustomBottomSheet = ({children, ref}) => {
    const renderBackdrop = useCallback((props: any) => <CustomBackdrop animatedIndex={props.animatedIndex} />, []);
    return (
        <BottomSheet
            ref={ref}
            index={-1}
            enableDynamicSizing
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
