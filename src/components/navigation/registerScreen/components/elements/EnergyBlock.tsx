import {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {Colors} from '../../../../../constants/Colors';

interface IEnergyBlocks {
    total?: number;
    activeCount: number;
}

const EnergyBlock = ({isActive}: {isActive: boolean}) => {
    const progress = useRef(new Animated.Value(isActive ? 1 : 0)).current;
    useEffect(() => {
        Animated.spring(progress, {
            toValue: isActive ? 1 : 0,
            friction: 6,
            tension: 120,
            useNativeDriver: false,
        }).start();
    }, [isActive, progress]);

    const backgroundColor = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['#2A2A2E', Colors.pink || '#D04C63'],
    });

    const scale = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0.95, 1.03],
    });

    return (
        <Animated.View
            style={[
                styles.block,
                {
                    backgroundColor,
                    transform: [{skewX: '-16deg'}, {scale}],
                },
            ]}
        />
    );
};

const EnergyBlocks = ({total = 6, activeCount}: IEnergyBlocks) => {
    return (
        <View style={styles.row}>
            {Array.from({length: total}, (_, index) => (
                <EnergyBlock key={index} isActive={index < activeCount} />
            ))}
        </View>
    );
};

export default EnergyBlocks;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 14,
        paddingHorizontal: 2,
    },
    block: {
        flex: 1,
        height: 12,
        borderRadius: 3,
    },
});
