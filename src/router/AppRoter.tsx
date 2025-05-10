import { memo } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router';

import { Layout } from '~/app/layout/Layout';
import { AboutRecipePage } from '~/app/pages/about-recipe-page/AboutRecipePage';
import { JuicyPage } from '~/app/pages/juicy-page/JuicyPage';
import { NotFoundPage } from '~/app/pages/not-found-page/NotFoundPage';
import { RecipesPage } from '~/app/pages/recipes-page/RecipesPage';
import { MainPage } from '~/app/pages/start-page/MainPage';

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
};

const allRoutes: RouteObject = {
    path: paths.root.path,
    element: <Layout />,
    children: [
        { path: paths.root.path, element: <MainPage /> },
        { path: paths.juicy.path, element: <JuicyPage /> },
        { path: paths.recipes.path, element: <RecipesPage /> },
        { path: paths.aboutRecipe.path, element: <AboutRecipePage /> },
        { path: paths.juicyAboutRecipe.path, element: <AboutRecipePage /> },
        { path: paths.notFound.path, element: <NotFoundPage /> },
        { path: '*', element: <Navigate to='/not-found' replace /> },
    ],
};

export const AppRouter = memo(() => useRoutes([allRoutes]));
AppRouter.displayName = 'AppRouter';

export default AppRouter;
