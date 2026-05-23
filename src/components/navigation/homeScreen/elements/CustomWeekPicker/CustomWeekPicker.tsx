import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './Style';
import {memo} from 'react';

const CustomWeekPicker = ({weekDays, selectedDay, setSelectedDay}) => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 10}}>
                {weekDays.map((item, index) => {
                    const isSelected = selectedDay === index;
                    return (
                        <TouchableOpacity key={item.date.toISOString()} onPress={() => setSelectedDay(index)} style={styles.button}>
                            <View style={[styles.dayContainer, isSelected && styles.selectedDay]}>
                                <Text style={styles.dateText}>{item?.dateString}</Text>
                                <Text style={styles.dayText}>{item?.day}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default memo(CustomWeekPicker);
