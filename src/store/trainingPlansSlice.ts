import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IExercise} from '../constants/interfaces';

export interface ITrainingPlan {
    uuid: string;
    name: string;
    exercises: IExercise[];
    dayOfWeek: number;
    synced: boolean;
    lastModified: number;
}

interface ITrainingPlansState {
    trainingPlans: ITrainingPlan[];
    loading: boolean;
    error: string | null;
}

const initialState: ITrainingPlansState = {
    trainingPlans: [],
    loading: false,
    error: null,
};

const trainingPlansSlice = createSlice({
    name: 'trainingPlans',
    initialState,
    reducers: {
        addTrainingPlan(state, action: PayloadAction<ITrainingPlan>) {
            state.trainingPlans.push(action.payload);
        },
        markTrainingPlanSynced(state, action: PayloadAction<string>) {
            const plan = state.trainingPlans.find(item => item.uuid === action.payload);
            if (!plan) return;
            plan.synced = true;
        },
        removeTrainingPlan(state, action: PayloadAction<string>) {
            state.trainingPlans = state.trainingPlans.filter(item => item.uuid !== action.payload);
        },
    },
});

export const {addTrainingPlan, markTrainingPlanSynced, removeTrainingPlan} = trainingPlansSlice.actions;

export default trainingPlansSlice.reducer;
