import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import GeneraCard from '~/components/cards/card/GeneralCard';
import dataPathCategory from '~/data/dataPathCategory';
import dataRecipes from '~/data/dataRecipes';
import { useNavigationIndices } from '~/hooks/useNavigationIndices';
import {
    allergenFilterSelector,
    listCategorySelector,
    listTypeDishesSelector,
    listTypeMeatsSelector,
    resultSearchSelector,
} from '~/store/selectors/arrayResultFilterSelector';
import { setCountCard } from '~/store/slice/countCardActiveTabSlice';
import { setActiveSubcategoryId, setIndexTab } from '~/store/slice/indexTabsSlice';
import { Category } from '~/type/Category';
import RecipeType, { PaginationMeta } from '~/type/RecipeType';

import styles from './TabPanelNavigation.module.css';

type TabPanelNavigationType = {
    getCategory: Category | undefined;
    recipes: RecipeType[] | undefined;
    meta: PaginationMeta | undefined;
    page: number;
    onLoadMore: () => void;
};

function TabPanelNavigation({
    getCategory,
    recipes,
    page,
    onLoadMore,
    meta,
}: TabPanelNavigationType) {
    const tabListRef = useRef<HTMLDivElement | null>(null);
    const [arrayTabs, setArrayTabs] = useState<Category[]>([]);
    const [arrayCards, setArrayCards] = useState<RecipeType[][]>([[]]);
    const [activeCardsCount, setActiveCardsCount] = useState<number>(0);
    const { indexCategory, currentIndex, currentIndexButton } = useNavigationIndices();
    const allergenFilter = useSelector(allergenFilterSelector);
    const listCategory = useSelector(listCategorySelector);
    const listTypeMeats = useSelector(listTypeMeatsSelector);
    const listTypeDishes = useSelector(listTypeDishesSelector);
    const resultSearch = useSelector(resultSearchSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (tabListRef.current) {
            const tabList = tabListRef.current;
            tabList.scrollLeft = (tabList.scrollWidth - tabList.clientWidth) / 2;
        }
    }, []);

    useEffect(() => {
        if (getCategory && getCategory.subCategories) {
            setArrayTabs(getCategory?.subCategories);
        }
    }, [getCategory]);

    useEffect(() => {
        if (currentIndexButton !== undefined) {
            const dataPathEntries = Array.from(dataPathCategory);
            const category: string = dataPathEntries[currentIndexButton][0][1];
            const subcategories = dataPathEntries[currentIndexButton][1];
            const sortCardsCategory = dataRecipes.filter((recipe) =>
                recipe.category.includes(category),
            );

            const groupedRecipes = subcategories.map((subcat) =>
                sortCardsCategory
                    .filter((recipe) => recipe.subcategory.includes(subcat))
                    .filter((recipe) => {
                        const passesAllergen = !allergenFilter.some((filterStr) => {
                            const firstWord = filterStr.trim().split(/\s+/)[0];
                            return recipe.ingredients.some((ingredient) =>
                                ingredient.title.toLowerCase().includes(firstWord.toLowerCase()),
                            );
                        });
                        const passesCategory =
                            listCategory.length === 0 ||
                            listCategory.some((catFilter) => recipe.category.includes(catFilter));
                        const passesMeat =
                            listTypeMeats.length === 0 || listTypeMeats.includes(recipe.meat);
                        const passesSide =
                            listTypeDishes.length === 0 || listTypeDishes.includes(recipe.side);
                        const passesSearch =
                            resultSearch.length < 3 ||
                            recipe.title.toLowerCase().startsWith(resultSearch.toLowerCase());

                        return (
                            passesAllergen &&
                            passesCategory &&
                            passesMeat &&
                            passesSide &&
                            passesSearch
                        );
                    }),
            );
            setArrayCards(groupedRecipes);
        }
    }, [
        allergenFilter,
        currentIndexButton,
        listCategory,
        listTypeDishes,
        listTypeMeats,
        resultSearch,
    ]);

    useEffect(() => {
        if (typeof currentIndex === 'number' && arrayCards[currentIndex]) {
            setActiveCardsCount(arrayCards[currentIndex].length);
            dispatch(setCountCard(activeCardsCount));
        } else {
            setActiveCardsCount(0);
        }
    }, [activeCardsCount, arrayCards, currentIndex, dispatch]);

    const handleTabClick = (_id: string) => {
        dispatch(setActiveSubcategoryId(_id));
    };

    const handleTabsChange = (index: number) => {
        dispatch(setIndexTab(index));
    };

    return (
        <Flex className={styles.container}>
            <Box className={styles.container_tabs}>
                <Tabs
                    variant='unstyled'
                    index={currentIndex}
                    onChange={handleTabsChange}
                    isLazy
                    lazyBehavior='unmount'
                >
                    <TabList
                        ref={tabListRef}
                        className={styles.tab_list}
                        maxW='fit-content'
                        mx='auto'
                        borderBottom='1px solid'
                        borderColor='gray.800'
                    >
                        {arrayTabs.map((tab, index) => (
                            <Tab
                                data-test-id={`tab-${Array.from(dataPathCategory.values())[indexCategory][index]}-${index}`}
                                as={Link}
                                key={index}
                                className={styles.tab}
                                _selected={{
                                    color: '#2db100',
                                    borderBottom: '2px solid',
                                    borderColor: '#2db100',
                                }}
                                onClick={() => handleTabClick(tab._id)}
                                to={`/recipes/${getCategory?.category}/${tab.category}`}
                            >
                                {tab.title}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {arrayTabs.map((tab) => (
                            <TabPanel
                                className={styles.tab_panel}
                                key={tab._id}
                                px={0}
                                pt={6}
                                pb={4}
                            >
                                <Flex className={styles.container_cards}>
                                    {recipes &&
                                        recipes.map(
                                            (
                                                {
                                                    _id,
                                                    image,
                                                    title,
                                                    description,
                                                    categoriesIds,
                                                    bookmarks,
                                                    likes,
                                                },
                                                i,
                                            ) => (
                                                <GeneraCard
                                                    dataTest={`food-card-${i}`}
                                                    dataTestButton={`card-link-${i}`}
                                                    key={_id}
                                                    _id={_id}
                                                    image={image}
                                                    title={title}
                                                    description={description}
                                                    favorites={bookmarks}
                                                    categoriesIds={categoriesIds}
                                                    like={likes}
                                                />
                                            ),
                                        )}
                                </Flex>
                            </TabPanel>
                        ))}
                        ;
                    </TabPanels>
                </Tabs>
            </Box>
            {meta && page < meta.totalPages && (
                <Button className={styles.button} onClick={onLoadMore}>
                    Загрузить ещё
                </Button>
            )}
        </Flex>
    );
}

export default TabPanelNavigation;
