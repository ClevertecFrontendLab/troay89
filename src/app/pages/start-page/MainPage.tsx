import { Box, Divider, Flex, Heading, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

import GreenButton from '~/components/buttons/green-button/GreenButton';
import { ErrorModal } from '~/components/error-modal/ErrorModal';
import FilterSortBlock from '~/components/filter-sort-block/FilterSortBlock';
import LastBlock from '~/components/last-block/LastBlock';
import { Overlay } from '~/components/overlay/Overlay';
import SwipeSlider from '~/components/swipe-slider/SwipeSlider';
import Toolbar from '~/components/toolbar/Toolbar';
import { useGetRandomDataCategory } from '~/hooks/useGetRandomDataCategory';
import useShouldShowFilterResults from '~/hooks/useShouldShowFilterResults';
import { overlayPositionSelector } from '~/store/selectors/overlayPositionSelector';
import { useGetRecipesQuery } from '~/store/slice/app-slice';

import AuthorBlock from './components/author-block/AuthorBlock';
import JuicyBlock from './components/juicy-block/JuicyBlock';
import styles from './MaingPage.module.css';

function MainPage() {
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
    const [isLargerThan767] = useMediaQuery('(min-width: 767px)');
    const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');
    const {
        data: juicyData,
        error: juiceError,
        isFetching: isJuiceFetching,
    } = useGetRecipesQuery({ limit: 4, sortBy: 'likes', sortOrder: 'desc' });
    const {
        data: swiperData,
        error: swiperError,
        isFetching: isSwiperFetching,
    } = useGetRecipesQuery({ limit: 10, sortBy: 'createdAt', sortOrder: 'asc' });
    const [randomNumber] = useState(() => Math.floor(Math.random() * 110));
    const { randomCategory, lastBlockData, isLastBlockFetching, errorLastBlock } =
        useGetRandomDataCategory(randomNumber);

    const veryHardDataTestId = isLargerThan1200
        ? 'juiciest-link-mobile'
        : isLargerThan767
          ? 'juiciest-link'
          : 'juiciest-link-mobile';

    const isPending =
        (isJuiceFetching || isSwiperFetching || isLastBlockFetching || isFetchingFilterRecipes) &&
        shouldShowOverlay;

    const hasError = juiceError || swiperError || errorLastBlock;
    const hasErrorFilter = isErrorFilterRecipes;

    const [isErrorOpen, setIsErrorOpen] = useState(!!hasError);
    const [isErrorOpenFilter, setIsErrorOpenFilter] = useState(!!hasErrorFilter);

    useEffect(() => {
        setIsErrorOpenFilter(!!hasErrorFilter);
    }, [hasErrorFilter]);

    useEffect(() => {
        setIsErrorOpen(!!hasError);
    }, [hasError]);

    if (isPending) {
        return <Overlay />;
    }

    return (
        <>
            <Toolbar title='Приятного аппетита!' isExtraSpace />
            {isErrorOpen ? (
                <ErrorModal onClose={() => setIsErrorOpen(false)} />
            ) : shouldShowFilterResults && !hasError ? (
                <>
                    <Box px={{ base: 4, bp76: 0 }}>
                        <Heading className={styles.subtitle} as='h2'>
                            Новые рецепты
                        </Heading>
                        <SwipeSlider swipeData={swiperData?.data} />
                        <Flex className={styles.subtitle_container}>
                            <Heading className={styles.subtitle} as='h2'>
                                Самое сочное
                            </Heading>
                            <Link
                                className={styles.button_desktop}
                                to='/the-juiciest'
                                data-test-id={
                                    isLargerThan1200
                                        ? 'juiciest-link'
                                        : isLargerThan767
                                          ? ''
                                          : 'juiciest-link'
                                }
                            >
                                <GreenButton text='Вся подборка' />
                            </Link>
                        </Flex>
                        <JuicyBlock juicyData={juicyData?.data} />
                        <Link
                            className={styles.button_mobile}
                            to='/the-juiciest'
                            data-test-id={veryHardDataTestId}
                        >
                            <GreenButton text='Вся подборка' />
                        </Link>
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

export default MainPage;
