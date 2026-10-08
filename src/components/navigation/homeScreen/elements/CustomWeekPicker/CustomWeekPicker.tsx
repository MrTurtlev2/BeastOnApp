import {memo} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {styles} from './Style';

const CustomWeekPicker = ({weekDays, selectedDays, onSelectDay}) => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 10}}>
                {weekDays.map(item => {
                    const isSelected = selectedDays.includes(item.dayOfWeek);

                    return (
                        <TouchableOpacity key={item.date.toISOString()} onPress={() => onSelectDay(item.dayOfWeek)} style={styles.button}>
                            <View style={[styles.dayContainer, isSelected && styles.selectedDay]}>
                                <Text style={styles.dateText}>{item.dateString}</Text>

                                <Text style={styles.dayText}>{item.day}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default memo(CustomWeekPicker);
