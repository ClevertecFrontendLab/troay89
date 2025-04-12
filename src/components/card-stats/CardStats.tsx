import { Flex } from '@chakra-ui/react';

import LabelTypeFood from '../label-type-food/LabelTypeFood';
import StatsForCard from '../stats-card/StatsForCard';
import styles from './CardStats.module.css';

type CardStatsProps = {
    label: string;
    favorites?: number;
    like?: number;
    yellow?: boolean;
    isMobile?: boolean;
};

function CardStats({ label, favorites, like, yellow, isMobile }: CardStatsProps) {
    return (
        <Flex className={`${styles.container} ${isMobile && styles.mobile}`}>
            <LabelTypeFood label={label} yellow={yellow} />
            <StatsForCard favorites={favorites} like={like} />
        </Flex>
    );
}

export default CardStats;
