import { createSlice } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

export const history = createBrowserHistory();
const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history,
});

const routerSlice = createSlice({
    name: 'router',
    initialState: {},
    reducers: {},
});

export const reduxHistory = createReduxHistory;
export const routerActions = routerSlice.actions;
export const routerMiddlewareSlice = routerMiddleware;
export const routerReducerSlice = routerReducer;
