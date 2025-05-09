import { Box, Button, Flex, Heading, Icon, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { fallback } from '~/assets/images/header';
import BookMark from '~/components/icons/BookMark';
import Clock from '~/components/icons/Clock';
import EmojiHeart from '~/components/icons/EmojiHeart';
import LabelTypeFood from '~/components/label-type-food/LabelTypeFood';
import StatsForCard from '~/components/stats-card/StatsForCard';
import { URLS } from '~/constants/url';
import { getArrayCategorySelector } from '~/store/selectors/arrayCategorySelector';
import { Category } from '~/type/Category';

import styles from './CardAboutRecipe.module.css';

type CardAboutRecipe = {
    title: string;
    categoriesIds: string[];
    image: string;
    bookmarks: number;
    likes: number;
    description: string;
    time: string;
};

function CardAboutRecipe({
    title,
    image,
    bookmarks,
    likes,
    description,
    time,
    categoriesIds,
}: CardAboutRecipe) {
    const categories = useSelector(getArrayCategorySelector);
    const [categoriesCard, setCategoriesCard] = useState<Category[]>([]);

    useEffect(() => {
        const subcategoryFilter = categories.filter((category) =>
            categoriesIds.includes(category._id),
        );
        const filteredCategories = categories.filter((category) =>
            subcategoryFilter.some((item) => item.rootCategoryId === category._id),
        );
        setCategoriesCard(filteredCategories);
    }, [categories, categoriesIds]);

    return (
        <Flex className={styles.container} mt={{ base: 4, bp95: 14 }} mb={{ base: 6, bp95: 10 }}>
            <Image
                className={styles.image}
                src={`${URLS.IMAGE_URL}${image}`}
                alt={title}
                background='alpha.200'
                fallbackSrc={fallback}
                objectFit='none'
                objectPosition='center'
            />
            <Flex
                direction='column'
                pl={{ base: 0, bp76: 4, bp95: 6 }}
                pt={{ base: 4, bp76: 0 }}
                width='100%'
            >
                <Flex gap={5} justify='space-between' alignItems='flex-start'>
                    <Flex rowGap='8px' columnGap={{ base: '9px', bp160: '17px' }} flexWrap='wrap'>
                        {categoriesCard.map((item) => (
                            <LabelTypeFood
                                title={item.title}
                                icon={item.icon}
                                key={item._id}
                                yellow
                            />
                        ))}
                    </Flex>
                    <Box py={{ base: '4px', bp160: '6px' }} pr={{ base: 0, bp160: '8px' }}>
                        <StatsForCard
                            favorites={bookmarks}
                            like={likes}
                            isForAboutRecipe
                            size='14px'
                            gapContainer='33px'
                            gapIcon='8px'
                        />
                    </Box>
                </Flex>
                <Heading className={styles.title} as='h1'>
                    {title}
                </Heading>
                <Text className={styles.description}>{description}</Text>
                <Flex
                    className={styles.bottom}
                    mt='auto'
                    alignItems={{ base: 'flex-start', bp76: 'flex-end' }}
                    justify='space-between'
                    direction={{ base: 'column', bp76: 'row' }}
                    gap={{ base: 3, bp76: 0 }}
                >
                    <Flex
                        className={styles.time_label}
                        alignItems='center'
                        px='8px'
                        py='2px'
                        gap='8px'
                    >
                        <Icon as={Clock} />
                        <Text className={styles.clock_text}>{time}</Text>
                    </Flex>
                    <Flex className={styles.group_button} gap={{ base: '12px', bp160: '16px' }}>
                        <Button
                            leftIcon={
                                <EmojiHeart
                                    boxSize={{ base: '12px', bp95: '14px', bp160: '16px' }}
                                />
                            }
                            iconSpacing={{ base: '7px', bp76: '8px' }}
                            className={styles.button}
                            size={{ base: 'xs', bp95: 'sm', bp160: 'lg' }}
                            px='23px'
                            variant='outline'
                        >
                            Оценить рецепт
                        </Button>
                        <Button
                            leftIcon={
                                <BookMark boxSize={{ base: '12px', bp95: '14px', bp160: '16px' }} />
                            }
                            iconSpacing={{ base: '7px', bp76: '8px' }}
                            className={styles.button}
                            size={{ base: 'xs', bp95: 'sm', bp160: 'lg' }}
                            px='23px'
                        >
                            Сохранить в закладки
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default CardAboutRecipe;
