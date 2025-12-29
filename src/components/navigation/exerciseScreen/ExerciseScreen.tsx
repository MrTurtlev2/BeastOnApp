import {Text, View} from 'react-native';
import Layout from '../../common/layout/Layout';
import {IScreenProps} from '../../../constants/interfaces';
import LiquidProgress from './elements/LiquidProgress';

const ExerciseScreen = ({route, navigation}: IScreenProps<'ExerciseScreen'>) => {
    const {exercise} = route.params;

    return (
        <Layout hasBackArrow bgImageType={'right-center'} customStyle={{flex: 1, paddingTop: 80}}>
            <View style={{flex: 1}}>
                <LiquidProgress percent={20} size={160} />
                <Text>efef</Text>
            </View>
        </Layout>
    );
};
export default ExerciseScreen;
