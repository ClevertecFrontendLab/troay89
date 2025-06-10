import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';

import { AlertSuccess } from '~/components/alert/alert-success/AlertSuccess';
import { withLoader } from '~/components/with-loader/WithLoader';
import { SUCCESS_MESSAGE } from '~/constants/successMessage';
import { idRecipeSelector } from '~/store/selectors/indexCategoriesSubcategoriesSliceSelector';
import {
    useBookmarkMutation,
    useDeleteRecipeMutation,
    useGetRecipeQuery,
    useLikeRecipeMutation,
} from '~/store/slice/api/api-slice';
import { setIndexRecipe, setNameRecipe } from '~/store/slice/indexCategoriesSubcategoriesSlice';
import { BloggerData } from '~/type/bloggerData';
import { RecipeType, RecipeTypeResponse } from '~/type/RecipeType';

import { AuthorCard } from '../author-card/AuthorCard';
import CaloricDish from '../caloric-dish/CaloricDish';
import { CardAboutRecipe } from '../card-about-recipe/CardAboutRecipe';
import { CookingSteps } from '../cooking-steps/CookingSteps';
import { NewBlock } from '../new-block/NewBlock';
import { TableIngredients } from '../table-ingredients/TableIndegrients';

type AboutRecipeContentType = {
    isErrorRecipe: boolean;
    isSwiperError: boolean;
    IsErrorDeleteRecipe: boolean;
    isErrorLikeUnlike: boolean;
    isErrorBookmark: boolean;
    putLikeUnlike: ReturnType<typeof useLikeRecipeMutation>[0];
    saveRemoveBookmark: ReturnType<typeof useBookmarkMutation>[0];
    deleteRecipe: ReturnType<typeof useDeleteRecipeMutation>[0];
    getRecipe: ReturnType<typeof useGetRecipeQuery>[0];
    setAuthorId: (id: string) => void;
    getBlogger?: BloggerData;
    swiperData?: RecipeTypeResponse;
    recipeData?: RecipeType;
};

const AboutRecipeContent = ({
    recipeData,
    getRecipe,
    isErrorRecipe,
    isSwiperError,
    swiperData,
    deleteRecipe,
    IsErrorDeleteRecipe,
    putLikeUnlike,
    saveRemoveBookmark,
    getBlogger,
    isErrorLikeUnlike,
    isErrorBookmark,
    setAuthorId,
}: AboutRecipeContentType) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const idRecipe = useSelector(idRecipeSelector);
    const [isShowAlertSuccessModal, setIsShowAlertSuccessModal] = useState<boolean>(
        (location.state && location.state.showAlert) || false,
    );

    useEffect(() => {
        if (idRecipe && !recipeData) {
            getRecipe({ id: idRecipe });
        } else {
            if (recipeData && recipeData.authorId) {
                setAuthorId(recipeData.authorId);
            }
            if (id) {
                dispatch(setIndexRecipe(id));
            }
            if (recipeData) {
                dispatch(setNameRecipe(recipeData?.title));
            }
        }
    }, [recipeData, dispatch, id, idRecipe, getRecipe, setAuthorId]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [idRecipe]);

    useEffect(() => {
        if (isErrorRecipe || isSwiperError) {
            navigate(-1);
        }
    }, [isErrorRecipe, navigate, isSwiperError]);

    return (
        <>
            {recipeData && (
                <Box px={{ base: 4, bp76: 0 }}>
                    <CardAboutRecipe
                        recipeData={recipeData}
                        deleteRecipe={deleteRecipe}
                        IsErrorDeleteRecipe={IsErrorDeleteRecipe}
                        putLikeUnlike={putLikeUnlike}
                        saveRemoveBookmark={saveRemoveBookmark}
                        isErrorLikeUnlike={isErrorLikeUnlike}
                        isErrorBookmark={isErrorBookmark}
                    />
                    <CaloricDish
                        calories={recipeData.nutritionValue.calories}
                        protein={recipeData.nutritionValue.protein}
                        fats={recipeData.nutritionValue.fats}
                        carbohydrates={recipeData.nutritionValue.carbohydrates}
                    />
                    <TableIngredients
                        portions={recipeData.portions}
                        ingredients={recipeData.ingredients}
                    />
                    <CookingSteps steps={recipeData.steps} />
                    <AuthorCard bloggerData={getBlogger} />
                    {swiperData && <NewBlock swipeData={swiperData.data} />}
                    {isShowAlertSuccessModal && (
                        <AlertSuccess
                            onClose={() => setIsShowAlertSuccessModal(false)}
                            message={SUCCESS_MESSAGE.SUCCESS_CREATE_RECIPE}
                            position='fixed'
                            left='50%'
                            transform='translateX(-50%)'
                        />
                    )}
                </Box>
            )}
        </>
    );
};

export const AboutRecipeWithLoader = withLoader(AboutRecipeContent);
