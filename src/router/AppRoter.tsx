import { memo } from 'react';
import { RouteObject, useRoutes } from 'react-router';

import Layout from '~/app/layout/Layout';
import AboutRecipePage from '~/app/pages/about-recipe-page/AboutRecipePage';
import JuicyPage from '~/app/pages/juicy-page/JuicyPage';
import RecipesPage from '~/app/pages/recipes-page/RecipesPage';

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
    recipes: {
        path: '/recipes/:category/:subcategories',
    },
};

const allRoutes: RouteObject = {
    path: paths.root.path,
    element: <Layout />,
    children: [
        { path: paths.root.path, element: <AboutRecipePage /> },
        { path: paths.juicy.path, element: <JuicyPage /> },
        { path: paths.recipes.path, element: <RecipesPage /> },
    ],
};

export const AppRouter = memo(() => useRoutes([allRoutes]));
AppRouter.displayName = 'AppRouter';

export default AppRouter;
