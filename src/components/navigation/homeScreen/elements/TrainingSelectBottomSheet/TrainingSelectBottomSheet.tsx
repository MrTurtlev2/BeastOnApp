import {BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal} from '@gorhom/bottom-sheet';
import {forwardRef, useCallback, useMemo} from 'react';
import {ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {ITrainingPlan} from '../../../../../constants/interfaces';
import {Colors} from '../../../../../constants/Colors';

type TrainingSelectBottomSheetProps = {
    trainings: ITrainingPlan[];
    onSelectTraining: (training: ITrainingPlan) => void;
};

const TrainingSelectBottomSheet = forwardRef<BottomSheetModal, TrainingSelectBottomSheetProps>(({trainings, onSelectTraining}, ref) => {
    const snapPoints = useMemo(() => ['50%', '80%'], []);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />,
        [],
    );

    const renderItem: ListRenderItem<ITrainingPlan> = useCallback(
        ({item}) => {
            return (
                <View style={styles.trainingCard}>
                    <Text style={styles.trainingText} onPress={() => onSelectTraining(item)}>
                        {item.name}
                    </Text>
                </View>
            );
        },
        [onSelectTraining],
    );

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            backgroundStyle={styles.background}
            handleIndicatorStyle={styles.handleIndicator}>
            {!trainings?.length ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No trainings available</Text>
                </View>
            ) : (
                <BottomSheetFlatList
                    data={trainings}
                    renderItem={renderItem}
                    keyExtractor={item => item.trainingPlanId.toString()}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </BottomSheetModal>
    );
});

export default TrainingSelectBottomSheet;

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.darkGrey,
    },

    handleIndicator: {
        backgroundColor: '#666',
    },

    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },

    trainingCard: {
        paddingVertical: 18,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginBottom: 12,
        backgroundColor: '#2A2A2A',
    },

    trainingText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40,
    },

    emptyText: {
        color: '#999',
        fontSize: 16,
    },
});
