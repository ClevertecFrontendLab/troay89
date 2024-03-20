import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';
import AppRouter from './routes/AppRoter.tsx';
import { HistoryRouter } from 'redux-first-history/rr6';
import { history, reduxHistory } from '@redux/reducers/routerSlice.ts';
import { store } from '@redux/store.ts';
import 'normalize.css';
import './index.css';
import './root.css';
import { JVT_TOKEN } from '@constants/constants.ts';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

window.onload = function () {
    if (sessionStorage.getItem(JVT_TOKEN)) {
        sessionStorage.removeItem(JVT_TOKEN);
        history.push('/auth');
    }
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
