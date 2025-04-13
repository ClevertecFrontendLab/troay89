import { memo } from 'react';
import { RouteObject, useRoutes } from 'react-router';

import JuicyPage from '~/app/pages/juicy-page/JuicyPage';
import MainPage from '~/app/pages/start-page/MainPage';
import VeganPage from '~/app/pages/vegan-page/VeganPage';

const paths = {
    root: {
        path: '/',
    },
    main: {
        path: '/',
    },
    juicy: {
        path: '/juicy',
    },
    vegan: {
        path: '/vegan',
    },
};

const allRoutes: RouteObject = {
    path: paths.root.path,
    children: [
        { path: paths.root.path, element: <MainPage /> },
        { path: paths.juicy.path, element: <JuicyPage /> },
        { path: paths.vegan.path, element: <VeganPage /> },
    ],
};

export const AppRouter = memo(() => useRoutes([allRoutes]));
AppRouter.displayName = 'AppRouter';

export default AppRouter;
