import { Box, Divider, Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
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
import { useGetRecipesQuery } from '~/store/slice/app-slice';

import AuthorBlock from './components/author-block/AuthorBlock';
import JuicyBlock from './components/juicy-block/JuicyBlock';
import styles from './MaingPage.module.css';

function MainPage() {
    const { shouldShowFilterResults, recipesFilter } = useShouldShowFilterResults();
    const {
        data: juicyData,
        error: juiceError,
        isLoading: isJuiceLoading,
        isFetching: isJuiceFetching,
    } = useGetRecipesQuery({ limit: 4, sortBy: 'likes', sortOrder: 'desc' });
    const {
        data: swiperData,
        error: swiperError,
        isLoading: isSwiperLoading,
        isFetching: isSwiperFetching,
    } = useGetRecipesQuery({ limit: 10, sortBy: 'createdAt', sortOrder: 'asc' });
    const [randomNumber] = useState(() => Math.floor(Math.random() * 13));
    const {
        randomCategory,
        lastBlockData,
        isLastBlockLoading,
        isLastBlockFetching,
        errorLastBlock,
    } = useGetRandomDataCategory(randomNumber);

    const isPending =
        isJuiceLoading ||
        isJuiceFetching ||
        isSwiperLoading ||
        isSwiperFetching ||
        isLastBlockLoading ||
        isLastBlockFetching;

    const hasError = juiceError || swiperError || errorLastBlock;

    const [isErrorOpen, setIsErrorOpen] = useState(!!hasError);

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
                            data-test-id='juiciest-link'
                        >
                            <GreenButton text='Вся подборка' />
                        </Link>
                    </Flex>
                    <JuicyBlock juicyData={juicyData?.data} />
                    <Link
                        className={styles.button_mobile}
                        to='/the-juiciest'
                        data-test-id='juiciest-link-mobile'
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
            ) : (
                !hasError && <FilterSortBlock filterSearchRecipes={recipesFilter} />
            )}
        </>
    );
}

export default MainPage;
