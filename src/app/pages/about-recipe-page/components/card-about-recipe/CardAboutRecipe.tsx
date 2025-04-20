import { Box, Button, Flex, Heading, Icon, Image, Text } from '@chakra-ui/react';

import BookMark from '~/components/icons/BookMark';
import Clock from '~/components/icons/Clock';
import EmojiHeart from '~/components/icons/EmojiHeart';
import LabelTypeFood from '~/components/label-type-food/LabelTypeFood';
import StatsForCard from '~/components/stats-card/StatsForCard';

import image from './../../../../../assets/images/aboutRecipe/aboutRecipe.png';
import styles from './CardAboutRecipe.module.css';

function CardAboutRecipe() {
    const arrayCategory = ['Вторые блюда', 'Национальные', 'Детские блюда'];
    return (
        <Flex className={styles.container} mt={14} mb={10}>
            <Image src={image} alt='image recipe' />
            <Flex direction='column' pl={6} width='100%'>
                <Flex gap={5} justify='space-between' alignItems='flex-start'>
                    <Flex rowGap='8px' columnGap='17px' flexWrap='wrap'>
                        {arrayCategory.map((category) => (
                            <LabelTypeFood key={category} label={category} yellow />
                        ))}
                    </Flex>
                    <Box py='6px' pr='8px'>
                        <StatsForCard
                            favorites={258}
                            like={342}
                            isForAboutRecipe
                            size='14px'
                            gapContainer='33px'
                            gapIcon='8px'
                        />
                    </Box>
                </Flex>
                <Heading className={styles.title} as='h1'>
                    Лапша с курицей и шафраном
                </Heading>
                <Text className={styles.description}>
                    Как раз после праздников, когда мясные продукты еще остались, но никто их уже не
                    хочет, время варить солянку.
                </Text>
                <Flex
                    className={styles.bottom}
                    mt='auto'
                    alignItems='flex-end'
                    justify='space-between'
                >
                    <Flex
                        className={styles.time_label}
                        alignItems='center'
                        px='8px'
                        py='2px'
                        gap='8px'
                    >
                        <Icon as={Clock} />
                        <Text className={styles.clock_text}>20 минут</Text>
                    </Flex>
                    <Flex className={styles.group_button} gap={4}>
                        <Button
                            leftIcon={<EmojiHeart />}
                            className={styles.button}
                            size='lg'
                            px='23px'
                            variant='outline'
                        >
                            Оценить рецепт
                        </Button>
                        <Button
                            leftIcon={<BookMark />}
                            className={styles.button}
                            size='lg'
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
