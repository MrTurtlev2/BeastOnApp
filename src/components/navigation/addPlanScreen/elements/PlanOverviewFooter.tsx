import NewExerciseBar from './NewExerciseBar';
import {Fonts} from '../../../../constants/Fonts';
import CircleBtn from '../../../common/CircleBtn/CircleBtn';
import {View} from 'react-native';

const PlanOverviewFooter = ({onAddExercise, onSavePlan}) => {
    return (
        <View style={{alignItems: 'center', paddingBottom: 40}}>
            <NewExerciseBar
                exerciseName="+"
                onPress={onAddExercise}
                containerStyle={{paddingVertical: 0, width: '100%'}}
                textStyle={{
                    fontSize: 50,
                    marginBottom: 10,
                    fontFamily: Fonts.Marker,
                }}
            />
            <CircleBtn onPress={onSavePlan} text={'OK'} />
        </View>
    );
};
export default PlanOverviewFooter;
