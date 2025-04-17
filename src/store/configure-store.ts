import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '~/query/create-api';

import appReducer, { appSlice } from './slice/app-slice';
import indexNavigationButtonReducer from './slice/indexNavigationButtonSlice';
import indexTabsReducer from './slice/indexTabsSlice';

const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    indexTabs: indexTabsReducer,
    indexNavigationButton: indexNavigationButtonReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: !isProduction,
});
