import { Flex, Icon } from '@chakra-ui/react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import BookMark from '~/components/icons/BookMark';
import EmojiHeart from '~/components/icons/EmojiHeart';
import PeopleFell from '~/components/icons/PeopleFell';
import { getSaveUserProfile } from '~/store/selectors/getInfoMeSelector';

import styles from './IconStats.module.css';

type IconStatsProps = {
    isHeader?: boolean;
};

export const IconStats = ({ isHeader }: IconStatsProps) => {
    const user = useSelector(getSaveUserProfile);
    const stats = [
        { icon: BookMark, label: user.bookmarks ?? 0 },
        { icon: PeopleFell, label: user.subscribers ?? 0 },
        { icon: EmojiHeart, label: user.likes ?? 0 },
    ];
    return (
        <Flex
            className={classNames(styles.container_user_stats, { [styles.stats_header]: isHeader })}
        >
            {stats.map((stat, index) => (
                <Flex key={index} className={styles.user_stat}>
                    <Icon className={styles.icon} as={stat.icon} />
                    <span>{stat.label}</span>
                </Flex>
            ))}
        </Flex>
    );
};
