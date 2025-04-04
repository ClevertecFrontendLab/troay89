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

function IconStats() {
    return (
        <Flex className={styles['container_user_stats']}>
            {stats.map((stat, index) => (
                <Flex key={index} className={styles['user_stat']}>
                    <Icon as={stat.icon} />
                    <span>{stat.label}</span>
                </Flex>
            ))}
        </Flex>
    );
}

export default IconStats;
