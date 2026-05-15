import {Action, combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import userReducer from './userSlice';
import trainingPlansReducer from './trainingPlansSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {mmkvStorage} from './mmkvStorage';
import Reactotron from './ReactotronConfig';

const persistConfig = {
    key: 'root',
    storage: mmkvStorage,

    whitelist: ['user', 'trainingPlans'],
};

const combinedReducer = combineReducers({
    user: userReducer,
    trainingPlans: trainingPlansReducer,
});

const rootReducer = (state, action: Action) => {
    if (action.type === 'RESET') {
        state = {};
    }
    return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: false,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    enhancers: getDefaultEnhancers => {
        const enhancers = getDefaultEnhancers();
        if (__DEV__ && Reactotron.createEnhancer) {
            return enhancers.concat(Reactotron.createEnhancer());
        }
        return enhancers;
    },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
