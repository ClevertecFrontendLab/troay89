import { Flex } from '@chakra-ui/react';

import LabelTypeFood from '../label-type-food/LabelTypeFood';
import StatsForCard from '../stats-card/StatsForCard';
import styles from './CardStats.module.css';

type CardStatsProps = {
    title: string;
    icon?: string;
    favorites?: number;
    like?: number;
    yellow?: boolean;
    isMobile?: boolean;
};

function CardStats({ title, icon, favorites, like, yellow, isMobile }: CardStatsProps) {
    return (
        <Flex className={`${styles.container} ${isMobile && styles.mobile}`}>
            <LabelTypeFood title={title} icon={icon} yellow={yellow} />
            <StatsForCard favorites={favorites} like={like} />
        </Flex>
    );
}

export default CardStats;
