import { configureStore } from '@reduxjs/toolkit';
import saveDataReducer from './reducers/userSlice.ts';
import saveEmailReducer from './reducers/userEmailSlice.ts';
import saveNewPasswordReduce from './reducers/userNewPassword.ts';
import saveCommentsReduce from './reducers/commentsSlice.ts';
import saveTrainingReducer from './reducers/listTrainingSlice.ts';
import savePersonalTrainingReducer from './reducers/listPersonalTrainingSlice.ts';
import editPersonalTrainingReducer from './reducers/editTrainingSlice.ts';
import saveInfoUserReducer from './reducers/userInfo.ts';
import saveListDrawerReducer from './reducers/drawerReduce.ts';
import { routerMiddlewareSlice, routerReducerSlice } from '@redux/reducers/routerSlice.ts';
import { apiSlices } from '@redux/reducers/apiSlice.ts';

export const store = configureStore({
    reducer: {
        router: routerReducerSlice,
        saveData: saveDataReducer,
        saveEmail: saveEmailReducer,
        saveNewPassword: saveNewPasswordReduce,
        saveComments: saveCommentsReduce,
        saveListTraining: saveTrainingReducer,
        savePersonalListTraining: savePersonalTrainingReducer,
        editPersonalTraining: editPersonalTrainingReducer,
        saveListDrawer: saveListDrawerReducer,
        saveInfoUser: saveInfoUserReducer,
        [apiSlices.reducerPath]: apiSlices.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddlewareSlice).concat(apiSlices.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
