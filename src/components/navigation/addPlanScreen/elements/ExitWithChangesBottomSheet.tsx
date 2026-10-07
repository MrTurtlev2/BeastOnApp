import CustomButton from '../../../common/cuctomBtn/CustomButton';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';

const ExitWithChangesBottomSheet = ({onExitWithSave, onExitWithoutSave, onCancel}) => {
    const {t} = useTranslation();
    return (
        <BottomSheetView style={{paddingBottom: 50, paddingHorizontal: 10}}>
            <CustomButton onPress={onExitWithSave} text={t('saveAndExit')} type={'primary'} />
            <CustomButton onPress={onExitWithoutSave} text={t('exitWithoutSaving')} type={'secondary'} />
            <CustomButton onPress={onCancel} text={t('cancel')} type={'secondary'} />
        </BottomSheetView>
    );
};
export default ExitWithChangesBottomSheet;
