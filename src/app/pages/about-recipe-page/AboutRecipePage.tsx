import {
    useDeleteRecipeMutation,
    useGetRecipesQuery,
    useLazyGetRecipeQuery,
} from '~/store/slice/api/api-slice';

import { AboutRecipeWithLoader } from './components/about-recipe-content/AboutRecipeContent';

export const AboutRecipePage = () => {
    const { data: swiperData, isError: isSwiperError } = useGetRecipesQuery({
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'asc',
    });
    const [getRecipe, { data: recipeData, isLoading, isError: isErrorRecipe }] =
        useLazyGetRecipeQuery();
    const [deleteRecipe, { isLoading: isLoadngDeleteRecipe, isError: IsErrorDeleteRecipe }] =
        useDeleteRecipeMutation();

    const isPemding = isLoading || isLoadngDeleteRecipe;

    return (
        <AboutRecipeWithLoader
            isLoading={isPemding}
            getRecipe={getRecipe}
            isErrorRecipe={isErrorRecipe}
            isSwiperError={isSwiperError}
            swiperData={swiperData}
            recipeData={recipeData}
            deleteRecipe={deleteRecipe}
            IsErrorDeleteRecipe={IsErrorDeleteRecipe}
        />
    );
};
