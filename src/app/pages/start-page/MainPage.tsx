import { Box, Divider, Heading, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import FilterSortBlock from '~/components/filter-sort-block/FilterSortBlock';
import { LastBlock } from '~/components/last-block/LastBlock';
import { Overlay } from '~/components/overlay/Overlay';
import { SwipeSlider } from '~/components/swipe-slider/SwipeSlider';
import Toolbar from '~/components/toolbar/Toolbar';
import { useGetCountSubcategory } from '~/hooks/useGetCountSubcategory';
import { useGetRandomDataCategory } from '~/hooks/useGetRandomDataCategory';
import { useShouldShowFilterResults } from '~/hooks/useShouldShowFilterResults';
import { overlayPositionSelector } from '~/store/selectors/overlayPositionSelector';
import { useGetRecipesQuery } from '~/store/slice/api/api-slice';

import { AuthorBlock } from './components/author-block/AuthorBlock';
import { JuicyBlock } from './components/juicy-block/JuicyBlock';
import styles from './MaingPage.module.css';

export const MainPage = () => {
    const {
        shouldShowFilterResults,
        filterRecipes,
        isErrorFilterRecipes,
        isFetchingFilterRecipes,
        pageFilter,
        dataFilterRecipes,
        handleLoadMoreFilter,
    } = useShouldShowFilterResults();
    const shouldShowOverlay = useSelector(overlayPositionSelector);
    const [isDesktop] = useMediaQuery('(min-width: 1200px)');
    const {
        data: juicyData,
        isError: isJuiceError,
        isFetching: isJuiceFetching,
    } = useGetRecipesQuery({ limit: 4, sortBy: 'likes', sortOrder: 'desc' });
    const {
        data: swiperData,
        isError: isSwiperError,
        isFetching: isSwiperFetching,
    } = useGetRecipesQuery({ limit: 10, sortBy: 'createdAt', sortOrder: 'asc' });
    const { countSubcategory } = useGetCountSubcategory();
    const [randomNumber, setRandomNumber] = useState(0);
    const { randomCategory, lastBlockData, isLastBlockFetching, isErrorLastBlock } =
        useGetRandomDataCategory(randomNumber);

    const isPending =
        (isJuiceFetching || isSwiperFetching || isLastBlockFetching || isFetchingFilterRecipes) &&
        shouldShowOverlay;

    const hasError = isJuiceError || isSwiperError || isErrorLastBlock;
    const hasErrorFilter = isErrorFilterRecipes;

    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [isErrorOpenFilter, setIsErrorOpenFilter] = useState(hasErrorFilter);

    useEffect(() => {
        setIsErrorOpenFilter(hasErrorFilter);
    }, [hasErrorFilter]);

    useEffect(() => {
        setIsErrorOpen(hasError);
    }, [hasError]);

    useEffect(() => {
        setRandomNumber(Math.floor(Math.random() * countSubcategory - 1));
    }, [countSubcategory]);

    if (isPending) {
        return <Overlay />;
    }

    const renderMainContent = () => {
        if (isErrorOpen) {
            return <ErrorModal onClose={() => setIsErrorOpen(false)} />;
        }

        if (shouldShowFilterResults && !hasError) {
            return (
                <>
                    <Box px={{ base: 4, bp76: 0 }}>
                        <Heading className={styles.subtitle} as='h2'>
                            Новые рецепты
                        </Heading>
                        <SwipeSlider swipeData={swiperData?.data} />
                        <JuicyBlock juicyData={juicyData?.data} />
                        <AuthorBlock />
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

        if (!hasError && filterRecipes && filterRecipes.length > 0) {
            return (
                <FilterSortBlock
                    filterSearchRecipes={filterRecipes}
                    page={pageFilter}
                    meta={dataFilterRecipes?.meta}
                    onLoadMore={handleLoadMoreFilter}
                />
            );
        }

        return null;
    };

    return (
        <>
            <Toolbar
                title='Приятного аппетита!'
                isExtraSpace
                dateTestSwitch={isDesktop ? 'allergens-switcher' : ''}
                dataTestMenu={isDesktop ? 'allergens-menu-button' : ''}
            />
            {renderMainContent()}
        </>
    );
};
