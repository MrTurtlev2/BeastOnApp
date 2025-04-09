// trainingPlansSlice.ts

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchTrainingPlansAsync} from '../api/TrainingShedule.ts';

export interface ExerciseDto {
    exerciseId: number;
    exerciseName: string;
    weight: number;
    repetitions: number;
}

export interface TrainingPlanDayDto {
    dayOfWeek: string;
    trainingPlanId: number;
    trainingPlanName: string;
    exercises: ExerciseDto[];
}

interface TrainingPlansState {
    trainingPlans: TrainingPlanDayDto[];
    loading: boolean;
    error: string | null;
}

const initialState: TrainingPlansState = {
    trainingPlans: [],
    loading: false,
    error: null,
};

export const loadTrainingPlans = createAsyncThunk('trainingPlans/load', async (_, {rejectWithValue}) => {
    try {
        const trainingPlans = await fetchTrainingPlansAsync();
        return trainingPlans;
    } catch (error: any) {
        return rejectWithValue(error.message || 'Błąd ładowania planów');
    }
});

const trainingPlansSlice = createSlice({
    name: 'trainingPlans',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadTrainingPlans.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadTrainingPlans.fulfilled, (state, action) => {
                state.loading = false;
                state.trainingPlans = action.payload;
            })
            .addCase(loadTrainingPlans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default trainingPlansSlice.reducer;
