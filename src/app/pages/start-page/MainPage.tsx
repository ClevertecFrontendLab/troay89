import { Flex, Heading } from '@chakra-ui/react';

import GreenButton from '~/components/buttons/green-button/GreenButton';
import Toolbar from '~/components/toolbar/Toolbar';

import AuthorBlock from './components/author-block/AuthorBlock';
import JuicyBlock from './components/juicy-block/JuicyBlock';
import Slider from './components/slaider/Slaider';
import VeganBlock from './components/vegan-block/VeganBlock';
import styles from './MaingPage.module.css';

function MainPage() {
    return (
        <>
            <Toolbar title='Приятного аппетита!' />
            <Heading className={styles.subtitle} as='h2'>
                Новые рецепты
            </Heading>
            <Slider />
            <Flex className={styles['subtitle_container']}>
                <Heading className={styles.subtitle} as='h2'>
                    Самое сочное
                </Heading>
                <GreenButton />
            </Flex>
            <JuicyBlock />
            <AuthorBlock />
            <VeganBlock />
        </>
    );
}

export default MainPage;
