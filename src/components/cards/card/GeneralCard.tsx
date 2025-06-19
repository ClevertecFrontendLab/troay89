import { Box, Card, CardHeader, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { fallback } from '~/assets/images/header';
import { CardStats } from '~/components/card-stats/CardStats';
import { HighlightText } from '~/components/highlight-text/HighlightText';
import { LabelTypeFood } from '~/components/label-type-food/LabelTypeFood';
import { RecipeActionButton } from '~/components/recipe-action-button/RecipeActionButton';
import { StatsForCard } from '~/components/stats-card/StatsForCard';
import { URLS } from '~/constants/url';
import { getArrayCategorySelector } from '~/store/selectors/arrayCategorySelector';
import { resultSearchSelector } from '~/store/selectors/arrayResultFilterSelector';
import { Category } from '~/type/Category';
import { isNumberMoreZero } from '~/utils/isNumberMoreZero';

import styles from './GeneralCard.module.css';

type GeneraCardProps = {
    _id: string;
    image: string;
    title: string;
    description: string;
    categoriesIds: string[];
    favorites: number;
    like: number;
    dataTestButton: string;
    dataTest?: string;
    isMyRecipe?: boolean;
    isMyBookmarks?: boolean;
    authorId?: string;
};

export const GeneraCard = ({
    _id,
    image,
    title,
    description,
    categoriesIds,
    favorites,
    like,
    dataTest,
    dataTestButton,
    isMyRecipe,
    isMyBookmarks,
    authorId,
}: GeneraCardProps) => {
    const categories = useSelector(getArrayCategorySelector);
    const [categoriesCard, setCategoriesCard] = useState<Category[]>([]);
    const isDraft = authorId ? false : true;
    useEffect(() => {
        if (categoriesIds) {
            const subcategoryFilter = categories.filter((category) =>
                categoriesIds.includes(category._id),
            );
            const filteredCategories = categories.filter((category) =>
                subcategoryFilter.some((item) => item.rootCategoryId === category._id),
            );
            setCategoriesCard(filteredCategories);
        }
    }, [categories, categoriesIds]);
    const resultSearch = useSelector(resultSearchSelector);

    return (
        <Card className={styles.card_container} data-test-id={dataTest} w='100%'>
            <Image
                className={styles.image}
                src={`${URLS.IMAGE_URL}${image}`}
                alt={title}
                flexShrink={0}
                background='alpha.200'
                fallbackSrc={fallback}
                w={{ base: '158px', bp95: '346px' }}
                h={{ base: '128px', bp95: '244px' }}
                objectFit='none'
                objectPosition='center'
            />
            <Stack className={styles.card_content} gap={0} w='100%'>
                <CardHeader className={styles.card_header}>
                    <Flex direction='column' gap='2px' display={{ base: 'none', bp95: 'flex' }}>
                        {isNumberMoreZero(categoriesCard.length) && (
                            <CardStats
                                title={categoriesCard[0].title}
                                icon={categoriesCard[0].icon}
                                like={like}
                                favorites={favorites}
                                yellow
                            />
                        )}
                        {categoriesCard.map(
                            (item, index) =>
                                index !== 0 && (
                                    <LabelTypeFood
                                        title={item.title}
                                        icon={item.icon}
                                        key={item._id}
                                        yellow
                                    />
                                ),
                        )}
                    </Flex>

                    {isMyRecipe && isDraft ? (
                        <Box
                            className={styles.label}
                            bg='alpha.100'
                            pos='absolute'
                            top={{ base: '8px', bp95: '19px' }}
                            right={{ base: '8px', bp95: '23px' }}
                        >
                            Черновик
                        </Box>
                    ) : (
                        <StatsForCard favorites={favorites} like={like} isMobile />
                    )}
                </CardHeader>
                <Flex className={styles.card_body} direction='column' justify='end'>
                    <Heading
                        className={classNames(styles.subtitle, { [styles.draft]: isDraft })}
                        title={title}
                        as='h3'
                        noOfLines={{ base: 2, bp95: 1 }}
                    >
                        <HighlightText text={title} query={resultSearch} />
                    </Heading>
                    <Text as='span' className={styles.description} noOfLines={3} minH='60px'>
                        {description}
                    </Text>
                    <RecipeActionButton
                        isMyRecipe={isMyRecipe}
                        isDraft={isDraft}
                        isMyBookmarks={isMyBookmarks}
                        id={_id}
                        titleRecipe={title}
                        dataTestButton={dataTestButton}
                        categoriesIds={categoriesIds}
                        authorId={authorId ?? ''}
                    />
                </Flex>
            </Stack>
            <Flex
                direction='column'
                gap='2px'
                pos='absolute'
                top='8px'
                left='8px'
                display={{ base: 'flex', bp95: 'none' }}
            >
                {categoriesCard.map((item) => (
                    <LabelTypeFood
                        key={item._id}
                        title={item.title}
                        icon={item.icon}
                        yellow
                        isMobile
                    />
                ))}
            </Flex>
        </Card>
    );
};

export default GeneraCard;
