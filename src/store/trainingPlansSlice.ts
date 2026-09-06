import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ITrainingPlan} from '../constants/interfaces';

export interface ReduxTrainingPlan extends ITrainingPlan {
    synced: boolean;
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
        addTrainingPlan(state, action: PayloadAction<ReduxTrainingPlan>) {
            state.trainingPlans.push(action.payload);
        },
        updateTrainingPlan(state, action: PayloadAction<ReduxTrainingPlan>) {
            const index = state.trainingPlans.findIndex(plan => plan.uuid === action.payload.uuid);
            if (index !== -1) state.trainingPlans[index] = action.payload;
        },
        // markTrainingPlanSynced(state, action: PayloadAction<string>) {
        //     const plan = state.trainingPlans.find(item => item.uuid === action.payload);
        //     if (!plan) return;
        //     plan.synced = true;
        // },
        removeTrainingPlan(state, action: PayloadAction<string>) {
            state.trainingPlans = state.trainingPlans.filter(item => item.uuid !== action.payload);
        },
    },
});

export const {addTrainingPlan, updateTrainingPlan, removeTrainingPlan} = trainingPlansSlice.actions;

export default trainingPlansSlice.reducer;
