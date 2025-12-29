import {KeyboardTypeOptions, StyleProp, TextInputProps, TextStyle, ViewStyle} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';

export enum IconFontEnum {
    Feather = 'Feather',
    FontAwesome = 'FontAwesome',
    Ionicons = 'Ionicons',
    MaterialIcons = 'MaterialIcons',
    Octicons = 'Octicons',
}

export interface ICustomIcon {
    name: string;
    font: IconFontEnum;
    color?: string;
    size?: number;
    style?: StyleProp<TextStyle>;
}

export interface ICustomInput extends TextInputProps {
    onChangeText: (value: string) => void;
    value: string;
    keyboardType?: KeyboardTypeOptions;
    placeholder?: string;
    iconName?: ICustomIcon['name'];
    iconSize?: ICustomIcon['size'];
    iconFont?: IconFontEnum;
    iconColor?: ICustomIcon['color'];
    containerStyle?: StyleProp<ViewStyle>;
    size?: 'small' | 'default';
}

export type IExerciseSet = {
    weight: number;
    repetitions: number;
};

export type IExercise = {
    exerciseName: string;
    sets: IExerciseSet[];
};

export interface ITrainingPlan {
    dayOfWeek: string;
    trainingPlanId: number;
    trainingPlanName: string;
    exercises: IExercise[];
}

export interface ITrainingPlansState {
    trainingPlans: ITrainingPlan[];
    loading: boolean;
    error: string | null;
}

export interface IHomeEmptyListComponent {
    customerName: string;
    onCreatePlan: () => void;
    onAssignPlan: () => void;
}

export interface ILottiePowerButtonRef {
    resetAnimation: () => void;
}

export interface ILottiePowerButton {
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export interface ICircleBtn {
    customStyle?: StyleProp<any>;
    icon?: any;
    text?: string;
    onPress: () => void;
    isLoading?: boolean;
    textColor?: string;
    bgColor?: string;
}

export type INavigationProps = {
    Login: undefined;
    Register: undefined;
    HomeMain: undefined;
    AddPlanScreen: {
        selectedDay: number;
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
