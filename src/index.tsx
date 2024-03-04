import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'normalize.css';
import 'antd/dist/antd.css';
import './index.css';
import AppRouter from './routes/AppRoter.tsx';
import { HistoryRouter } from 'redux-first-history/rr6';
import { reduxHistory } from '@redux/reducers/routerSlice.ts';
import { store } from '@redux/store.ts';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

window.onload = function () {
    sessionStorage.removeItem('jwtToken');
};
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={reduxHistory(store)}>
                <AppRouter />
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
