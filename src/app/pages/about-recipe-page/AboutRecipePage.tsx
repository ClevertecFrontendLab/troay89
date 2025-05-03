import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import TableIngredients from '~/app/pages/about-recipe-page/components/table-ingredients/TableIndegrients';
import { Overlay } from '~/components/overlay/Overlay';
import { idRecipeSelector } from '~/store/selectors/indexTabsSelector';
import { useGetRecipesQuery, useLazyGetRecipeQuery } from '~/store/slice/app-slice';
import { setIndexRecipe, setNameRecipe } from '~/store/slice/indexTabsSlice';

import AuthorCard from './components/author-card/AuthorCard';
import CaloricDish from './components/caloric-dish/CaloricDish';
import CardAboutRecipe from './components/card-about-recipe/CardAboutRecipe';
import CookingSteps from './components/cooking_steps/CookingSteps';
import NewBlock from './components/new-block/NewBlock';

function AboutRecipePage() {
    const idRecipe = useSelector(idRecipeSelector);
    const navigate = useNavigate();
    const [trigger, { data, isLoading, isError }] = useLazyGetRecipeQuery();
    const { id } = useParams();
    const { data: swiperData, error: swiperError } = useGetRecipesQuery({
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'asc',
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (idRecipe && !data) {
            trigger({ id: idRecipe });
        } else {
            if (id !== undefined) {
                dispatch(setIndexRecipe(id));
            }
            if (data) {
                dispatch(setNameRecipe(data?.title));
            }
        }
    }, [data, dispatch, id, idRecipe, trigger]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [idRecipe]);

    useEffect(() => {
        if (isError || swiperError) {
            navigate(-1);
        }
    }, [isError, navigate, swiperError]);

    if (isLoading) {
        return <Overlay />;
    }

    return (
        <>
            {data && (
                <Box px={{ base: 4, bp76: 0 }}>
                    <CardAboutRecipe
                        title={data.title}
                        image={data.image}
                        bookmarks={data.bookmarks}
                        likes={data.likes}
                        description={data.description}
                        time={data.time}
                        categoriesIds={data.categoriesIds}
                    />
                    <CaloricDish
                        calories={data.nutritionValue.calories}
                        protein={data.nutritionValue.proteins}
                        fats={data.nutritionValue.fats}
                        carbohydrates={data.nutritionValue.carbohydrates}
                    />
                    <TableIngredients portions={data.portions} ingredients={data.ingredients} />
                    <CookingSteps steps={data.steps} />
                    <AuthorCard />
                    {swiperData && <NewBlock swipeData={swiperData.data} />}
                </Box>
            )}
        </>
    );
}

export default AboutRecipePage;
