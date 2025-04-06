import { Flex, Heading } from '@chakra-ui/react';

import { alexAvatar, eight, elenaAvatar, five, seven, six } from '~/assets/images/main-page';
import GreenButton from '~/components/buttons/green-button/GreenButton';
import GeneraCard from '~/components/cards/card/GeneralCard';
import Toolbar from '~/components/toolbar/Toolbar';
import CardProps from '~/type/cardProps';

import AuthorBlock from './components/author-block/AuthorBlock';
import Slider from './components/slaider/Slaider';
import styles from './MaingPage.module.css';

const content: CardProps[] = [
    {
        image: five,
        title: 'Кнели со спагетти',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        label: 'Вторые блюда',
        favorites: 85,
        like: 152,
    },
    {
        image: six,
        title: 'Пряная ветчина по итальянски',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        label: 'Вторые блюда',
        favorites: 159,
        like: 257,
        avatarRecomend: elenaAvatar,
        nameRecomend: 'Елена Высоцкая рекомендует',
    },
    {
        image: seven,
        title: 'Лапша с курицей и шафраном',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        label: 'Вторые блюда',
        favorites: 258,
        like: 342,
        avatarRecomend: alexAvatar,
        nameRecomend: 'Alex Cook рекомендует',
    },
    {
        image: eight,
        title: 'Том-ям с капустой кимчи',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        label: 'Национальные',
        favorites: 124,
        like: 324,
    },
];

function MainPage() {
    return (
        <>
            <Toolbar title='Приятного аппетита!' />
            <Heading className={styles.subtitle} as='h2'>
                Новые рецепты
            </Heading>
            <Slider />
            <Flex className={styles['subtitle_container']}>
                <Heading className={styles.subtitle} as='h2'>
                    Самое сочное
                </Heading>
                <GreenButton />
            </Flex>
            <Flex className={styles.juicy}>
                {content.map(
                    ({
                        image,
                        title,
                        description,
                        label,
                        favorites,
                        like,
                        nameRecomend,
                        avatarRecomend,
                    }) => (
                        <GeneraCard
                            image={image}
                            title={title}
                            description={description}
                            label={label}
                            favorites={favorites}
                            like={like}
                            nameRecomend={nameRecomend}
                            avatarRecomend={avatarRecomend}
                        />
                    ),
                )}
            </Flex>
            <AuthorBlock />
        </>
    );
}

export default MainPage;
