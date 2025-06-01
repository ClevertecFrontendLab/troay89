import { Box, Divider, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import { AlertSuccess } from '~/components/alert/alert-success/AlertSuccess';
import FilterSortBlock from '~/components/filter-sort-block/FilterSortBlock';
import { LastBlock } from '~/components/last-block/LastBlock';
import { SwipeSlider } from '~/components/swipe-slider/SwipeSlider';
import { withLoader } from '~/components/with-loader/WithLoader';
import { SUCCESS_MESSAGE } from '~/constants/successMessage';
import { Category } from '~/type/Category';
import { PaginationMeta, RecipeType, RecipeTypeResponse } from '~/type/RecipeType';

import { AuthorBlock } from '../author-block/AuthorBlock';
import { JuicyBlock } from '../juicy-block/JuicyBlock';
import styles from './../../MaingPage.module.css';

type ContentProps = {
    hasErrorFilter: boolean;
    hasError: boolean;
    shouldShowFilterResults: boolean;
    pageFilter: number;
    filterRecipes: RecipeType[];
    handleLoadMoreFilter: () => void;
    swiperData?: RecipeTypeResponse;
    juicyData?: RecipeTypeResponse;
    randomCategory?: Category;
    lastBlockData?: RecipeType[];
    meta?: PaginationMeta;
};

export const Content = ({
    hasErrorFilter,
    hasError,
    shouldShowFilterResults,
    swiperData,
    juicyData,
    randomCategory,
    lastBlockData,
    filterRecipes,
    pageFilter,
    meta,
    handleLoadMoreFilter,
}: ContentProps) => {
    const location = useLocation();
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [isErrorOpenFilter, setIsErrorOpenFilter] = useState(hasErrorFilter);
    const [isShowAlertSuccessDelete, setIsShowAlertSuccessDelete] = useState<boolean>(
        (location.state && location.state.showAlertDelete) || false,
    );
    const [isShowAlertSuccessDraft, setIsShowAlertSuccessDraft] = useState<boolean>(
        (location.state && location.state.showAlertDraft) || false,
    );

    useEffect(() => {
        setIsErrorOpenFilter(hasErrorFilter);
    }, [hasErrorFilter]);

    useEffect(() => {
        setIsErrorOpen(hasError);
    }, [hasError]);

    const renderMainContent = () => {
        if (isErrorOpen) {
            return <ErrorModal onClose={() => setIsErrorOpen(false)} />;
        }

        if (shouldShowFilterResults && !hasError) {
            return (
                <>
                    <Box px={{ base: 4, bp76: 0 }}>
                        <Heading className={styles.subtitle} as='h2'>
                            Новые рецепты
                        </Heading>
                        <SwipeSlider swipeData={swiperData?.data} />
                        <JuicyBlock juicyData={juicyData?.data} />
                        <AuthorBlock />
                        <Divider />
                        <LastBlock randomCategory={randomCategory} lastBlockData={lastBlockData} />
                    </Box>
                    {isErrorOpenFilter && (
                        <ErrorModal onClose={() => setIsErrorOpenFilter(false)} />
                    )}
                    {isShowAlertSuccessDelete && (
                        <AlertSuccess
                            onClose={() => setIsShowAlertSuccessDelete(false)}
                            message={SUCCESS_MESSAGE.SUCCESS_DELETE_RECIPE}
                            position='fixed'
                            left='50%'
                            transform='translateX(-50%)'
                        />
                    )}
                    {isShowAlertSuccessDraft && (
                        <AlertSuccess
                            onClose={() => setIsShowAlertSuccessDraft(false)}
                            message={SUCCESS_MESSAGE.SUCCESS_SAVE_DRAFT}
                            position='fixed'
                            left='50%'
                            transform='translateX(-50%)'
                        />
                    )}
                </>
            );
        }

        if (!hasError && filterRecipes && filterRecipes.length > 0) {
            return (
                <FilterSortBlock
                    filterSearchRecipes={filterRecipes}
                    page={pageFilter}
                    meta={meta}
                    onLoadMore={handleLoadMoreFilter}
                />
            );
        }
        return null;
    };

    return renderMainContent();
};

export const MainContentWithLoader = withLoader(Content);
