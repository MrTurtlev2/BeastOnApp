import {useTranslation} from 'react-i18next';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import CustomButton from '../../../common/cuctomBtn/CustomButton';
import {StyleSheet, Text} from 'react-native';
import {Colors} from '../../../../constants/Colors';

const ReassignDayBottomValidator = ({onConfirm, onCancel}) => {
    const {t} = useTranslation();
    return (
        <BottomSheetView style={styles.main}>
            <Text>{t('AddPlanReassignValidationMsg')}</Text>
            <CustomButton onPress={onConfirm} text={t('reassignPlan')} type={'primary'} />
            <CustomButton onPress={onCancel} text={t('cancel')} type={'secondary'} />
        </BottomSheetView>
    );
};
export default ReassignDayBottomValidator;

const styles = StyleSheet.create({
    main: {
        paddingBottom: 50,
        paddingHorizontal: 10,
    },
    msg: {
        color: Colors.white,
        fontSize: 18,
    },
});
