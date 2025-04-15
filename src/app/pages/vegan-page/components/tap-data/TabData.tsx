import { Flex } from '@chakra-ui/react';

import GeneraCard from '~/components/cards/card/GeneralCard';
import dataVeganPageCards from '~/data/dataVeganPageCards';

import styles from './TabData.module.css';

const tabData = [
    { title: 'Закуски', content: <p>Контент для категории "Закуски"</p> },
    { title: 'Первые блюда', content: <p>Контент для категории "Первые блюда"</p> },
    {
        title: 'Вторые блюда',
        content: (
            <Flex className={styles.container_cards}>
                {dataVeganPageCards.map(
                    ({ image, title, description, label, favorites, like }, index) => (
                        <GeneraCard
                            key={index}
                            image={image}
                            title={title}
                            description={description}
                            favorites={favorites}
                            label={label}
                            like={like}
                        />
                    ),
                )}
            </Flex>
        ),
    },
    { title: 'Гарниры', content: <p>Контент для категории "Гарниры"</p> },
    { title: 'Десерты', content: <p>Контент для категории "Десерты"</p> },
    { title: 'Выпечка', content: <p>Контент для категории "Выпечка"</p> },
    { title: 'Сыроедческие блюда', content: <p>Контент для категории "Сыродельческие блюда"</p> },
    { title: 'Напитки', content: <p>Контент для категории "Напитки"</p> },
];

export default tabData;
