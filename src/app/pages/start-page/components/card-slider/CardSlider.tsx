import { Card, CardBody, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { fallback } from '~/assets/images/header';
import CardStats from '~/components/card-stats/CardStats';
import LabelTypeFood from '~/components/label-type-food/LabelTypeFood';
import StatsForCard from '~/components/stats-card/StatsForCard';
import { getArrayCategorySelector } from '~/store/selectors/arrayCategorySelector';
import { setIndexButton } from '~/store/slice/indexNavigationButtonSlice';
import { setIndexRecipe, setIndexTab, setNameRecipe } from '~/store/slice/indexTabsSlice';
import { Category } from '~/type/Category';

import styles from './CardSlider.module.css';

type CardSliderProps = {
    _id: string;
    image: string | undefined;
    title: string;
    description: string;
    categoriesIds: string[];
    favorites: number;
    like: number;
};

function CardSlider({
    _id,
    image,
    title,
    description,
    categoriesIds,
    favorites,
    like,
}: CardSliderProps) {
    const categories = useSelector(getArrayCategorySelector);
    const [categoriesCard, setCategoriesCard] = useState<Category[]>([]);
    const allCategoriesSubcategories = useSelector(getArrayCategorySelector);
    const allCategory = allCategoriesSubcategories.filter((categoty) => categoty.subCategories);
    const allSubcategories = allCategoriesSubcategories.filter(
        (categoty) => !categoty.subCategories,
    );
    const currentSubcategory = allSubcategories.find((subcategories) =>
        categoriesIds.includes(subcategories._id),
    );
    const currentCategory = allCategory.find(
        (categoty) => categoty._id === currentSubcategory?.rootCategoryId,
    );
    const currentSubcategoryIndex =
        currentCategory?.subCategories?.findIndex((index) => categoriesIds.includes(index._id)) ??
        1;
    const currentCategoryIndex = allCategory.findIndex(
        (categoty) => categoty._id === currentSubcategory?.rootCategoryId,
    );

    useEffect(() => {
        const subcategoryFilter = categories.filter((category) =>
            categoriesIds.includes(category._id),
        );
        const filteredCategories = categories.filter((category) =>
            subcategoryFilter.some((item) => item.rootCategoryId === category._id),
        );
        setCategoriesCard(filteredCategories);
    }, [categories, categoriesIds]);

    const dispatch = useDispatch();
    function handlingClick() {
        dispatch(setIndexRecipe(_id));
        dispatch(setNameRecipe(title));
        console.log(currentSubcategoryIndex, 'currentSubcategoryIndex');
        console.log(currentCategoryIndex, 'currentCategoryIndex');
        dispatch(setIndexTab(currentSubcategoryIndex));
        dispatch(setIndexButton(currentCategoryIndex));
    }

    return (
        <Card
            className={styles.card}
            as={Link}
            onClick={handlingClick}
            to={`recipes/${currentCategory?.category}/${currentSubcategory?.category}/${_id}`}
        >
            <CardBody className={styles.card_body}>
                <Image
                    background='alpha.200'
                    className={styles.card_image}
                    src={`https://training-api.clevertec.ru${image}`}
                    fallbackSrc={fallback}
                    alt={title}
                    w={{ base: '158px', bp95: '279px', bp189: '322px' }}
                    h={{ base: '128px', bp95: '230px' }}
                    objectFit='none'
                    objectPosition='center'
                />
                <Stack className={styles.content}>
                    <Heading className={styles.title_card} as='h3' noOfLines={{ bp95: 1, base: 2 }}>
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
                    {categoriesCard.map((item, index) => (
                        <LabelTypeFood
                            key={index}
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
}

export default CardSlider;
