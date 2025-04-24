import { Box, Divider, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router';

import GreenButton from '~/components/buttons/green-button/GreenButton';
import FilterSortBlock from '~/components/filter-sort-block/FilterSortBlock';
import LastBlock from '~/components/last-block/LastBlock';
import SwipeSlider from '~/components/swipe-slider/SwipeSlider';
import Toolbar from '~/components/toolbar/Toolbar';
import dataLongCard from '~/data/dataLongCardMain';
import dataSimpleCard from '~/data/dataSimpleCard';
import useShouldShowFilterResults from '~/hooks/useShouldShowFilterResults';

import AuthorBlock from './components/author-block/AuthorBlock';
import JuicyBlock from './components/juicy-block/JuicyBlock';
import styles from './MaingPage.module.css';

function MainPage() {
    const text =
        'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.';
    const { shouldShowFilterResults, recipesFilter } = useShouldShowFilterResults();
    return (
        <>
            <Toolbar title='Приятного аппетита!' isExtraSpace />
            {shouldShowFilterResults ? (
                <Box px={{ base: 4, bp76: 0 }}>
                    <Heading className={styles.subtitle} as='h2'>
                        Новые рецепты
                    </Heading>
                    <SwipeSlider />
                    <Flex className={styles.subtitle_container}>
                        <Heading className={styles.subtitle} as='h2'>
                            Самое сочное
                        </Heading>
                        <Link
                            className={styles.button_desktop}
                            to='/juicy'
                            data-test-id='juiciest-link'
                        >
                            <GreenButton text='Вся подборка' />
                        </Link>
                    </Flex>
                    <JuicyBlock />
                    <Link
                        className={styles.button_mobile}
                        to='/juicy'
                        data-test-id='juiciest-link-mobile'
                    >
                        <GreenButton text='Вся подборка' />
                    </Link>
                    <AuthorBlock />
                    <Divider />
                    <LastBlock
                        title='Веганская кухня'
                        text={text}
                        simpleCardArray={dataSimpleCard}
                        longCardArray={dataLongCard}
                        isChangeTable
                    />
                </Box>
            ) : (
                <FilterSortBlock filterSearchRecipes={recipesFilter} />
            )}
        </>
    );
}

export default MainPage;
