import { configureStore } from '@reduxjs/toolkit';
import serverRequestReducer from './reducers/isServerRequestSlice.ts';
import { routerMiddlewareSlice, routerReducerSlice } from '@redux/reducers/routerSlice.ts';
import { apiSlices } from '@redux/reducers/apiSlice.ts';

export const store = configureStore({
    reducer: {
        router: routerReducerSlice,
        serverRequest: serverRequestReducer,
        [apiSlices.reducerPath]: apiSlices.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddlewareSlice).concat(apiSlices.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
