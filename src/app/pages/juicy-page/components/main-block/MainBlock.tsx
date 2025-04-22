import { Button, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';

import GeneraCard from '~/components/cards/card/GeneralCard';
import dataRecipes from '~/data/dataRecipes';

import styles from './MainBlock.module.css';

function MainBlock() {
    const juiceRecipe = useMemo(
        () =>
            [...dataRecipes]
                .sort((firstRecipe, secondRecipe) => secondRecipe.likes - firstRecipe.likes)
                .slice(0, 8),
        [],
    );

    return (
        <Flex mb={{ bp95: 10, base: 8 }} flexDir='column' alignItems='center'>
            <Flex className={styles.card_container} mb={4} gap={4}>
                {juiceRecipe.map(
                    ({ id, image, title, description, category, bookmarks, likes }) => (
                        <GeneraCard
                            key={id}
                            id={id}
                            image={image}
                            title={title}
                            description={description}
                            label={category}
                            favorites={bookmarks}
                            like={likes}
                        />
                    ),
                )}
            </Flex>
            <Button className={styles.button} colorScheme='teal' px='17.5px'>
                Загрузить еще
            </Button>
        </Flex>
    );
}

export default MainBlock;
