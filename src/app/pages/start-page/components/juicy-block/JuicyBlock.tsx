import { Flex } from '@chakra-ui/react';

import GeneraCard from '~/components/cards/card/GeneralCard';
import dataJuicyCards from '~/data/dataJuicyCards';

import styles from './JuicyBlock.module.css';

function JuicyBlock() {
    return (
        <Flex className={styles.juicy}>
            {dataJuicyCards.map(
                ({
                    image,
                    title,
                    description,
                    label,
                    favorites,
                    like,
                    nameRecommend,
                    avatarRecommend,
                }) => (
                    <GeneraCard
                        key={title}
                        image={image}
                        title={title}
                        description={description}
                        label={label}
                        favorites={favorites}
                        like={like}
                        nameRecommend={nameRecommend}
                        avatarRecommend={avatarRecommend}
                    />
                ),
            )}
        </Flex>
    );
}

export default JuicyBlock;
