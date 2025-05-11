import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { appSlice } from './slice/app-slice';
import getArrayCategoryReducer from './slice/arrayCategory';
import arrayResultFilterReducer from './slice/arrayResultFilterSlice';
import firstPartDataCreateUserReducer from './slice/firstPartDataCreateUser';
import headerZIndexReducer from './slice/headerZIndex';
import indexTabsReducer from './slice/indexCategoriesSubcategoriesSlice';
import overlayPositionReducer from './slice/overlayPosition';
import stateSwitchAllergenReducer from './slice/stateSwitchAllergenSlice';

const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.reducerPath]: appSlice.reducer,
    indexTabs: indexTabsReducer,
    arrayResultFilter: arrayResultFilterReducer,
    headerZIndex: headerZIndexReducer,
    setArrayCategory: getArrayCategoryReducer,
    getPosition: overlayPositionReducer,
    getStateSwitchAllergen: stateSwitchAllergenReducer,
    firstPartDataCreateUser: firstPartDataCreateUserReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appSlice.middleware),
    devTools: !isProduction,
});
