import {IExercise, ITrainingPlan} from './interfaces';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import {useNavigation as useNativeNavigation} from '@react-navigation/native';

export type INavigationProps = {
    Login: undefined;
    Register: undefined;
    HomeScreen: undefined;
    AddPlanScreen: {
        selectedDay: number;
        existingPlan?: ITrainingPlan;
    };
    ExerciseScreen: {
        exercise: IExercise;
    };
    MotivationScreen: undefined;
    ErrorScreen: undefined;
    CustomModalScreen: undefined;
};

export type IScreenProps<T extends keyof INavigationProps> = {
    navigation: StackNavigationProp<INavigationProps, T>;
    route: RouteProp<INavigationProps, T>;
};
export const useAppNavigation = <T extends keyof INavigationProps>() => {
    return useNativeNavigation<StackNavigationProp<INavigationProps, T>>();
};
