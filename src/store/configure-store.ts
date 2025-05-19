import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './slice/api/api-slice';
import getArrayCategoryReducer from './slice/arrayCategory';
import arrayResultFilterReducer from './slice/arrayResultFilterSlice';
import firstPartDataCreateUserReducer from './slice/firstPartDataCreateUser';
import headerZIndexReducer from './slice/headerZIndex';
import indexTabsReducer from './slice/indexCategoriesSubcategoriesSlice';
import overlayPositionReducer from './slice/overlayPosition';
import saveEmailReducer from './slice/saveEmailSlice';
import stateSwitchAllergenReducer from './slice/stateSwitchAllergenSlice';

const isProduction = false;
const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    indexTabs: indexTabsReducer,
    arrayResultFilter: arrayResultFilterReducer,
    headerZIndex: headerZIndexReducer,
    setArrayCategory: getArrayCategoryReducer,
    getPosition: overlayPositionReducer,
    getStateSwitchAllergen: stateSwitchAllergenReducer,
    firstPartDataCreateUser: firstPartDataCreateUserReducer,
    getSaveEmail: saveEmailReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: !isProduction,
});
