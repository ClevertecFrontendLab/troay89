import { Flex, Heading } from '@chakra-ui/react';

import { SwipeSlider } from '~/components/swipe-slider/SwipeSlider';
import RecipeType from '~/type/recipeType';

import styles from './NewBlock.module.css';

type NewBlockType = {
    swipeData: RecipeType[];
};

export const NewBlock = ({ swipeData }: NewBlockType) => (
    <Flex className={styles.container} direction='column'>
        <Heading className={styles.title} mb={{ base: 3, bp95: 6 }}>
            Новые рецепты
        </Heading>
        <SwipeSlider swipeData={swipeData} />
    </Flex>
);
