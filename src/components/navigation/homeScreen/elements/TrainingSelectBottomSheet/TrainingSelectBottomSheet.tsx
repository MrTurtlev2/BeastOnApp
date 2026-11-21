import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useCallback} from 'react';
import {ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {ITrainingPlan} from '../../../../../constants/interfaces';
import {Colors} from '../../../../../constants/Colors';

type TrainingSelectBottomSheetProps = {
    trainings: ITrainingPlan[];
    onSelectTraining: (uuid: string) => void;
};

const TrainingSelectBottomSheet = ({trainings, onSelectTraining}: TrainingSelectBottomSheetProps) => {
    const renderItem: ListRenderItem<ITrainingPlan> = useCallback(
        ({item}) => {
            return (
                <View style={styles.trainingCard}>
                    <Text style={styles.trainingText} onPress={() => onSelectTraining(item.uuid)}>
                        {item.name}
                    </Text>
                </View>
            );
        },
        [onSelectTraining],
    );

    const renderEmptyComponent = useCallback(
        () => (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No trainings available</Text>
            </View>
        ),
        [],
    );

    return (
        <BottomSheetFlatList
            data={trainings}
            renderItem={renderItem}
            keyExtractor={(item: ITrainingPlan) => item.uuid}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyComponent}
        />
    );
};

export default TrainingSelectBottomSheet;

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.darkGrey,
    },

    handleIndicator: {
        backgroundColor: '#666',
        width: 40,
        marginBottom: 10,
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
        height: 200,
    },

    emptyText: {
        color: '#999',
        fontSize: 16,
    },
});
