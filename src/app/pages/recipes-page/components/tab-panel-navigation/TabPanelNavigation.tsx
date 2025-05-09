import {
    Box,
    Button,
    Flex,
    Spinner,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';

import GeneraCard from '~/components/cards/card/GeneralCard';
import { ErrorModal } from '~/components/error-modal/ErrorModal';
import FilterSortBlock from '~/components/filter-sort-block/FilterSortBlock';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { useNavigationIndices } from '~/hooks/useNavigationIndices';
import useShouldShowFilterResults from '~/hooks/useShouldShowFilterResults';
import {
    setActiveSubcategoryId,
    setIndexTab,
} from '~/store/slice/indexCategorisSubcategoriesSlice';
import { Category } from '~/type/Category';
import RecipeType, { PaginationMeta } from '~/type/RecipeType';

import styles from './TabPanelNavigation.module.css';

type TabPanelNavigationType = {
    isFetching: boolean;
    page: number;
    onLoadMore: () => void;
    getCategory?: Category;
    recipes?: RecipeType[];
    meta?: PaginationMeta;
};

function TabPanelNavigation({
    getCategory,
    recipes,
    page,
    isFetching,
    onLoadMore,
    meta,
}: TabPanelNavigationType) {
    const dispatch = useDispatch();
    const { currentIndex } = useNavigationIndices();
    const tabListRef = useRef<HTMLDivElement | null>(null);

    const {
        shouldShowFilterResults,
        filterRecipes,
        isErrorFilterRecipes,
        pageFilter,
        dataFilterRecipes,
        handleLoadMoreFilter,
    } = useShouldShowFilterResults(4);
    const [isErrorOpenFilter, setIsErrorOpenFilter] = useState(isErrorFilterRecipes);

    const arrayTabs = useMemo(() => getCategory?.subCategories || [], [getCategory]);

    useEffect(() => {
        if (tabListRef.current) {
            const tabList = tabListRef.current;
            tabList.scrollLeft = (tabList.scrollWidth - tabList.clientWidth) / 2;
        }
    }, []);

    useEffect(() => {
        setIsErrorOpenFilter(!!isErrorFilterRecipes);
    }, [isErrorFilterRecipes]);

    const handleTabClick = (_id: string) => {
        dispatch(setActiveSubcategoryId(_id));
    };

    const handleTabsChange = (index: number) => {
        dispatch(setIndexTab(index));
    };

    const renderTabsContent = () => {
        if (isErrorOpenFilter) {
            return <ErrorModal onClose={() => setIsErrorOpenFilter(false)} />;
        }

        if (isFetching) {
            return (
                <Flex h='250px' justifyContent='center' alignItems='center'>
                    <Spinner />
                </Flex>
            );
        }

        if (shouldShowFilterResults) {
            return (
                <TabPanels>
                    {arrayTabs.map((tab) => (
                        <TabPanel className={styles.tab_panel} key={tab._id} px={0} pt={0} pb={4}>
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
                                                dataTest={`${DATA_TEST_ID.FOOD_CARD}-${i}`}
                                                dataTestButton={`${DATA_TEST_ID.CARD_LINK}-${i}`}
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
                </TabPanels>
            );
        }

        if (!isErrorFilterRecipes && filterRecipes.length > 0) {
            return (
                <FilterSortBlock
                    filterSearchRecipes={filterRecipes}
                    page={pageFilter}
                    meta={dataFilterRecipes?.meta}
                    onLoadMore={handleLoadMoreFilter}
                />
            );
        }

        return null;
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
                                data-test-id={`tab-${tab.category}-${index}`}
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
                    {renderTabsContent()}
                </Tabs>
            </Box>
            {meta && page < meta.totalPages && shouldShowFilterResults && (
                <Button
                    className={styles.button}
                    data-test-id={DATA_TEST_ID.LOAD_MORE_BUTTON}
                    onClick={onLoadMore}
                >
                    Загрузить ещё
                </Button>
            )}
        </Flex>
    );
}

export default TabPanelNavigation;
