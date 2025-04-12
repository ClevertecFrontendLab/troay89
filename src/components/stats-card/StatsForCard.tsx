import { Flex, Icon } from '@chakra-ui/react';

import BookMark from '../icons/BookMark';
import EmojiHeart from '../icons/EmojiHeart';
import styles from './StatsForCard.module.css';

type StatsForCardProps = {
    favorites?: number;
    like?: number;
    isMobile?: boolean;
};

function StatsForCard({ favorites, like, isMobile }: StatsForCardProps) {
    return (
        <Flex className={`${styles['stats_container']} ${isMobile && styles['mobile']}`}>
            {favorites ? (
                <Flex className={styles.stats}>
                    <Icon as={BookMark} boxSize='12px' />
                    <span className={styles.number}>{favorites}</span>
                </Flex>
            ) : null}
            {like ? (
                <Flex className={styles.stats}>
                    <Icon as={EmojiHeart} boxSize='12px' />
                    <span className={styles.number}>{like}</span>
                </Flex>
            ) : null}
        </Flex>
    );
}

export default StatsForCard;
