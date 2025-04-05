import { Flex } from '@chakra-ui/react';

import CardProps from '~/type/cardProps';

import CardSlider from '../card-slider/CardSlider';
import SliderButton from '../slider-button/SliderButton';
import { four, one, third, two } from './../../../../../assets/images/main-page';
import styles from './Slaider.module.css';

const slider: CardProps[] = [
    {
        image: one,
        title: 'Солянка с грибами',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        label: 'Первые блюда',
        favorites: 1,
    },
    {
        image: two,
        title: 'Капустные котлеты',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        label: 'Веганские блюда',
        favorites: 2,
        like: 1,
    },
    {
        image: third,
        title: 'Оладьи на кефире "Пышные"',
        description:
            'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
        label: 'Десерты, выпечка',
        like: 1,
    },
    {
        image: four,
        title: 'Салат "Здоровье"',
        description:
            'Сельдерей очень полезен для здоровья, пора набираться витаминов. Не  салат, а сплошное удовольствие:) Вкусный, необычный, а главное быстрый.',
        label: 'Салаты',
    },
];

function Slider() {
    return (
        <>
            <Flex className={styles['container_slider']}>
                <SliderButton />
                {slider.map(({ image, title, description, label, favorites, like }) => (
                    <CardSlider
                        image={image}
                        title={title}
                        description={description}
                        label={label}
                        favorites={favorites}
                        like={like}
                    />
                ))}
                <SliderButton reverse />
            </Flex>
        </>
    );
}

export default Slider;
