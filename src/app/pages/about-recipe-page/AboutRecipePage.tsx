import {
    useBookmarkMutation,
    useDeleteRecipeMutation,
    useGetRecipesQuery,
    useLazyGetRecipeQuery,
    useLikeRecipeMutation,
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
    const [deleteRecipe, { isLoading: isLoadingDeleteRecipe, isError: IsErrorDeleteRecipe }] =
        useDeleteRecipeMutation();
    const [putLikeUnlike] = useLikeRecipeMutation();
    const [saveRemoveBookmark] = useBookmarkMutation();

    const isPending = isLoading || isLoadingDeleteRecipe;

    return (
        <AboutRecipeWithLoader
            isLoading={isPending}
            getRecipe={getRecipe}
            isErrorRecipe={isErrorRecipe}
            isSwiperError={isSwiperError}
            swiperData={swiperData}
            recipeData={recipeData}
            deleteRecipe={deleteRecipe}
            IsErrorDeleteRecipe={IsErrorDeleteRecipe}
            putLikeUnlike={putLikeUnlike}
            saveRemoveBookmark={saveRemoveBookmark}
        />
    );
};
