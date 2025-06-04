import { useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Toolbar from '~/components/toolbar/Toolbar';
import { useGetCountSubcategory } from '~/hooks/useGetCountSubcategory';
import { useGetRandomDataCategory } from '~/hooks/useGetRandomDataCategory';
import { useShouldShowFilterResults } from '~/hooks/useShouldShowFilterResults';
import { overlayPositionSelector } from '~/store/selectors/overlayPositionSelector';
import { useGetBloggersQuery, useGetRecipesQuery } from '~/store/slice/api/api-slice';

import { MainContentWithLoader } from './components/content/content';

export const MainPage = () => {
    const {
        shouldShowFilterResults,
        filterRecipes,
        isErrorFilterRecipes,
        isFetchingFilterRecipes,
        pageFilter,
        dataFilterRecipes,
        handleLoadMoreFilter,
    } = useShouldShowFilterResults();
    const shouldShowOverlay = useSelector(overlayPositionSelector);
    const [randomNumber, setRandomNumber] = useState(0);
    const { countSubcategory } = useGetCountSubcategory();
    const [isDesktop] = useMediaQuery('(min-width: 1200px)');
    const {
        data: juicyData,
        isError: isJuiceError,
        isFetching: isJuiceFetching,
    } = useGetRecipesQuery({ limit: 4, sortBy: 'likes', sortOrder: 'desc' });
    const {
        data: swiperData,
        isError: isSwiperError,
        isFetching: isSwiperFetching,
    } = useGetRecipesQuery({ limit: 10, sortBy: 'createdAt', sortOrder: 'desc' });
    const { randomCategory, lastBlockData, isLastBlockFetching, isErrorLastBlock } =
        useGetRandomDataCategory(randomNumber);

    const {
        data: getAllBloggers,
        isLoading: isGetAllBloggers,
        isError: isGetAllBloggersError,
    } = useGetBloggersQuery({ limit: '3' });

    const isPending =
        (isJuiceFetching ||
            isSwiperFetching ||
            isLastBlockFetching ||
            isFetchingFilterRecipes ||
            isGetAllBloggers) &&
        shouldShowOverlay;

    const hasError = isJuiceError || isSwiperError || isErrorLastBlock;
    const hasErrorFilter = isErrorFilterRecipes;

    useEffect(() => {
        setRandomNumber(Math.floor(Math.random() * countSubcategory - 1));
    }, [countSubcategory]);

    return (
        <>
            <Toolbar
                title='Приятного аппетита!'
                isExtraSpace
                dateTestSwitch={isDesktop ? 'allergens-switcher' : ''}
                dataTestMenu={isDesktop ? 'allergens-menu-button' : ''}
            />
            <MainContentWithLoader
                isLoading={isPending}
                hasErrorFilter={hasErrorFilter}
                hasError={hasError}
                shouldShowFilterResults={shouldShowFilterResults}
                swiperData={swiperData}
                juicyData={juicyData}
                getAllBloggers={getAllBloggers}
                isGetAllBloggersError={isGetAllBloggersError}
                randomCategory={randomCategory}
                lastBlockData={lastBlockData?.data}
                filterRecipes={filterRecipes}
                pageFilter={pageFilter}
                meta={dataFilterRecipes?.meta}
                handleLoadMoreFilter={handleLoadMoreFilter}
            />
        </>
    );
};
