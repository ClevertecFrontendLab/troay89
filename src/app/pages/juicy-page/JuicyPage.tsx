import { useEffect, useState } from 'react';

import Toolbar from '~/components/toolbar/Toolbar';
import { useGetCountSubcategory } from '~/hooks/useGetCountSubcategory';
import { useGetRandomDataCategory } from '~/hooks/useGetRandomDataCategory';
import { useShouldShowFilterResults } from '~/hooks/useShouldShowFilterResults';
import { useGetRecipesQuery } from '~/store/slice/api/api-slice';
import { RecipeType } from '~/type/RecipeType';

import { JuicyContentWithLoader } from './components/juicy-content/JuicyContent';

export const JuicyPage = () => {
    const [page, setPage] = useState(1);
    const [recipe, setRecipes] = useState<RecipeType[]>([]);
    const { countSubcategory } = useGetCountSubcategory();
    const [randomNumber, setRandomNumber] = useState(0);
    const {
        shouldShowFilterResults,
        filterRecipes,
        isErrorFilterRecipes,
        isLoadingFilterRecipes,
        isFetchingFilterRecipes,
        pageFilter,
        dataFilterRecipes,
        handleLoadMoreFilter,
    } = useShouldShowFilterResults();

    const {
        data: juicyData,
        isError: isJuiceError,
        isLoading: isJuiceLoading,
    } = useGetRecipesQuery({
        page,
        limit: 8,
        sortBy: 'likes',
        sortOrder: 'desc',
    });

    const {
        randomCategory,
        lastBlockData,
        isLastBlockLoading,
        isLastBlockFetching,
        isErrorLastBlock,
    } = useGetRandomDataCategory(randomNumber);

    const hasError = isJuiceError || isErrorLastBlock;
    const hasErrorFilter = isErrorFilterRecipes;

    useEffect(() => {
        setRandomNumber(Math.floor(Math.random() * countSubcategory - 1));
    }, [countSubcategory]);

    const isPending =
        isJuiceLoading ||
        isLastBlockLoading ||
        isLastBlockFetching ||
        isLoadingFilterRecipes ||
        isFetchingFilterRecipes;

    useEffect(() => {
        if (juicyData) {
            if (page === 1) {
                setRecipes(juicyData.data);
            } else {
                setRecipes((prev) => [...prev, ...juicyData.data]);
            }
        }
    }, [juicyData]);

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    return (
        <>
            <Toolbar title='Самое сочное' />
            <JuicyContentWithLoader
                isLoading={isPending}
                hasError={hasError}
                hasErrorFilter={hasErrorFilter}
                shouldShowFilterResults={shouldShowFilterResults}
                filterRecipes={filterRecipes}
                pageFilter={pageFilter}
                page={page}
                handleLoadMore={handleLoadMore}
                handleLoadMoreFilter={handleLoadMoreFilter}
                recipes={recipe}
                randomCategory={randomCategory}
                juicyData={juicyData}
                lastBlockData={lastBlockData}
                dataFilterRecipes={dataFilterRecipes}
            />
        </>
    );
};
