import {Text, TouchableOpacity, View} from 'react-native';
import {style} from '../Style';
import CircleBtn from '../../../../../common/CircleBtn/CircleBtn';
import {ReactNode} from 'react';

interface IActionCard {
    title: string;
    subtitle: string;
    onPress: () => void;
    renderIcon: () => ReactNode;
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

export default ActionCard;
