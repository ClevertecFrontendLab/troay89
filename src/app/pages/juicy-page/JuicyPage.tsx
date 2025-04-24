import { Box, Divider } from '@chakra-ui/react';

import FilterSortBlock from '~/components/filter-sort-block/FilterSortBlock';
import Toolbar from '~/components/toolbar/Toolbar';
import dataLongCard from '~/data/dataLongCardMain';
import dataSimpleCard from '~/data/dataSimpleCard';
import useShouldShowFilterResults from '~/hooks/useShouldShowFilterResults';

import LastBlock from '../../../components/last-block/LastBlock';
import MainBlock from './components/main-block/MainBlock';

function JuicyPage() {
    const text =
        'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.';
    const { shouldShowFilterResults, recipesFilter } = useShouldShowFilterResults();

    return (
        <>
            <Toolbar title='Самое сочное' />
            {shouldShowFilterResults ? (
                <Box px={{ base: 4, bp76: 0 }}>
                    <MainBlock />
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

export default JuicyPage;
