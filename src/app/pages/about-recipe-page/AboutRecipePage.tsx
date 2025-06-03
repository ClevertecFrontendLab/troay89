import {
    useBookmarkMutation,
    useDeleteRecipeMutation,
    useGetRecipesQuery,
    useLazyGetBloggerQuery,
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
    const [putLikeUnlike, { isLoading: isLoadingLikeUnLike, isError: isErrorLikeUnlike }] =
        useLikeRecipeMutation();
    const [saveRemoveBookmark, { isLoading: isLoadingBookmark, isError: isErrorBookmark }] =
        useBookmarkMutation();
    const [getBlogger, { isLoading: isLoadingAuthor }] = useLazyGetBloggerQuery();

    const isPending =
        isLoading ||
        isLoadingDeleteRecipe ||
        isLoadingLikeUnLike ||
        isLoadingBookmark ||
        isLoadingAuthor;

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
            isErrorLikeUnlike={isErrorLikeUnlike}
            isErrorBookmark={isErrorBookmark}
            saveRemoveBookmark={saveRemoveBookmark}
            getBlogger={getBlogger}
        />
    );
};
