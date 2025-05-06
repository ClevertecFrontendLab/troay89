import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';

import GeneraCard from '~/components/cards/card/GeneralCard';
import { ErrorModal } from '~/components/error-modal/ErrorModal';
import FilterSortBlock from '~/components/filter-sort-block/FilterSortBlock';
import dataPathCategory from '~/data/dataPathCategory';
import { useNavigationIndices } from '~/hooks/useNavigationIndices';
import useShouldShowFilterResults from '~/hooks/useShouldShowFilterResults';
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
    const [activeCardsCount, setActiveCardsCount] = useState<number>(0);
    const {
        shouldShowFilterResults,
        filterRecipes,
        isErrorFilterRecipes,
        pageFilter,
        dataFilterRecipes,
        handleLoadMoreFilter,
    } = useShouldShowFilterResults(4);
    const { indexCategory, currentIndex } = useNavigationIndices();
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
        if (typeof currentIndex === 'number') {
            dispatch(setCountCard(activeCardsCount));
        } else {
            setActiveCardsCount(0);
        }
    }, [activeCardsCount, currentIndex, dispatch]);

    const handleTabClick = (_id: string) => {
        dispatch(setActiveSubcategoryId(_id));
    };

    const handleTabsChange = (index: number) => {
        dispatch(setIndexTab(index));
    };

    const [isErrorOpenFilter, setIsErrorOpenFilter] = useState(!!isErrorFilterRecipes);

    useEffect(() => {
        setIsErrorOpenFilter(!!isErrorFilterRecipes);
    }, [isErrorFilterRecipes]);

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
                    {isErrorOpenFilter ? (
                        <ErrorModal onClose={() => setIsErrorOpenFilter(false)} />
                    ) : shouldShowFilterResults ? (
                        <TabPanels>
                            {arrayTabs.map((tab) => (
                                <TabPanel
                                    className={styles.tab_panel}
                                    key={tab._id}
                                    px={0}
                                    pt={0}
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
                    ) : (
                        !isErrorFilterRecipes &&
                        filterRecipes.length > 0 && (
                            <FilterSortBlock
                                filterSearchRecipes={filterRecipes}
                                page={pageFilter}
                                meta={dataFilterRecipes?.meta}
                                onLoadMore={handleLoadMoreFilter}
                            />
                        )
                    )}
                </Tabs>
            </Box>
            {meta && page < meta.totalPages && shouldShowFilterResults && (
                <Button
                    className={styles.button}
                    data-test-id='load-more-button'
                    onClick={onLoadMore}
                >
                    Загрузить ещё
                </Button>
            )}
        </Flex>
    );
}

export default TabPanelNavigation;
