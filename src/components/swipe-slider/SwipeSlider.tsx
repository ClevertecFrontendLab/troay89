import 'swiper/swiper-bundle.css';

import { Box } from '@chakra-ui/react';
import { useRef } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import CardSlider from '~/app/pages/start-page/components/card-slider/CardSlider';
import SliderButton from '~/app/pages/start-page/components/slider-button/SliderButton';
import RecipeType from '~/type/RecipeType';

import styles from './SwiperSlider.module.css';

type SwipeSlideType = {
    swipeData: RecipeType[] | undefined;
};

function SwipeSlider({ swipeData }: SwipeSlideType) {
    const swipeDataFilter =
        swipeData &&
        [...swipeData]?.sort(
            (firstRecipe, secondRecipe) =>
                new Date(secondRecipe.createdAt).getTime() -
                new Date(firstRecipe.createdAt).getTime(),
        );
    const swiperRef = useRef<SwiperClass | null>(null);

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
            <SliderButton dataTest='carousel-back' onClick={handlePrev} />
            <Box className={styles.container}>
                <Swiper
                    data-test-id='carousel'
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
                    {swipeDataFilter &&
                        swipeDataFilter.map(
                            (
                                { _id, image, title, description, categoriesIds, bookmarks, likes },
                                index,
                            ) => (
                                <SwiperSlide
                                    key={_id}
                                    className={styles.swiper_slide}
                                    data-test-id={`carousel-card-${index}`}
                                >
                                    <CardSlider
                                        key={_id}
                                        _id={_id}
                                        image={image}
                                        categoriesIds={categoriesIds}
                                        title={title}
                                        description={description}
                                        favorites={bookmarks}
                                        like={likes}
                                    />
                                </SwiperSlide>
                            ),
                        )}
                </Swiper>
            </Box>
            <SliderButton dataTest='carousel-forward' reverse onClick={handleNext} />
        </Box>
    );
}

export default SwipeSlider;
