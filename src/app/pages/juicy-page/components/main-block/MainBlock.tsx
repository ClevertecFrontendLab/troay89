import { Button, Flex } from '@chakra-ui/react';

import GeneraCard from '~/components/cards/card/GeneralCard';
import RecipeType, { PaginationMeta } from '~/type/RecipeType';

import styles from './MainBlock.module.css';

type MainBlockType = {
    recipes: RecipeType[] | undefined;
    meta: PaginationMeta | undefined;
    page: number;
    onLoadMore: () => void;
};

function MainBlock({ recipes, meta, page, onLoadMore }: MainBlockType) {
    return (
        <Flex mb={{ bp95: 10, base: 8 }} flexDir='column' alignItems='center'>
            <Flex className={styles.card_container} mb={4} gap={4}>
                {recipes &&
                    recipes.map(
                        (
                            { _id, image, title, description, categoriesIds, bookmarks, likes },
                            index,
                        ) => (
                            <GeneraCard
                                key={_id}
                                _id={_id}
                                image={image}
                                title={title}
                                description={description}
                                categoriesIds={categoriesIds}
                                favorites={bookmarks}
                                like={likes}
                                dataTestButton={`card-link-${index}`}
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
                >
                    Загрузить еще
                </Button>
            )}
        </Flex>
    );
}

export default MainBlock;
