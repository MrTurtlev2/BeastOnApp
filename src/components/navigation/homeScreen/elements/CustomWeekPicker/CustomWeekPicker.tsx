import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {addDays, format, isToday, startOfWeek} from 'date-fns';
import {enUS, pl} from 'date-fns/locale';
import {styles} from './Style';
import {ShadowedView} from 'react-native-fast-shadow';

export default function CustomWeekPicker() {
    const {t, i18n} = useTranslation();
    const locale = i18n.language === 'pl' ? pl : enUS;

    const today = new Date();
    const weekStart = startOfWeek(today, {weekStartsOn: 1});

    const weekDays = Array.from({length: 7}, (_, i) => {
        const date = addDays(weekStart, i);
        return {
            date,
            dateString: format(date, 'dd', {locale}),
            day: t(
                [
                    'mondayShort',
                    'tuesdayShort',
                    'wednesdayShort',
                    'thursdayShort',
                    'fridayShort',
                    'saturdayShort',
                    'sundayShort',
                ][i],
            ),
        };
    });

    const [selectedDay, setSelectedDay] = useState(
        weekDays.find(day => isToday(day.date)) || weekDays[0],
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={weekDays}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.date.toString()}
                renderItem={({item}) => {
                    const isSelected =
                        selectedDay.date.getTime() === item.date.getTime();
                    return (
                        <TouchableOpacity
                            onPress={() => setSelectedDay(item)}
                            style={styles.button}>
                            <ShadowedView
                                style={[
                                    styles.dayContainer,
                                    isSelected && styles.selectedDay,
                                ]}>
                                <Text style={styles.dateText}>
                                    {item.dateString}
                                </Text>
                                <Text style={styles.dayText}>{item.day}</Text>
                            </ShadowedView>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}
