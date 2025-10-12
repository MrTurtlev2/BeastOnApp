import {Text, View} from 'react-native';
import {style} from './Style';
import CircleBtn from '../../../../common/CircleBtn/CircleBtn';
import GraphSvg from '../../../../../assets/images/svg/buttons/GraphSvg';
import {useTranslation} from 'react-i18next';

const HomeEmptyListComponent = ({customerName, onCreatePlan}) => {
    const {t} = useTranslation();
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={style.welcomeText}>
                Hej <Text style={style.welcomeUserName}>{customerName}</Text>!
            </Text>
            <Text style={style.secondWelcomeText}>{t('configureTodayTraining')}</Text>
            <CircleBtn icon={<GraphSvg />} onPress={onCreatePlan} />
        </View>
    );
};
export default HomeEmptyListComponent;
