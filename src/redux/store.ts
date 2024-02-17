import { configureStore } from '@reduxjs/toolkit';
import { routerMiddlewareSlice, routerReducerSlice } from '@redux/reducers/routerSlice.ts';

export const store = configureStore({
    reducer: {
        router: routerReducerSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddlewareSlice),
});

console.log(store.getState);
console.log(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
