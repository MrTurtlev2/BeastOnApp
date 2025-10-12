import {Text, View} from 'react-native';
import {style} from './Style';
import CircleBtn from '../../../../common/CircleBtn/CircleBtn';
import GraphSvg from '../../../../../assets/images/svg/buttons/GraphSvg';
import {useTranslation} from 'react-i18next';
import {IHomeEmptyListComponent} from '../../../../../constants/interfaces';

const HomeEmptyListComponent = ({customerName, onCreatePlan, onAssignPlan}: IHomeEmptyListComponent) => {
    const {t} = useTranslation();
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={style.welcomeText}>
                Hej <Text style={style.welcomeUserName}>{customerName}</Text>!
            </Text>
            <Text style={style.secondWelcomeText}>{t('configureTodayTraining')}</Text>
            <CircleBtn icon={<GraphSvg />} onPress={onCreatePlan} />
            <View style={style.separatorWrapper}>
                <View style={style.separatorLine} />
                <Text style={style.separatorText}>{t('or')}</Text>
                <View style={style.separatorLine} />
            </View>
            <Text style={style.secondWelcomeText}>{t('pickFromExistingAlready')}</Text>
            <CircleBtn icon={<GraphSvg />} onPress={onAssignPlan} />
        </View>
    );
};
export default HomeEmptyListComponent;
