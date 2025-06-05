import { createBrowserRouter, Navigate, RouteObject } from 'react-router';

import { AccountTabs } from '~/app/layout/account-layout/account-tabs/AccountTabs';
import { AccountLayout } from '~/app/layout/account-layout/AccountLayout';
import { Layout } from '~/app/layout/layout-app/Layout';
import { AboutRecipePage } from '~/app/pages/about-recipe-page/AboutRecipePage';
import { BlogPage } from '~/app/pages/blog-page/BlogPage';
import { BloggerProfilePage } from '~/app/pages/blogger-profile-page/BloggerProfilePage';
import { JuicyPage } from '~/app/pages/juicy-page/JuicyPage';
import { NewRecipePage } from '~/app/pages/new-recipe-page/NewRecipePage';
import { NotFoundPage } from '~/app/pages/not-found-page/NotFoundPage';
import { RecipesPage } from '~/app/pages/recipes-page/RecipesPage';
import { MainPage } from '~/app/pages/start-page/MainPage';
import { VerificationPage } from '~/app/pages/verification-page/VerificationPage';

import { PrivateRoute } from './PrivateRouter';
import { RedirectToRecipes } from './RedirectToRecipes';

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
    aboutRecipeTwo: {
        path: '/:category/:subcategories/:id',
    },
    editRecipe: {
        path: '/edit-recipe/:category/:subcategories/:id',
    },
    newRecipe: {
        path: '/recipes/new-recipe',
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
    blogs: {
        path: '/blogs',
    },
    blogAuthor: {
        path: '/blogs/:id',
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
        { path: paths.root.path, element: <PrivateRoute children={<MainPage />} /> },
        { path: paths.juicy.path, element: <JuicyPage /> },
        { path: paths.recipes.path, element: <RecipesPage /> },
        { path: paths.aboutRecipe.path, element: <AboutRecipePage /> },
        { path: paths.aboutRecipeTwo.path, element: <RedirectToRecipes /> },
        { path: paths.juicyAboutRecipe.path, element: <AboutRecipePage /> },
        { path: paths.notFound.path, element: <NotFoundPage /> },
        { path: paths.verification.path, element: <VerificationPage /> },
        { path: paths.newRecipe.path, element: <NewRecipePage /> },
        { path: paths.editRecipe.path, element: <NewRecipePage /> },
        { path: paths.blogs.path, element: <BlogPage /> },
        { path: paths.blogAuthor.path, element: <BloggerProfilePage /> },
        { path: '*', element: <Navigate to='/not-found' replace /> },
    ],
};

const allRoutes: RouteObject[] = [accountRoutes, recipeRoutes];

export const router = createBrowserRouter(allRoutes);
