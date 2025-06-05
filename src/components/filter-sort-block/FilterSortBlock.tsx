import { Button, Flex } from '@chakra-ui/react';

import GeneraCard from '~/components/cards/card/GeneralCard';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { PaginationMeta, RecipeType } from '~/type/RecipeType';

import styles from './FilterSortBlock.module.css';

type FilterSearchBlockProps = {
    filterSearchRecipes: RecipeType[];
    page: number;
    onLoadMore: () => void;
    meta?: PaginationMeta;
    paddingTop?: string;
};

export const FilterSortBlock = ({
    filterSearchRecipes,
    meta,
    page,
    onLoadMore,
    paddingTop = '0px',
}: FilterSearchBlockProps) => (
    <Flex mb={{ bp95: 10, base: 8 }} flexDir='column' alignItems='center' mt={paddingTop}>
        <Flex className={styles.card_container} mb={4} gap={4}>
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
        </Flex>
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
