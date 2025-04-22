import { Box, Button, Flex, Heading, Icon, Image, Text } from '@chakra-ui/react';

import BookMark from '~/components/icons/BookMark';
import Clock from '~/components/icons/Clock';
import EmojiHeart from '~/components/icons/EmojiHeart';
import LabelTypeFood from '~/components/label-type-food/LabelTypeFood';
import StatsForCard from '~/components/stats-card/StatsForCard';
import useLabelCategory from '~/hooks/useLabelCategory';
import { useNavigationIndices } from '~/hooks/useNavigationIndices';

import styles from './CardAboutRecipe.module.css';

function CardAboutRecipe() {
    const { recipe } = useNavigationIndices();
    const { arrayCategory } = useLabelCategory({ categories: recipe ? recipe?.category : [] });
    if (recipe === undefined) {
        return;
    }

    return (
        <Flex className={styles.container} mt={{ base: 4, bp95: 14 }} mb={{ base: 6, bp95: 10 }}>
            <Image className={styles.image} src={recipe.image} alt={recipe.title} />
            <Flex
                direction='column'
                pl={{ base: 0, bp76: 4, bp95: 6 }}
                pt={{ base: 4, bp76: 0 }}
                width='100%'
            >
                <Flex gap={5} justify='space-between' alignItems='flex-start'>
                    <Flex rowGap='8px' columnGap={{ base: '9px', bp160: '17px' }} flexWrap='wrap'>
                        {arrayCategory.map((category) => (
                            <LabelTypeFood key={category} label={category} yellow />
                        ))}
                    </Flex>
                    <Box py={{ base: '4px', bp160: '6px' }} pr={{ base: 0, bp160: '8px' }}>
                        <StatsForCard
                            favorites={recipe.bookmarks}
                            like={recipe.likes}
                            isForAboutRecipe
                            size='14px'
                            gapContainer='33px'
                            gapIcon='8px'
                        />
                    </Box>
                </Flex>
                <Heading className={styles.title} as='h1'>
                    {recipe.title}
                </Heading>
                <Text className={styles.description}>{recipe.description}</Text>
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
                        <Text className={styles.clock_text}>{recipe.time}</Text>
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
