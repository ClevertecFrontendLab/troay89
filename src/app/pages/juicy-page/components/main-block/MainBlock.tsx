import { Button, Flex } from '@chakra-ui/react';

import GeneraCard from '~/components/cards/card/GeneralCard';
import dataJuicyPageCards from '~/data/dataJuicyPageCards';

import styles from './MainBlock.module.css';

function MainBlock() {
    return (
        <Flex mb={{ bp95: 10, base: 8 }} flexDir='column' alignItems='center'>
            <Flex className={styles.card_container} mb={4} gap={4}>
                {dataJuicyPageCards.map(
                    ({
                        image,
                        title,
                        description,
                        label,
                        favorites,
                        like,
                        avatarRecommend,
                        nameRecommend,
                    }) => (
                        <GeneraCard
                            key={title}
                            image={image}
                            title={title}
                            description={description}
                            label={label}
                            favorites={favorites}
                            like={like}
                            avatarRecommend={avatarRecommend}
                            nameRecommend={nameRecommend}
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
