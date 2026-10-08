import {useTranslation} from 'react-i18next';
import {enUS, pl} from 'date-fns/locale';
import {useMemo} from 'react';
import {addDays, format, startOfWeek} from 'date-fns';

const WEEK_DAYS = ['mondayShort', 'tuesdayShort', 'wednesdayShort', 'thursdayShort', 'fridayShort', 'saturdayShort', 'sundayShort'];

export function useWeekDays() {
    const {t, i18n} = useTranslation();
    const locale = i18n.language === 'pl' ? pl : enUS;
    const today = useMemo(() => new Date(), []);
    const weekStart = useMemo(() => startOfWeek(today, {weekStartsOn: 1}), [today]);

    const weekDays = useMemo(() => {
        return Array.from({length: 7}, (_, i) => {
            const date = addDays(weekStart, i);
            return {
                date,
                dateString: format(date, 'dd', {locale}),
                day: t(WEEK_DAYS[i]),
                dayOfWeek: i + 1,
            };
        });
    }, [weekStart, locale]);

    return {
        weekDays,
    };
}
