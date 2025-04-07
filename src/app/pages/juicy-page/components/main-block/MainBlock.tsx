import { Button, Flex } from '@chakra-ui/react';

import GeneraCard from '~/components/cards/card/GeneralCard';
import dataJuicyPageCards from '~/data/dataJuicyPageCards';

import styles from './MainBlock.module.css';

function MainBlock() {
    return (
        <Flex className={styles.container}>
            <Flex className={styles['card_container']}>
                {dataJuicyPageCards.map(
                    ({
                        image,
                        title,
                        description,
                        label,
                        favorites,
                        like,
                        avatarRecomend,
                        nameRecomend,
                    }) => (
                        <GeneraCard
                            key={title}
                            image={image}
                            title={title}
                            description={description}
                            label={label}
                            favorites={favorites}
                            like={like}
                            avatarRecomend={avatarRecomend}
                            nameRecomend={nameRecomend}
                        />
                    ),
                )}
            </Flex>
            <Button className={styles.button}>Загрузить ещё</Button>
        </Flex>
    );
}

export default MainBlock;
