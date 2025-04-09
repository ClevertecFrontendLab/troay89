import { Flex } from '@chakra-ui/react';

import dataSliderCard from '~/data/dataSliderCard';

import CardSlider from '../card-slider/CardSlider';
import SliderButton from '../slider-button/SliderButton';
import styles from './Slaider.module.css';

function Slider() {
    return (
        <Flex className={styles['container_slider']}>
            <SliderButton />
            <Flex className={styles['card_container']}>
                {dataSliderCard.map(({ image, title, description, label, favorites, like }) => (
                    <CardSlider
                        key={title}
                        image={image}
                        title={title}
                        description={description}
                        label={label}
                        favorites={favorites}
                        like={like}
                    />
                ))}
            </Flex>
            <SliderButton reverse />
        </Flex>
    );
}

export default Slider;
