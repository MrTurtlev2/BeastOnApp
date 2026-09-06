import {ITrainingPlan} from './interfaces';

export type RootStackParamList = {
    AddPlanScreen: {
        selectedDay: number;
        existingPlan?: ITrainingPlan;
    };
};
