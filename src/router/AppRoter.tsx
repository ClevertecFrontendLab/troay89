import { memo } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router';

import { AccountTabs } from '~/app/layout/account_layout/account-tabs/AccountTabs';
import { AccountLayout } from '~/app/layout/account_layout/AccountLayout';
import { Layout } from '~/app/layout/Layout';
import { AboutRecipePage } from '~/app/pages/about-recipe-page/AboutRecipePage';
import { JuicyPage } from '~/app/pages/juicy-page/JuicyPage';
import { NotFoundPage } from '~/app/pages/not-found-page/NotFoundPage';
import { RecipesPage } from '~/app/pages/recipes-page/RecipesPage';
import { VerificationPage } from '~/app/pages/verification-page/VerificationPage';

import PrivateRoute from './PrivateRouter';

const paths = {
    root: {
        path: '/',
    },
    main: {
        path: '/',
    },
    juicy: {
        path: '/the-juiciest',
    },
    juicyAboutRecipe: {
        path: '/the-juiciest/:id',
    },
    recipes: {
        path: '/recipes/:category/:subcategories',
    },
    aboutRecipe: {
        path: '/recipes/:category/:subcategories/:id',
    },
    notFound: {
        path: '/not-found',
    },
    account: {
        path: '/account',
    },
    registration: {
        path: '/account/registration',
    },
    finishRegistration: {
        path: '/account/finish-registration',
    },
    authorization: {
        path: '/account/login',
    },
    verification: {
        path: '/verification',
    },
};

const accountRoutes: RouteObject = {
    path: paths.account.path,
    element: <AccountLayout />,
    children: [
        { path: paths.registration.path, element: <AccountTabs /> },
        { path: paths.finishRegistration.path, element: <AccountTabs /> },
        { path: paths.authorization.path, element: <AccountTabs /> },
    ],
};

const recipeRoutes: RouteObject = {
    path: paths.root.path,
    element: <Layout />,
    children: [
        { path: paths.root.path, element: <PrivateRoute /> },
        { path: paths.juicy.path, element: <JuicyPage /> },
        { path: paths.recipes.path, element: <RecipesPage /> },
        { path: paths.aboutRecipe.path, element: <AboutRecipePage /> },
        { path: paths.juicyAboutRecipe.path, element: <AboutRecipePage /> },
        { path: paths.notFound.path, element: <NotFoundPage /> },
        { path: paths.verification.path, element: <VerificationPage /> },
        { path: '*', element: <Navigate to='/not-found' replace /> },
    ],
};

const allRoutes: RouteObject[] = [accountRoutes, recipeRoutes];

export const AppRouter = memo(() => useRoutes(allRoutes));
AppRouter.displayName = 'AppRouter';

export default AppRouter;
