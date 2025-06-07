import { Button, Flex, Grid } from '@chakra-ui/react';

import GeneraCard from '~/components/cards/card/GeneralCard';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { PaginationMeta, RecipeType } from '~/type/RecipeType';

import styles from './FilterSortBlock.module.css';

type FilterSearchBlockProps = {
    filterSearchRecipes: RecipeType[];
    page: number;
    onLoadMore: () => void;
    meta?: PaginationMeta;
    isExtraSpace?: boolean;
    mobileGap?: number;
};

export const FilterSortBlock = ({
    filterSearchRecipes,
    meta,
    page,
    onLoadMore,
    isExtraSpace,
    mobileGap = 4,
}: FilterSearchBlockProps) => (
    <Flex
        width='100%'
        mb={{ bp95: 10, base: 8 }}
        flexDir='column'
        alignItems='center'
        mt={isExtraSpace ? { base: '260px', bp76: '132px', bp95: '184px' } : undefined}
    >
        <Grid
            className={styles.card_container}
            gridTemplateColumns={{
                base: 'repeat(1, 1fr)',
                bp76: 'repeat(2, 1fr)',
                bp95: 'repeat(1, 1fr)',
                bp189: 'repeat(2, 1fr)',
            }}
            mb={{ base: mobileGap, bp76: 4 }}
            gap={{ base: mobileGap, bp76: 4 }}
            width='100%'
            data-test-id={DATA_TEST_ID.RECIPE_CARD_LIST}
        >
            {filterSearchRecipes.map(
                ({ _id, image, title, description, categoriesIds, bookmarks, likes }, index) => (
                    <GeneraCard
                        key={_id}
                        _id={_id}
                        image={image}
                        title={title}
                        description={description}
                        categoriesIds={categoriesIds}
                        favorites={bookmarks}
                        like={likes}
                        dataTest={`${DATA_TEST_ID.FOOD_CARD}-${index}`}
                        dataTestButton={`${DATA_TEST_ID.CARD_LINK}-${index}`}
                    />
                ),
            )}
        </Grid>
        {meta && page < meta.totalPages && (
            <Button
                data-test-id={DATA_TEST_ID.LOAD_MORE_BUTTON}
                className={styles.button}
                colorScheme='teal'
                px='17.5px'
                onClick={onLoadMore}
            >
                Загрузить еще
            </Button>
        )}
    </Flex>
);

export default FilterSortBlock;
