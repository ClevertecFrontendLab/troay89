import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import GeneraCard from '~/components/cards/card/GeneralCard';
import dataNavigation from '~/data/dataNavigation';
import dataPathCategory from '~/data/dataPathCategory';
import dataRecipes from '~/data/dataRecipes';
import { useNavigationIndices } from '~/hooks/useNavigationIndices';
import { ApplicationState } from '~/store/configure-store';
import { setIndexTab } from '~/store/slice/indexTabsSlice';
import RecipeType from '~/type/RecipeType';

import styles from './TabPanelNavigation.module.css';

function TabPanelNavigation() {
    const tabListRef = useRef<HTMLDivElement | null>(null);
    const [arrayTabs, setArrayTabs] = useState<string[]>([]);
    const [arrayCards, setArrayCards] = useState<RecipeType[][]>([[]]);
    const { indexCategory, indexSubcategory, currentIndex, currentIndexButton, category } =
        useNavigationIndices();
    const allergenFilter = useSelector(
        (state: ApplicationState) => state.arrayResultFilter.resultFilter,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (tabListRef.current) {
            const tabList = tabListRef.current;
            tabList.scrollLeft = (tabList.scrollWidth - tabList.clientWidth) / 2;
        }
    }, []);

    useEffect(() => {
        if (currentIndexButton !== undefined) {
            if (category) {
                const key = Array.from(dataPathCategory.keys())[currentIndexButton][0];
                setArrayTabs(dataNavigation[key]);
            }
        }
    }, [category, currentIndexButton, setArrayTabs]);

    useEffect(() => {
        if (currentIndexButton !== undefined) {
            const category: string = Array.from(dataPathCategory)[currentIndexButton][0][1];
            const subcategory = Array.from(dataPathCategory)[currentIndexButton][1];
            const sortCardsCategory = dataRecipes.filter((recipe) =>
                recipe.category.includes(category),
            );
            const groupedRecipes = subcategory.map((subcat) =>
                sortCardsCategory
                    .filter((recipe) => recipe.subcategory.includes(subcat))
                    .filter(
                        (recipe) =>
                            !allergenFilter.some((filterStr) => {
                                const firstWord = filterStr.trim().split(/\s+/)[0];
                                return recipe.ingredients.some((ingredient) =>
                                    ingredient.title
                                        .toLowerCase()
                                        .includes(firstWord.toLowerCase()),
                                );
                            }),
                    ),
            );

            setArrayCards(groupedRecipes);
        }
    }, [allergenFilter, currentIndexButton]);

    const handleTabsChange = (index: number) => {
        dispatch(setIndexTab(index));
    };

    return (
        <Flex className={styles.container}>
            <Box className={styles.container_tabs}>
                <Tabs variant='unstyled' index={currentIndex} onChange={handleTabsChange}>
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
                                as={Link}
                                key={index}
                                className={styles.tab}
                                _selected={{
                                    color: '#2db100',
                                    borderBottom: '2px solid',
                                    borderColor: '#2db100',
                                }}
                                to={`/recipes/${category}/${Array.from(dataPathCategory.values())[indexCategory][indexSubcategory]}`}
                            >
                                {tab}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {arrayCards.map((group, index) => (
                            <TabPanel className={styles.tab_panel} key={index} px={0} pt={6} pb={4}>
                                <Flex className={styles.container_cards}>
                                    {group.map(
                                        ({
                                            id,
                                            image,
                                            title,
                                            description,
                                            category,
                                            bookmarks,
                                            likes,
                                        }) => (
                                            <GeneraCard
                                                key={id}
                                                id={id}
                                                image={image}
                                                title={title}
                                                description={description}
                                                favorites={bookmarks}
                                                label={category}
                                                like={likes}
                                            />
                                        ),
                                    )}
                                </Flex>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Box>
            <Button className={styles.button}>Загрузить ещё</Button>
        </Flex>
    );
}

export default TabPanelNavigation;
