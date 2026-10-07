import api from './config';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchTrainingPlans = createAsyncThunk('trainingPlans/fetchTrainingPlans', async (_, {rejectWithValue}) => {
    try {
        const response = await api.get('/api/training-plans/weekly-schedule');
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});
