import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Enter } from '@pages/auth-page/Enter.tsx';
import { MainPage } from '@pages/main-page';
import { EmailRegistrationError } from '@pages/auth-page/state/EmailRegistrationError.tsx';
import { GeneralRegistrationError } from '@pages/auth-page/state/GeneralRegistrationError.tsx';
import { SuccessReg } from '@pages/auth-page/state/SuccessReg.tsx';
import { GeneralAuthError } from '@pages/auth-page/state/GeneralAuthError.tsx';
import { history } from '@redux/reducers/routerSlice.ts';
import { EmailResetPasswordError } from '@pages/auth-page/state/EmailResetPasswordError.tsx';
import { GeneralResetPasswordError } from '@pages/auth-page/state/GeneralResetPasswordError.tsx';
import { CheckCodeEmail } from '@pages/auth-page/state/CheckCodeEmail.tsx';
import { ChangePassword } from '@pages/change-password/ChangePassword.tsx';
import { SuccessChangePassword } from '@pages/auth-page/state/SuccessChangePassword.tsx';
import { GeneralChangePasswordError } from '@pages/auth-page/state/GeneralChangePasswordError.tsx';
import { Feedbacks } from '@pages/feedbacks-page/Feedbacks.tsx';

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
    feedbacks: {
        path: '/feedbacks',
    },
    confirmEmail: {
        path: '/auth/confirm-email',
    },
    changePassport: {
        path: '/auth/change-password',
    },
    successRegistration: {
        path: '/result/success',
    },
    successChangePassport: {
        path: '/result/success-change-password',
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
    errorChangePasswordGeneral: {
        path: '/result/error-change-password',
    },
};

const allRoutes: RouteObject = {
    path: paths.root.path,
    children: [
        { index: true, element: <Navigate to={paths.main.path} replace /> },
        { path: paths.main.path, element: <MainPage /> },
        { path: paths.auth.path, element: <Enter /> },
        { path: paths.registration.path, element: <Enter /> },
        { path: paths.feedbacks.path, element: <Feedbacks /> },
        { path: paths.successRegistration.path, element: <SuccessReg /> },
        { path: paths.successChangePassport.path, element: <SuccessChangePassword /> },
        { path: paths.confirmEmail.path, element: <CheckCodeEmail /> },
        { path: paths.changePassport.path, element: <ChangePassword /> },
        { path: paths.errorRegistrationEmail.path, element: <EmailRegistrationError /> },
        { path: paths.errorResetEmail.path, element: <EmailResetPasswordError /> },
        { path: paths.errorRegistrationGeneral.path, element: <GeneralRegistrationError /> },
        { path: paths.errorAuthGeneral.path, element: <GeneralAuthError /> },
        { path: paths.errorCheckEmailGeneral.path, element: <GeneralResetPasswordError /> },
        { path: paths.errorChangePasswordGeneral.path, element: <GeneralChangePasswordError /> },
    ],
};

export const AppRouter = React.memo(() => {
    const [redirectToAuth, setRedirectToAuth] = useState(false);

    useEffect(() => {
        const isAuthUser = sessionStorage.getItem('jwtToken') || localStorage.getItem('jwtToken');
        if (
            location.pathname.startsWith('/result') &&
            history.location.state &&
            typeof history.location.state === 'object' &&
            'from' in history.location.state &&
            typeof history.location.state.from === 'string' &&
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
