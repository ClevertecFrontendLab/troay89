import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';

import { AuthorBlock } from '~/app/pages/start-page/components/author-block/AuthorBlock';
import { AlertSuccess } from '~/components/alert/alert-success/AlertSuccess';
import { withLoader } from '~/components/with-loader/WithLoader';
import { SUCCESS_MESSAGE } from '~/constants/successMessage';
import { idRecipeSelector } from '~/store/selectors/indexCategoriesSubcategoriesSliceSelector';
import { useDeleteRecipeMutation, useGetRecipeQuery } from '~/store/slice/api/api-slice';
import { setIndexRecipe, setNameRecipe } from '~/store/slice/indexCategoriesSubcategoriesSlice';
import { RecipeType, RecipeTypeResponse } from '~/type/recipeType';

import CaloricDish from '../caloric-dish/CaloricDish';
import { CardAboutRecipe } from '../card-about-recipe/CardAboutRecipe';
import { CookingSteps } from '../cooking_steps/CookingSteps';
import { NewBlock } from '../new-block/NewBlock';
import { TableIngredients } from '../table-ingredients/TableIndegrients';

type AboutRecipeContentType = {
    getRecipe: ReturnType<typeof useGetRecipeQuery>[0];
    isErrorRecipe: boolean;
    isSwiperError: boolean;
    swiperData?: RecipeTypeResponse;
    recipeData?: RecipeType;
    deleteRecipe: ReturnType<typeof useDeleteRecipeMutation>[0];
    IsErrorDeleteRecipe: boolean;
};

const AboutRecipeContent = ({
    recipeData,
    getRecipe,
    isErrorRecipe,
    isSwiperError,
    swiperData,
    deleteRecipe,
    IsErrorDeleteRecipe,
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
            if (id) {
                dispatch(setIndexRecipe(id));
            }
            if (recipeData) {
                dispatch(setNameRecipe(recipeData?.title));
            }
        }
    }, [recipeData, dispatch, id, idRecipe, getRecipe]);

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
                    <AuthorBlock />
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
