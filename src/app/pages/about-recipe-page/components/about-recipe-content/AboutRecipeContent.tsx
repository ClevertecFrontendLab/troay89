import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { AuthorBlock } from '~/app/pages/start-page/components/author-block/AuthorBlock';
import { withLoader } from '~/components/with-loader/WithLoader';
import { idRecipeSelector } from '~/store/selectors/indexCategoriesSubcategoriesSliceSelector';
import { useGetRecipeQuery } from '~/store/slice/api/api-slice';
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
};

const AboutRecipeContent = ({
    recipeData,
    getRecipe,
    isErrorRecipe,
    isSwiperError,
    swiperData,
}: AboutRecipeContentType) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const idRecipe = useSelector(idRecipeSelector);

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
                        title={recipeData.title}
                        image={recipeData.image}
                        bookmarks={recipeData.bookmarks}
                        likes={recipeData.likes}
                        description={recipeData.description}
                        time={recipeData.time}
                        categoriesIds={recipeData.categoriesIds}
                    />
                    <CaloricDish
                        calories={recipeData.nutritionValue.calories}
                        protein={recipeData.nutritionValue.proteins}
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
                </Box>
            )}
        </>
    );
};

export const AboutRecipeWithLoader = withLoader(AboutRecipeContent);
