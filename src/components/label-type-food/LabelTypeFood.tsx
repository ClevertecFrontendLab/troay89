import { Flex, Image } from '@chakra-ui/react';

import styles from './LabelTypeFood.module.css';

type LabelTypeFoodProp = {
    title: string;
    icon: string | undefined;
    yellow?: boolean;
    isMobile?: boolean;
};

function LabelTypeFood({ title, icon, yellow, isMobile }: LabelTypeFoodProp) {
    return (
        <Flex className={`${styles.label} ${yellow && styles.yellow} ${isMobile && styles.mobile}`}>
            <Image className={styles.image} src={`https://training-api.clevertec.ru${icon}`} />
            <span className={styles.text}>{title}</span>
        </Flex>
    );
}

export default LabelTypeFood;
