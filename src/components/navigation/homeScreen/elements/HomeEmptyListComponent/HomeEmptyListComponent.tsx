import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {style} from './Style';
import {IHomeEmptyListComponent} from '../../../../../constants/interfaces';
import ListSvg from '../../../../../assets/images/svg/buttons/ListSvg';
import CircleBtn from '../../../../common/CircleBtn/CircleBtn';

interface IActionCard {
    title: string;
    subtitle: string;
    onPress: () => void;
    renderIcon: () => React.ReactNode;
}

const ActionCard = ({title, subtitle, onPress, renderIcon}: IActionCard) => (
    <TouchableOpacity style={style.card} onPress={onPress} activeOpacity={0.85}>
        <CircleBtn size={75} icon={renderIcon()} />

        <View style={style.cardTextContainer}>
            <Text style={style.cardTitle}>{title}</Text>
            <Text style={style.cardSubtitle}>{subtitle}</Text>
        </View>

        <Text style={style.chevron}>›</Text>
    </TouchableOpacity>
);

const HomeEmptyListComponent = ({onCreatePlan, onAssignPlan}: IHomeEmptyListComponent) => {
    const {t} = useTranslation();

    return (
        <View style={style.container}>
            <View style={style.cardsWrapper}>
                <ActionCard
                    title={t('createNewPlan', {defaultValue: 'Utwórz nowy plan'})}
                    subtitle={t('startTrainingAdventure', {defaultValue: 'Zacznij swoją przygodę z treningiem'})}
                    onPress={onCreatePlan}
                    renderIcon={() => <Text style={style.plusIcon}>+</Text>}
                />

                <ActionCard
                    title={t('yourPlans', {defaultValue: 'Twoje plany'})}
                    subtitle={t('pickExistingPlan', {defaultValue: 'Wybierz stworzony wcześniej plan'})}
                    onPress={onAssignPlan}
                    renderIcon={() => <ListSvg width={41} height={37} />}
                />
            </View>
        </View>
    );
};

export default HomeEmptyListComponent;
