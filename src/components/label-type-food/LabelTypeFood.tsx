import { Flex, Image } from '@chakra-ui/react';

import {
    baclazan,
    bread,
    child,
    cup,
    eating,
    healthy,
    international,
    lavrovi,
    pan,
    pasta,
    pat,
    peas,
    wash,
} from '~/assets/images/aside/nav';

import styles from './LabelTypeFood.module.css';

const categoryIcons: { [key: string]: string } = {
    Салаты: baclazan,
    Закуски: eating,
    'Первые блюда': pat,
    'Вторые блюда': pan,
    'Десерты, выпечка': bread,
    'Блюда на гриле': wash,
    'Веганская кухня': lavrovi,
    'Веганские блюда': lavrovi,
    'Детские блюда': child,
    'Лечебное питание': healthy,
    Национальные: international,
    Соусы: peas,
    Заготовки: pasta,
    Напитки: cup,
};

type LabelTypeFoodProp = {
    label: string;
    yellow?: boolean;
    isMobile?: boolean;
};

function LabelTypeFood({ label, yellow, isMobile }: LabelTypeFoodProp) {
    return (
        <Flex className={`${styles.label} ${yellow && styles.yellow} ${isMobile && styles.mobile}`}>
            <Image className={styles.image} src={categoryIcons[label]} />{' '}
            <span className={styles.text}>{label}</span>
        </Flex>
    );
}

export default LabelTypeFood;
