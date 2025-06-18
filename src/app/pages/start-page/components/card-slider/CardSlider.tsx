import { Card, CardBody, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { fallback } from '~/assets/images/header';
import { CardStats } from '~/components/card-stats/CardStats';
import { LabelTypeFood } from '~/components/label-type-food/LabelTypeFood';
import { StatsForCard } from '~/components/stats-card/StatsForCard';
import { URLS } from '~/constants/url';
import { getArrayCategorySelector } from '~/store/selectors/arrayCategorySelector';
import {
    setIndexButton,
    setIndexRecipe,
    setIndexTab,
    setNameRecipe,
} from '~/store/slice/indexCategoriesSubcategoriesSlice';
import { Category } from '~/type/Category';

import styles from './CardSlider.module.css';

type CardSliderProps = {
    _id: string;
    title: string;
    description: string;
    categoriesIds: string[];
    favorites: number;
    like: number;
    image?: string;
};

export const CardSlider = ({
    _id,
    image,
    title,
    description,
    categoriesIds,
    favorites,
    like,
}: CardSliderProps) => {
    const dispatch = useDispatch();
    const [categoriesCard, setCategoriesCard] = useState<Category[]>([]);
    const allCategoriesSubcategories = useSelector(getArrayCategorySelector);

    const allCategory = allCategoriesSubcategories.filter((category) => category.subCategories);
    const allSubcategories = allCategoriesSubcategories.filter(
        (category) => !category.subCategories,
    );
    const currentSubcategory = allSubcategories.find((subcategories) =>
        categoriesIds.includes(subcategories._id),
    );
    const currentCategory = allCategory.find(
        (category) => category._id === currentSubcategory?.rootCategoryId,
    );
    const currentSubcategoryIndex =
        currentCategory?.subCategories?.findIndex((index) => categoriesIds.includes(index._id)) ??
        1;
    const currentCategoryIndex = allCategory.findIndex(
        (category) => category._id === currentSubcategory?.rootCategoryId,
    );

    useEffect(() => {
        const subcategoryFilter = allCategoriesSubcategories.filter((category) =>
            categoriesIds.includes(category._id),
        );
        const filteredCategories = allCategoriesSubcategories.filter((category) =>
            subcategoryFilter.some((item) => item.rootCategoryId === category._id),
        );
        setCategoriesCard(filteredCategories);
    }, [allCategoriesSubcategories, categoriesIds]);

    function handleCardClick() {
        dispatch(setIndexRecipe(_id));
        dispatch(setNameRecipe(title));
        dispatch(setIndexTab(currentSubcategoryIndex));
        dispatch(setIndexButton(currentCategoryIndex));
    }

    const pathCard = `recipes/${currentCategory?.category}/${currentSubcategory?.category}/${_id}`;
    const pathCardImage = `${URLS.IMAGE_URL}${image}`;

    return (
        <Card className={styles.card} as={Link} onClick={handleCardClick} to={pathCard}>
            <CardBody className={styles.card_body}>
                <Image
                    background='alpha.200'
                    className={styles.card_image}
                    src={pathCardImage}
                    fallbackSrc={fallback}
                    alt={title}
                    w={{ base: '158px', bp95: '279px', bp189: '322px' }}
                    h={{ base: '128px', bp95: '230px' }}
                    objectFit='none'
                    objectPosition='center'
                />
                <Stack className={styles.content}>
                    <Heading
                        className={styles.title_card}
                        title={title}
                        as='h3'
                        noOfLines={{ bp95: 1, base: 2 }}
                    >
                        {title}
                    </Heading>
                    <Text className={styles.description_card} noOfLines={3}>
                        {description}
                    </Text>
                    <Flex direction='column' gap='2px' display={{ base: 'none', bp95: 'flex' }}>
                        {categoriesCard.length && (
                            <CardStats
                                title={categoriesCard[0].title}
                                icon={categoriesCard[0].icon}
                                favorites={favorites}
                                like={like}
                            />
                        )}
                        {categoriesCard.map(
                            (item, index) =>
                                index !== 0 && (
                                    <LabelTypeFood
                                        title={item.title}
                                        icon={item.icon}
                                        key={item._id}
                                    />
                                ),
                        )}
                    </Flex>
                    <StatsForCard favorites={favorites} like={like} isMobile />
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
            </CardBody>
        </Card>
    );
};
