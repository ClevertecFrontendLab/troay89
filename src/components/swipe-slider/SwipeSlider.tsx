import 'swiper/swiper-bundle.css';

import { Box } from '@chakra-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import CardSlider from '~/app/pages/start-page/components/card-slider/CardSlider';
import SliderButton from '~/app/pages/start-page/components/slider-button/SliderButton';
import dataRecipes from '~/data/dataRecipes';
import RecipeType from '~/type/RecipeType';

import styles from './SwiperSlider.module.css';

function SwipeSlider() {
    const [arraySliderCard, setArraySliderCard] = useState<RecipeType[]>([]);
    const swiperRef = useRef<SwiperClass | null>(null);

    const sortDateRecipes = useMemo(
        () =>
            [...dataRecipes]
                .sort(
                    (firstRecipe, secondRecipe) =>
                        new Date(secondRecipe.date).getTime() -
                        new Date(firstRecipe.date).getTime(),
                )
                .slice(0, 10),
        [],
    );
    useEffect(() => {
        setArraySliderCard(sortDateRecipes);
    }, [sortDateRecipes]);

    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    return (
        <Box className={styles.wrapper}>
            <SliderButton onClick={handlePrev} />
            <Box className={styles.container}>
                <Swiper
                    loop={true}
                    className={styles.swiper}
                    slidesPerView='auto'
                    spaceBetween={12}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    slidesPerGroup={1}
                    breakpoints={{
                        1890: {
                            spaceBetween: 24,
                        },
                    }}
                >
                    {arraySliderCard.map(
                        ({ id, image, title, description, category, bookmarks, likes }) => (
                            <SwiperSlide key={id} className={styles.swiper_slide}>
                                <CardSlider
                                    key={id}
                                    image={image}
                                    title={title}
                                    description={description}
                                    label={category}
                                    favorites={bookmarks}
                                    like={likes}
                                />
                            </SwiperSlide>
                        ),
                    )}
                </Swiper>
            </Box>
            <SliderButton reverse onClick={handleNext} />
        </Box>
    );
}

export default SwipeSlider;
