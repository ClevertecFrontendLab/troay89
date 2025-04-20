import { Flex, Heading } from '@chakra-ui/react';

import SwipeSlider from '~/components/swipe-slider/SwipeSlider';

import styles from './JuicyBlock.module.css';

function JuicyBlock() {
    return (
        <Flex direction='column'>
            <Heading className={styles.title} mb={6}>
                Новые рецепты
            </Heading>
            <SwipeSlider />
        </Flex>
    );
}

export default JuicyBlock;
