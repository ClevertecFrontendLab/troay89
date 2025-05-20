import { Flex, Icon } from '@chakra-ui/react';
import classNames from 'classnames';

import BookMark from '../icons/BookMark';
import EmojiHeart from '../icons/EmojiHeart';
import styles from './StatsForCard.module.css';

type StatsForCardProps = Partial<{
    favorites: number;
    like: number;
    isMobile: boolean;
    isForAboutRecipe: boolean;
    size: string;
    gapContainer: string;
    gapIcon: string;
}>;

export const StatsForCard = ({
    favorites,
    like,
    isMobile,
    isForAboutRecipe,
    size = '12px',
    gapContainer = '18px',
    gapIcon = '5px',
}: StatsForCardProps) => (
    <Flex
        className={classNames(styles.stats_container, {
            [styles.mobile]: isMobile,
            [styles.about_recipe]: isForAboutRecipe,
        })}
        gap={gapContainer}
    >
        {favorites !== undefined && favorites > 0 && (
            <Flex className={styles.stats} gap={gapIcon}>
                <Icon as={BookMark} boxSize={{ bp189: size, base: '12px' }} />
                <span className={styles.number}>{favorites}</span>
            </Flex>
        )}
        {like !== undefined && like > 0 && (
            <Flex className={styles.stats} gap={{ bp189: gapIcon, base: '6px' }}>
                <Icon as={EmojiHeart} boxSize={{ bp189: size, base: '12px' }} />
                <span className={styles.number}>{like}</span>
            </Flex>
        )}
    </Flex>
);
