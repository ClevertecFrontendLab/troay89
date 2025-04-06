import { Flex, Heading, Text } from '@chakra-ui/react';

import LongCard from '~/components/cards/long-card/LongCard';
import SimpleCard from '~/components/cards/simple-card/SimpleCard';
import dataLongCard from '~/data/dataLongCardMain';
import dataSimpleCard from '~/data/dataSimpleCard';
import CardLongProps from '~/type/cardLongCardProps';
import CardProps from '~/type/cardProps';

import styles from './VeganBlock.module.css';

function VeganBlock() {
    return (
        <Flex className={styles.container}>
            <Flex className={styles['subtitle_container']}>
                <Heading className={styles.subtitle} as='h2'>
                    Веганская кухня
                </Heading>
                <Text className={styles.description}>
                    Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать
                    вегетарианскую диету и готовить вкусные вегетарианские блюда.
                </Text>
            </Flex>
            <Flex className={styles['cards_container']}>
                <Flex className={styles['simple_cards_container']}>
                    {dataSimpleCard.map(
                        ({ title, description, label, favorites, like }: CardProps) => (
                            <SimpleCard
                                key={title}
                                title={title}
                                description={description}
                                label={label}
                                favorites={favorites}
                                like={like}
                            />
                        ),
                    )}
                </Flex>
                <Flex className={styles['long_cards_container']}>
                    {dataLongCard.map(({ image, title }: CardLongProps) => (
                        <LongCard key={title} image={image} title={title} />
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
}

export default VeganBlock;
