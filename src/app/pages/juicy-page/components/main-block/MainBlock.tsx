import { Button, Flex } from '@chakra-ui/react';

import GeneraCard from '~/components/cards/card/GeneralCard';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { PaginationMeta, RecipeType } from '~/type/recipeType';

import styles from './MainBlock.module.css';

type MainBlockType = {
    page: number;
    onLoadMore: () => void;
    recipes?: RecipeType[];
    meta?: PaginationMeta;
};

export const MainBlock = ({ recipes, meta, page, onLoadMore }: MainBlockType) => (
    <Flex mb={{ bp95: 10, base: 8 }} flexDir='column' alignItems='center'>
        <Flex className={styles.card_container} mb={4} gap={4}>
            {recipes?.map(
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
                className={styles.button}
                colorScheme='teal'
                px='17.5px'
                onClick={onLoadMore}
                data-test-id='load-more-button'
            >
                Загрузка
            </Button>
        )}
    </Flex>
);
