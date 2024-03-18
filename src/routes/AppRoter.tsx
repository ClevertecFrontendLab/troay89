import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Enter } from '@pages/auth-page/Enter.tsx';
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
import { FeedbacksPage } from '@pages/feedbacks-page/FeedbacksPage.tsx';
import { MainPage } from '@pages/main-page/MainPage.tsx';
import { JVT_TOKEN, paths } from '@constants/constants.ts';
import { TrainingList } from '@pages/calendar/CustomCalendar.tsx';

const allRoutes: RouteObject = {
    path: paths.root.path,
    children: [
        { path: paths.main.path, element: <MainPage /> },
        { path: paths.auth.path, element: <Enter /> },
        { path: paths.registration.path, element: <Enter /> },
        { path: paths.feedbacks.path, element: <FeedbacksPage /> },
        { path: paths.trainingList.path, element: <TrainingList /> },
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
        const isAuthUser = sessionStorage.getItem(JVT_TOKEN) || localStorage.getItem(JVT_TOKEN);
        if (location.pathname.startsWith('/result')) {
            setRedirectToAuth(true);
        } else if (
            !isAuthUser &&
            (location.pathname.startsWith('/main') ||
                location.pathname.startsWith('/feedbacks') ||
                location.pathname.startsWith('/catalogs/training-list'))
        ) {
            setRedirectToAuth(true);
        } else if (isAuthUser && location.pathname.startsWith('/auth')) {
            setRedirectToAuth(false);
            history.push(paths.main.path);
        } else if (location.pathname === '/') {
            const url = new URL(window.location.href);
            const accessToken = url.searchParams.get('accessToken');
            if (accessToken) {
                localStorage.setItem(JVT_TOKEN, accessToken);
                window.location.href = '/main';
                history.push(paths.main.path);
            } else {
                history.push(paths.auth.path);
            }
        } else {
            setRedirectToAuth(false);
        }
    }, [redirectToAuth]);

    const routes = useRoutes([allRoutes]);

    return <>{redirectToAuth ? <Navigate to={paths.auth.path} replace /> : routes}</>;
});

AppRouter.displayName = 'AppRouter';

export default AppRouter;
