import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import trainingPlansReducer from './trainingPlansSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const store = configureStore({
    reducer: {
        user: userReducer,
        trainingPlans: trainingPlansReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
