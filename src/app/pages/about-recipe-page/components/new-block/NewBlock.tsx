import { Flex, Heading } from '@chakra-ui/react';

import SwipeSlider from '~/components/swipe-slider/SwipeSlider';

import styles from './NewBlock.module.css';

function NewBlock() {
    return (
        <Flex className={styles.container} direction='column'>
            <Heading className={styles.title} mb={{ base: 3, bp95: 6 }}>
                Новые рецепты
            </Heading>
            <SwipeSlider />
        </Flex>
    );
}

export default NewBlock;
