import { Box, Divider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import FilterSortBlock from '~/components/filter-sort-block/FilterSortBlock';
import { LastBlock } from '~/components/last-block/LastBlock';
import { withLoader } from '~/components/with-loader/WithLoader';
import { Category } from '~/type/category';
import { RecipeType, RecipeTypeResponse } from '~/type/recipeType';

import { MainBlock } from '../main-block/MainBlock';

type JuicyContentType = {
    hasError: boolean;
    hasErrorFilter: boolean;
    shouldShowFilterResults: boolean;
    filterRecipes: RecipeType[];
    pageFilter: number;
    page: number;
    handleLoadMore: () => void;
    handleLoadMoreFilter: () => void;
    recipes?: RecipeType[];
    randomCategory?: Category;
    juicyData?: RecipeTypeResponse;
    lastBlockData?: RecipeTypeResponse;
    dataFilterRecipes?: RecipeTypeResponse;
};

const JuicyContent = ({
    hasErrorFilter,
    hasError,
    shouldShowFilterResults,
    randomCategory,
    filterRecipes,
    page,
    pageFilter,
    handleLoadMoreFilter,
    handleLoadMore,
    juicyData,
    lastBlockData,
    dataFilterRecipes,
    recipes,
}: JuicyContentType) => {
    const [isErrorOpenFilter, setIsErrorOpenFilter] = useState(hasErrorFilter);
    const [isErrorOpen, setIsErrorOpen] = useState(hasError);

    useEffect(() => {
        setIsErrorOpenFilter(hasErrorFilter);
    }, [hasErrorFilter]);

    useEffect(() => {
        setIsErrorOpen(hasError);
    }, [hasError]);

    const renderContent = () => {
        if (isErrorOpen) {
            return <ErrorModal onClose={() => setIsErrorOpen(false)} />;
        }

        if (shouldShowFilterResults && !hasError) {
            return (
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
            );
        }

        if (!hasError && filterRecipes.length > 0) {
            return (
                <FilterSortBlock
                    filterSearchRecipes={filterRecipes}
                    page={pageFilter}
                    meta={dataFilterRecipes?.meta}
                    onLoadMore={handleLoadMoreFilter}
                />
            );
        }
    };

    return renderContent();
};

export const JuicyContentWithLoader = withLoader(JuicyContent);
