import { Flex, Image } from '@chakra-ui/react';

import {
    bookHeart,
    emojiHeartEyes,
    peopleFill,
} from './../../../../assets/images/aside/rightAside';
import styles from './IconStats.module.css';

const stats = [
    { icon: bookHeart, label: '185' },
    { icon: peopleFill, label: '589' },
    { icon: emojiHeartEyes, label: '587' },
];

function IconStats() {
    return (
        <Flex className={styles['container_user_stats']}>
            {stats.map((stat, index) => (
                <Flex key={index} className={styles['user_stat']}>
                    <Image src={stat.icon} alt={stat.icon} />
                    <span>{stat.label}</span>
                </Flex>
            ))}
        </Flex>
    );
}

export default IconStats;
