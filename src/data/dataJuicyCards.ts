import { alexAvatar, eight, elenaAvatar, five, seven, six } from '~/assets/images/main-page';
import CardProps from '~/type/cardProps';

const dataJuicyCards: CardProps[] = [
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
        avatarRecommend: elenaAvatar,
        nameRecommend: 'Елена Высоцкая рекомендует',
    },
    {
        image: seven,
        title: 'Лапша с курицей и шафраном',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        label: 'Вторые блюда',
        favorites: 258,
        like: 342,
        avatarRecommend: alexAvatar,
        nameRecommend: 'Alex Cook рекомендует',
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

export default dataJuicyCards;
