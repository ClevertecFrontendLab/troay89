import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import React from 'react';
import { Auth } from '@pages/auth-page/Auth.tsx';
import { LaunchPage } from '@pages/launch-page';

const paths = {
    root: {
        path: '/',
    },
    main: {
        path: '/main',
    },
    auth: {
        path: '/auth',
    },
    registration: {
        path: '/auth/registration',
    },
};

const allRoutes: RouteObject = {
    path: paths.root.path,
    children: [
        { index: true, element: <Navigate to={paths.main.path} replace /> },
        { path: paths.main.path, element: <LaunchPage /> },
        { path: paths.auth.path, element: <Auth /> },
        { path: paths.registration.path, element: <Auth /> },
    ],
};

export const AppRouter = React.memo(() => {
    return useRoutes([allRoutes]);
});

AppRouter.displayName = 'AppRouter';

export default AppRouter;
