import { Flex, Icon } from '@chakra-ui/react';

import BookMark from '../icons/BookMark';
import EmojiHeart from '../icons/EmojiHeart';
import styles from './StatsForCard.module.css';

type StatsForCardProps = {
    favorites?: number;
    like?: number;
    isMobile?: boolean;
    isForAboutRecipe?: boolean;
    size?: string;
    gapContainer?: string;
    gapIcon?: string;
};

function StatsForCard({
    favorites,
    like,
    isMobile,
    isForAboutRecipe,
    size = '12px',
    gapContainer = '18px',
    gapIcon = '5px',
}: StatsForCardProps) {
    return (
        <Flex
            className={`${styles.stats_container} ${isMobile && styles.mobile} ${isForAboutRecipe && styles.about_recipe}`}
            gap={gapContainer}
        >
            {favorites ? (
                <Flex className={styles.stats} gap={gapIcon}>
                    <Icon as={BookMark} boxSize={size} />
                    <span className={styles.number}>{favorites}</span>
                </Flex>
            ) : null}
            {like ? (
                <Flex className={styles.stats} gap={gapIcon}>
                    <Icon as={EmojiHeart} boxSize={size} />
                    <span className={styles.number}>{like}</span>
                </Flex>
            ) : null}
        </Flex>
    );
}

export default StatsForCard;
