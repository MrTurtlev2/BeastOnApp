import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {style} from '../Style';

const EmptyPlansNotice = () => {
    const {t} = useTranslation();

    return (
        <View style={style.emptyPlansCard}>
            <View style={style.emptyDocIconWrapper}>
                <View style={style.emptyDocIcon}>
                    <View style={style.emptyDocLine} />
                    <View style={[style.emptyDocLine, style.emptyDocLineShort]} />
                </View>
                <View style={style.emptyDocPlusBadge}>
                    <Text style={style.emptyDocPlusText}>+</Text>
                </View>
            </View>
            <Text style={style.emptyPlansTitle}>{t('noPlansYet')}</Text>
            <Text style={style.emptyPlansSubtitle}>{t('createFirstTrainingPlan')}</Text>
        </View>
    );
};

export default EmptyPlansNotice;
