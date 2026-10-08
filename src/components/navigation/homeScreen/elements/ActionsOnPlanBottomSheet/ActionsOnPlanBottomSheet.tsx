import {useState} from 'react';
import {Text, View} from 'react-native';
import Animated, {Easing, interpolate, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {BottomSheetView, useBottomSheet} from '@gorhom/bottom-sheet';
import CustomButton from '../../../../common/cuctomBtn/CustomButton';
import {scheduleOnRN} from 'react-native-worklets';
import {style} from './Style';

interface ActionsOnPlanBottomSheetProps {
    onEdit: () => void;
    onConfirmRemove: () => void;
}

const ActionsOnPlanBottomSheet = ({onEdit, onConfirmRemove}: ActionsOnPlanBottomSheetProps) => {
    const {t} = useTranslation();
    const {animatedIndex} = useBottomSheet();

    const [page, setPage] = useState(0);
    const progress = useSharedValue(0);

    const reset = () => {
        progress.value = 0;
        setPage(0);
    };

    useAnimatedReaction(
        () => animatedIndex.value,
        (current, previous) => {
            if (current === -1 && previous !== -1) {
                scheduleOnRN(reset);
            }
        },
    );

    const onRemove = () => {
        setPage(1);
        progress.value = withTiming(1, {
            duration: 250,
            easing: Easing.out(Easing.cubic),
        });
    };

    const actionsStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: interpolate(progress.value, [0, 1], [0, -40]),
            },
        ],
        opacity: interpolate(progress.value, [0, 1], [1, 0]),
    }));

    const confirmStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: interpolate(progress.value, [0, 1], [40, 0]),
            },
        ],
        opacity: interpolate(progress.value, [0, 1], [0, 1]),
    }));

    return (
        <BottomSheetView style={style.main}>
            <View style={style.container}>
                <Animated.View style={[style.page, actionsStyle, page === 0 ? style.visible : style.hidden]}>
                    <CustomButton onPress={onEdit} text={t('edit')} type="primary" />

                    <CustomButton onPress={onRemove} text={t('remove')} type="secondary" />
                </Animated.View>

                <Animated.View style={[style.page, confirmStyle, page === 1 ? style.visible : style.hidden]}>
                    <Text style={style.confirmMsg}>{t('confirmRemovePlanMsg')}</Text>
                    <CustomButton onPress={onConfirmRemove} text={t('confirmRemove')} type="primary" />
                </Animated.View>
            </View>
        </BottomSheetView>
    );
};

export default ActionsOnPlanBottomSheet;
