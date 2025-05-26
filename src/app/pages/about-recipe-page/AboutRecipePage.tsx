import { useGetRecipesQuery, useLazyGetRecipeQuery } from '~/store/slice/api/api-slice';

import { AboutRecipeWithLoader } from './components/about-recipe-content/AboutRecipeContent';

export const AboutRecipePage = () => {
    const { data: swiperData, isError: isSwiperError } = useGetRecipesQuery({
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'asc',
    });
    const [getRecipe, { data: recipeData, isLoading, isError: isErrorRecipe }] =
        useLazyGetRecipeQuery();

    return (
        <AboutRecipeWithLoader
            isLoading={isLoading}
            getRecipe={getRecipe}
            isErrorRecipe={isErrorRecipe}
            isSwiperError={isSwiperError}
            swiperData={swiperData}
            recipeData={recipeData}
        />
    );
};
