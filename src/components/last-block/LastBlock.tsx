import { Flex } from '@chakra-ui/react';

import { Category } from '~/type/Category';
import RecipeType from '~/type/RecipeType';

import { LongCard } from '../cards/long-card/LongCard';
import { SimpleCard } from '../cards/simple-card/SimpleCard';
import { SubtitleWithText } from '../subtitle-with-text/SubtitleWithText';
import styles from './LastBlock.module.css';

type LastBlockType = {
    randomCategory?: Category;
    lastBlockData?: RecipeType[];
};

export const LastBlock = ({ lastBlockData, randomCategory }: LastBlockType) => (
    <Flex className={styles.container}>
        {randomCategory && (
            <SubtitleWithText title={randomCategory.title} text={randomCategory.description} />
        )}
        <Flex className={styles.cards_container}>
            <Flex className={styles.simple_cards_container}>
                {lastBlockData
                    ?.slice(0, 2)
                    .map(({ _id, title, description, bookmarks, likes }: RecipeType) => (
                        <SimpleCard
                            key={_id}
                            _id={_id}
                            title={title}
                            description={description}
                            category={randomCategory}
                            bookmarks={bookmarks}
                            likes={likes}
                        />
                    ))}
            </Flex>
            <Flex className={styles.long_cards_container}>
                {lastBlockData
                    ?.slice(2)
                    .map(({ _id, title }: RecipeType) => (
                        <LongCard key={_id} image={randomCategory?.icon} title={title} />
                    ))}
            </Flex>
        </Flex>
    </Flex>
);
