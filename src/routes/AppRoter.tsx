import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Enter } from '@pages/auth-page/Enter.tsx';
import { LaunchPage } from '@pages/launch-page';
import { EmailRegistrationError } from '@pages/auth-page/state/EmailRegistrationError.tsx';
import { GeneralRegistrationError } from '@pages/auth-page/state/GeneralRegistrationError.tsx';
import { SuccessReg } from '@pages/auth-page/state/SuccessReg.tsx';
import { GeneralAuthError } from '@pages/auth-page/state/GeneralAuthError.tsx';
import { history } from '@redux/reducers/routerSlice.ts';
import { EmailResetPasswordError } from '@pages/auth-page/state/EmailResetPasswordError.tsx';
import { GeneralResetPasswordError } from '@pages/auth-page/state/GeneralResetPasswordError.tsx';
import { CheckCodeEmail } from '@pages/auth-page/state/CheckCodeEmail.tsx';

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
    confirmEmail: {
        path: '/auth/confirm-email',
    },
    successRegistration: {
        path: '/result/success',
    },
    errorRegistrationEmail: {
        path: '/result/error-user-exist',
    },
    errorResetEmail: {
        path: '/result/error-check-email-no-exist',
    },
    errorRegistrationGeneral: {
        path: '/result/error',
    },
    errorAuthGeneral: {
        path: '/result/error-login',
    },
    errorCheckEmailGeneral: {
        path: '/result/error-check-email',
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
        { path: paths.confirmEmail.path, element: <CheckCodeEmail /> },
        { path: paths.errorRegistrationEmail.path, element: <EmailRegistrationError /> },
        { path: paths.errorResetEmail.path, element: <EmailResetPasswordError /> },
        { path: paths.errorRegistrationGeneral.path, element: <GeneralRegistrationError /> },
        { path: paths.errorAuthGeneral.path, element: <GeneralAuthError /> },
        { path: paths.errorCheckEmailGeneral.path, element: <GeneralResetPasswordError /> },
    ],
};

export const AppRouter = React.memo(() => {
    const [redirectToAuth, setRedirectToAuth] = useState(false);

    useEffect(() => {
        const isAuthUser = sessionStorage.getItem('jwtToken') || localStorage.getItem('jwtToken');
        if (
            location.pathname.startsWith('/result') &&
            !history.location.state?.from.startsWith('/auth')
        ) {
            setRedirectToAuth(true);
        } else if (!isAuthUser && location.pathname.startsWith('/main')) {
            setRedirectToAuth(true);
        } else if (isAuthUser && location.pathname.startsWith('/auth')) {
            setRedirectToAuth(false);
            history.push(paths.main.path);
        } else {
            setRedirectToAuth(false);
        }
    }, [redirectToAuth]);

    const routes = useRoutes([allRoutes]);

    return <>{redirectToAuth ? <Navigate to={paths.auth.path} replace /> : routes}</>;
});

AppRouter.displayName = 'AppRouter';

export default AppRouter;
