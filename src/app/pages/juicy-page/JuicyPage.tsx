import { Box, Divider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ErrorModal } from '~/components/error-modal/ErrorModal';
import FilterSortBlock from '~/components/filter-sort-block/FilterSortBlock';
import LastBlock from '~/components/last-block/LastBlock';
import { Overlay } from '~/components/overlay/Overlay';
import Toolbar from '~/components/toolbar/Toolbar';
import { useGetRandomDataCategory } from '~/hooks/useGetRandomDataCategory';
import useShouldShowFilterResults from '~/hooks/useShouldShowFilterResults';
import { useGetRecipesQuery } from '~/store/slice/app-slice';
import RecipeType from '~/type/RecipeType';

import MainBlock from './components/main-block/MainBlock';

function JuicyPage() {
    const [page, setPage] = useState(1);
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [randomNumber] = useState(() => Math.floor(Math.random() * 110));
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

    const [isErrorOpenFilter, setIsErrorOpenFilter] = useState(hasErrorFilter);

    const [isErrorOpen, setIsErrorOpen] = useState(hasError);

    useEffect(() => {
        setIsErrorOpenFilter(hasErrorFilter);
    }, [hasErrorFilter]);

    useEffect(() => {
        if (juicyData) {
            if (page === 1) {
                setRecipes(juicyData.data);
            } else {
                setRecipes((prev) => [...prev, ...juicyData.data]);
            }
        }
    }, [juicyData]);

    useEffect(() => {
        setIsErrorOpen(hasError);
    }, [hasError]);

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    const isPending =
        isJuiceLoading ||
        isLastBlockLoading ||
        isLastBlockFetching ||
        isLoadingFilterRecipes ||
        isFetchingFilterRecipes;

    if (isPending) {
        return <Overlay />;
    }

    return (
        <>
            <Toolbar title='Самое сочное' />
            {isErrorOpen ? (
                <ErrorModal onClose={() => setIsErrorOpen(false)} />
            ) : shouldShowFilterResults && !hasError ? (
                <>
                    <Box px={{ base: 4, bp76: 0 }}>
                        <MainBlock
                            recipes={recipes}
                            page={page}
                            meta={juicyData?.meta}
                            onLoadMore={handleLoadMore}
                        />
                        <Divider />
                        <LastBlock
                            randomCategory={randomCategory}
                            lastBlockData={lastBlockData?.data}
                        />
                    </Box>
                    {isErrorOpenFilter && (
                        <ErrorModal onClose={() => setIsErrorOpenFilter(false)} />
                    )}
                </>
            ) : (
                !hasError &&
                filterRecipes.length > 0 && (
                    <FilterSortBlock
                        filterSearchRecipes={filterRecipes}
                        page={pageFilter}
                        meta={dataFilterRecipes?.meta}
                        onLoadMore={handleLoadMoreFilter}
                    />
                )
            )}
        </>
    );
}

export default JuicyPage;
