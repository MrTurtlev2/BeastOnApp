import {Text, View} from 'react-native';
import {useAppSelector} from '../../../store';
import {style} from './Style';

const SyncDebugModal = () => {
    const outboxQueue = useAppSelector(state => state.outbox.queue);

    if (!__DEV__ || !outboxQueue?.length) return null;

    return (
        <View style={style.main}>
            <View>
                {outboxQueue.map(item => (
                    <Text key={item.id} style={style.queueItem}>
                        {item.method} {item.url}
                        {'\n'}
                        {JSON.stringify(item.body)}
                    </Text>
                ))}
            </View>
        </View>
    );
};
export default SyncDebugModal;
