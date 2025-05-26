import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import { LastBlock } from '~/components/last-block/LastBlock';
import Toolbar from '~/components/toolbar/Toolbar';
import { useGetCountSubcategory } from '~/hooks/useGetCountSubcategory';
import { useGetRandomDataCategory } from '~/hooks/useGetRandomDataCategory';
import { getArrayCategorySelector } from '~/store/selectors/arrayCategorySelector';
import { activeSubcategoryIdSelector } from '~/store/selectors/indexCategoriesSubcategoriesSliceSelector';
import { useLazyGetRecipeByCategoryQuery } from '~/store/slice/api/api-slice';
import { setIndexTab } from '~/store/slice/indexCategoriesSubcategoriesSlice';
import { Category } from '~/type/category';
import { RecipeType } from '~/type/recipeType';

import { TabPanelNavigation } from './components/tab-panel-navigation/TabPanelNavigation';

export const RecipesPage = () => {
    const dispatch = useDispatch();
    const { category, subcategories } = useParams();
    const categories = useSelector(getArrayCategorySelector);
    const activeSubcategoryId = useSelector(activeSubcategoryIdSelector);
    const [getCategory, setCategory] = useState<Category | undefined>();
    const { countSubcategory } = useGetCountSubcategory();
    const [randomNumber, setRandomNumber] = useState(0);
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [page, setPage] = useState(1);
    const { randomCategory, lastBlockData, isErrorLastBlock } =
        useGetRandomDataCategory(randomNumber);
    const [getRecipeByCategory, { data, isError, isFetching }] = useLazyGetRecipeByCategoryQuery();

    const newCategory = categories.find((cat) => cat.category === category);

    const hasError = isError || isErrorLastBlock;

    const [isErrorOpen, setIsErrorOpen] = useState(hasError);

    const subcategoryFind = categories
        .filter((subcategory) => subcategory.rootCategoryId)
        .find((subcategory) => subcategory.category === subcategories);
    const categoriesFind = categories.filter((category) => !category.rootCategoryId);
    const categoryFind = categoriesFind.find((cat) => cat.category === category);

    useEffect(() => {
        if (page === 1 && data) {
            setRecipes(data.data);
        } else {
            if (data) {
                setRecipes((prev) => [...prev, ...data.data]);
            }
        }
    }, [data]);

    useEffect(() => {
        setPage(1);
    }, [category, subcategories]);

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    useEffect(() => {
        if (!activeSubcategoryId && subcategoryFind?._id && categoryFind?.subCategories) {
            const subcategoryIndex = categoryFind.subCategories.findIndex(
                (subcategory) => subcategory.category === subcategories,
            );
            dispatch(setIndexTab(subcategoryIndex));
        }
    }, [
        activeSubcategoryId,
        subcategoryFind?._id,
        categoryFind?.subCategories,
        subcategories,
        dispatch,
    ]);

    useEffect(() => {
        if (subcategoryFind?._id) {
            const subcategoryId = activeSubcategoryId || subcategoryFind._id;
            if (subcategoryId) {
                getRecipeByCategory({ page, limit: 4, id: subcategoryId });
            }
        }
    }, [subcategoryFind?._id, page, getRecipeByCategory]);

    useEffect(() => {
        if (category) {
            setRandomNumber(Math.floor(Math.random() * countSubcategory - 1));
            setCategory(newCategory);
        }
    }, [category, countSubcategory, newCategory]);

    useEffect(() => {
        setIsErrorOpen(hasError);
    }, [hasError]);

    const renderMainContent = () => {
        if (isErrorOpen) {
            return <ErrorModal onClose={() => setIsErrorOpen(false)} />;
        }

        if (!hasError) {
            return (
                <Box px={{ base: 4, bp76: 0 }}>
                    <TabPanelNavigation
                        getCategory={getCategory}
                        recipes={recipes}
                        page={page}
                        isFetching={isFetching}
                        onLoadMore={handleLoadMore}
                        meta={data?.meta}
                    />
                    <LastBlock
                        lastBlockData={lastBlockData?.data}
                        randomCategory={randomCategory}
                    />
                </Box>
            );
        }
        return null;
    };

    return (
        <>
            <Toolbar title={getCategory?.title} description={getCategory?.description} />
            {renderMainContent()}
        </>
    );
};
