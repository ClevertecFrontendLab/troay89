import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { ErrorModal } from '~/components/error-modal/ErrorModal';
import LastBlock from '~/components/last-block/LastBlock';
import Toolbar from '~/components/toolbar/Toolbar';
import { useGetRandomDataCategory } from '~/hooks/useGetRandomDataCategory';
import { ApplicationState } from '~/store/configure-store';
import { getArrayCategorySelector } from '~/store/selectors/arrayCategorySelector';
import { useLazyGetRecipeByCategoryQuery } from '~/store/slice/app-slice';
import { setIndexTab } from '~/store/slice/indexTabsSlice';
import { Category } from '~/type/Category';
import RecipeType from '~/type/RecipeType';

import TabPanelNavigation from './components/tab-panel-navigation/TabPanelNavigation';

function RecipesPage() {
    const arrayCategory = useSelector(getArrayCategorySelector);
    const [getCategory, setCategory] = useState<Category | undefined>();
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 110));
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [page, setPage] = useState(1);
    const { category, subcategories } = useParams();
    const [trigger, { data, error, isFetching }] = useLazyGetRecipeByCategoryQuery();
    const { randomCategory, lastBlockData, isErrorLastBlock } =
        useGetRandomDataCategory(randomNumber);
    const activeSubcategoryId = useSelector(
        (state: ApplicationState) => state.indexTabs.activeSubcategoryId,
    );
    const categories = useSelector(getArrayCategorySelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (page === 1 && data) {
            setRecipes(data.data);
        } else {
            if (data) {
                setRecipes((prev) => {
                    const existingIds = new Set(prev.map((recipe) => recipe._id));
                    const newRecipes = data.data.filter((recipe) => !existingIds.has(recipe._id));
                    return [...prev, ...newRecipes];
                });
            }
        }
    }, [data, page]);

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    const subcategoryFind = categories
        .filter((subcategory) => subcategory.rootCategoryId)
        .find((subcategory) => subcategory.category === subcategories);
    const categoriesFind = categories.filter((category) => !category.rootCategoryId);
    const categoryFind = categoriesFind.find((cat) => cat.category === category);

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
                trigger({ page, limit: 4, id: subcategoryId });
            }
        }
    }, [subcategoryFind?._id, page, trigger]);

    const newCategory = arrayCategory.find((cat) => cat.category === category);
    useEffect(() => {
        if (category !== undefined) {
            setRandomNumber(Math.floor(Math.random() * 13));
            setCategory(newCategory);
        }
    }, [arrayCategory, category, newCategory]);

    const hasError = error || isErrorLastBlock;

    const [isErrorOpen, setIsErrorOpen] = useState(!!hasError);

    useEffect(() => {
        setIsErrorOpen(!!hasError);
    }, [hasError]);

    return (
        <>
            <Toolbar title={getCategory?.title} description={getCategory?.description} />
            {isErrorOpen ? (
                <ErrorModal onClose={() => setIsErrorOpen(false)} />
            ) : (
                !hasError && (
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
                )
            )}
        </>
    );
}

export default RecipesPage;
