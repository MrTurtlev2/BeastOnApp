// trainingPlansSlice.ts

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchTrainingPlansAsync} from '../api/TrainingShedule';
import {ITrainingPlansState} from '../constants/interfaces';

const initialState: ITrainingPlansState = {
    trainingPlans: [],
    loading: false,
    error: null,
};

export const loadTrainingPlans = createAsyncThunk('trainingPlans/load', async (_, {rejectWithValue}) => {
    try {
        return await fetchTrainingPlansAsync();
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
