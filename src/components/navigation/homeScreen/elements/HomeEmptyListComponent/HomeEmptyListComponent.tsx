import React from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {style} from './Style';
import {IHomeEmptyListComponent} from '../../../../../constants/interfaces';
import ListSvg from '../../../../../assets/images/svg/buttons/ListSvg';
import ActionCard from './elements/ActionCard';
import EmptyPlansNotice from './elements/EmptyPlansNotice';

const HomeEmptyListComponent = ({onCreatePlan, onAssignPlan, hasNoPlansAtAll}: IHomeEmptyListComponent) => {
    const {t} = useTranslation();

    return (
        <View style={style.container}>
            <View style={style.cardsWrapper}>
                <ActionCard
                    title={t('createNewPlan')}
                    subtitle={t('startTrainingAdventure')}
                    onPress={onCreatePlan}
                    renderIcon={() => <Text style={style.plusIcon}>+</Text>}
                />
                {hasNoPlansAtAll ? (
                    <EmptyPlansNotice />
                ) : (
                    <ActionCard
                        title={t('yourPlans')}
                        subtitle={t('pickExistingPlan')}
                        onPress={onAssignPlan}
                        renderIcon={() => <ListSvg width={41} height={37} />}
                    />
                )}
            </View>
        </View>
    );
};

export default HomeEmptyListComponent;
