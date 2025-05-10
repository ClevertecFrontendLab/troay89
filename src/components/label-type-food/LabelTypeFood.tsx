import { Flex, Image } from '@chakra-ui/react';

import { URLS } from '~/constants/url';

import styles from './LabelTypeFood.module.css';

type LabelTypeFoodProp = {
    title: string;
    icon?: string;
    yellow?: boolean;
    isMobile?: boolean;
};

export const LabelTypeFood = ({ title, icon, yellow, isMobile }: LabelTypeFoodProp) => (
    <Flex className={`${styles.label} ${yellow && styles.yellow} ${isMobile && styles.mobile}`}>
        <Image className={styles.image} src={`${URLS.IMAGE_URL}${icon}`} />
        <span className={styles.text}>{title}</span>
    </Flex>
);
