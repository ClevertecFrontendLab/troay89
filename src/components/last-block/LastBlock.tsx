import { Flex } from '@chakra-ui/react';

import LongCard from '~/components/cards/long-card/LongCard';
import SimpleCard from '~/components/cards/simple-card/SimpleCard';
import SubtitleWithText from '~/components/subtitle-with-text/SubtitleWithText';
import CardLongProps from '~/type/cardLongCardProps';
import CardProps from '~/type/cardProps';

import styles from './LastBlock.module.css';

type LastBlockProps = {
    title: string;
    text: string;
    simpleCardArray: CardProps[];
    longCardArray: CardLongProps[];
    isChangeTable?: boolean;
};

function LastBlock({ title, text, simpleCardArray, longCardArray, isChangeTable }: LastBlockProps) {
    return (
        <Flex className={styles.container}>
            <SubtitleWithText title={title} text={text} isChangeTable={isChangeTable} />
            <Flex className={styles['cards_container']}>
                <Flex className={styles['simple_cards_container']}>
                    {simpleCardArray.map(
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
                    {longCardArray.map(({ image, title }: CardLongProps) => (
                        <LongCard key={title} image={image} title={title} />
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
}

export default LastBlock;
