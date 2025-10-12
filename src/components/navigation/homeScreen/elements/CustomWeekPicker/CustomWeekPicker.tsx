import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './Style';

const CustomWeekPicker = ({weekDays, selectedDay, setSelectedDay}) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={weekDays}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.date.toString()}
                renderItem={({item, index}) => {
                    const isSelected = selectedDay === index;
                    return (
                        <TouchableOpacity onPress={() => setSelectedDay(index)} style={styles.button}>
                            <View style={[styles.dayContainer, isSelected && styles.selectedDay]}>
                                <Text style={styles.dateText}>{item?.dateString}</Text>
                                <Text style={styles.dayText}>{item?.day}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

export default CustomWeekPicker;
