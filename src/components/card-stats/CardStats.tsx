import { Flex } from '@chakra-ui/react';
import classNames from 'classnames';

import { LabelTypeFood } from '../label-type-food/LabelTypeFood';
import { StatsForCard } from '../stats-card/StatsForCard';
import styles from './CardStats.module.css';

type CardStatsProps = {
    title: string;
    icon?: string;
    favorites?: number;
    like?: number;
    yellow?: boolean;
    isMobile?: boolean;
};

export const CardStats = ({ title, icon, favorites, like, yellow, isMobile }: CardStatsProps) => (
    <Flex className={classNames(styles.container, { [styles.mobile]: isMobile })}>
        <LabelTypeFood title={title} icon={icon} yellow={yellow} />
        <StatsForCard favorites={favorites} like={like} />
    </Flex>
);
