import { Navigate, RouteObject, useLocation, useRoutes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Enter } from '@pages/auth-page/Enter.tsx';
import { LaunchPage } from '@pages/launch-page';
import { EmailRegistrationError } from '@pages/auth-page/state/EmailRegistrationError.tsx';
import { GeneralRegistrationError } from '@pages/auth-page/state/GeneralRegistrationError.tsx';
import { SuccessReg } from '@pages/auth-page/state/SuccessReg.tsx';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { GeneralAuthError } from '@pages/auth-page/state/GeneralAuthError.tsx';

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
    successRegistration: {
        path: '/result/success',
    },
    errorRegistrationEmail: {
        path: '/result/error-user-exist',
    },
    errorRegistrationGeneral: {
        path: '/result/error',
    },
    errorAuthGeneral: {
        path: '/result/error-login',
    },
};

const allRoutes: RouteObject = {
    path: paths.root.path,
    children: [
        { index: true, element: <Navigate to={paths.main.path} replace /> },
        { path: paths.main.path, element: <LaunchPage /> },
        { path: paths.auth.path, element: <Enter /> },
        { path: paths.registration.path, element: <Enter /> },
        { path: paths.successRegistration.path, element: <SuccessReg /> },
        { path: paths.errorRegistrationEmail.path, element: <EmailRegistrationError /> },
        { path: paths.errorRegistrationGeneral.path, element: <GeneralRegistrationError /> },
        { path: paths.errorAuthGeneral.path, element: <GeneralAuthError /> },
    ],
};

export const AppRouter = React.memo(() => {
    const location = useLocation();
    // const [isAuthenticated, setIsAuthenticated] = useState(false); // Замените это на вашу логику аутентификации
    const [redirectToAuth, setRedirectToAuth] = useState(false);
    const serverRequestMade = useAppSelector((state) => state.serverRequest.isServerRequest);
    useEffect(() => {
        if (location.pathname.startsWith('/result') && !serverRequestMade) {
            setRedirectToAuth(true);
        } else {
            setRedirectToAuth(false);
        }
    }, [location, serverRequestMade]);

    const routes = useRoutes([allRoutes]);

    return <>{redirectToAuth ? <Navigate to={paths.auth.path} replace /> : routes}</>;
});

AppRouter.displayName = 'AppRouter';

export default AppRouter;
