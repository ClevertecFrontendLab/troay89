import { Flex, Icon, Image } from '@chakra-ui/react';

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
import BookMark from '~/components/icons/BookMark';
import EmojiHeart from '~/components/icons/EmojiHeart';

import styles from './CardStats.module.css';

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

type CardStatsProps = {
    label: string;
    favorites?: number;
    like?: number;
    yellow?: boolean;
};

function CardStats({ label, favorites, like, yellow }: CardStatsProps) {
    return (
        <Flex className={styles.container}>
            <Flex className={`${styles.label} ${yellow && styles.yellow}`}>
                <Image className={styles.image} src={categoryIcons[label]} />{' '}
                <span className={styles.text}>{label}</span>
            </Flex>
            <Flex className={styles['stats_container']}>
                {favorites ? (
                    <Flex className={styles.stats}>
                        <Icon as={BookMark} boxSize='12px' />
                        <span className={styles.number}>{favorites}</span>
                    </Flex>
                ) : null}
                {like ? (
                    <Flex className={styles.stats}>
                        <Icon as={EmojiHeart} boxSize='12px' />
                        <span className={styles.number}>{like}</span>
                    </Flex>
                ) : null}
            </Flex>
        </Flex>
    );
}

export default CardStats;
