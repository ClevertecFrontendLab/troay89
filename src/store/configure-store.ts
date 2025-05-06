import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { appSlice } from './slice/app-slice';
import getArrayCategoryReducer from './slice/arrayCategory';
import arrayResultFilterReducer from './slice/arrayResultFilterSlice';
import countCardActiveTabReducer from './slice/countCardActiveTabSlice';
import headerZIndexReducer from './slice/headerZIndex';
import indexNavigationButtonReducer from './slice/indexNavigationButtonSlice';
import indexTabsReducer from './slice/indexTabsSlice';
import overlayPositionReducer from './slice/overlayPosition';
import stateSwitchAllergenReducer from './slice/stateSwitchAllergenSlice';

const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.reducerPath]: appSlice.reducer,
    indexTabs: indexTabsReducer,
    indexNavigationButton: indexNavigationButtonReducer,
    arrayResultFilter: arrayResultFilterReducer,
    headerZIndex: headerZIndexReducer,
    countCardActiveTab: countCardActiveTabReducer,
    setArrayCategory: getArrayCategoryReducer,
    getPosition: overlayPositionReducer,
    getStateSwitchAllergen: stateSwitchAllergenReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appSlice.middleware),
    devTools: !isProduction,
});
