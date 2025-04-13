import { Flex, Icon } from '@chakra-ui/react';

import BookMark from '~/components/icons/BookMark';
import EmojiHeart from '~/components/icons/EmojiHeart';
import PeopleFell from '~/components/icons/PeopleFell';

import styles from './IconStats.module.css';

const stats = [
    { icon: BookMark, label: '185' },
    { icon: PeopleFell, label: '589' },
    { icon: EmojiHeart, label: '587' },
];

type IconStatsProps = {
    isHeader?: boolean;
};

function IconStats({ isHeader }: IconStatsProps) {
    return (
        <Flex className={`${styles['container_user_stats']} ${isHeader && styles['stats_header']}`}>
            {stats.map((stat, index) => (
                <Flex key={index} className={styles['user_stat']}>
                    <Icon className={styles.icon} as={stat.icon} />
                    <span>{stat.label}</span>
                </Flex>
            ))}
        </Flex>
    );
}

export default IconStats;
