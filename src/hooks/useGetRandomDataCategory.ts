import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getArrayCategorySelector } from '~/store/selectors/arrayCategorySelector';
import { useGetRecipeByCategoryQuery } from '~/store/slice/app-slice';

export function useGetRandomDataCategory(randomNumber: number) {
    const category = useSelector(getArrayCategorySelector);

    const categoriesFilter = useMemo(() => category.filter((cat) => cat.subCategories), [category]);
    const subcategoriesFilter = useMemo(
        () => category.filter((cat) => !cat.subCategories),
        [category],
    );

    const randomSubcategory = useMemo(() => {
        if (subcategoriesFilter.length !== 0) {
            return subcategoriesFilter[randomNumber];
        }
    }, [subcategoriesFilter, randomNumber]);

    const randomCategory = useMemo(
        () =>
            categoriesFilter.find((category) => category._id === randomSubcategory?.rootCategoryId),
        [categoriesFilter, randomSubcategory?.rootCategoryId],
    );

    const {
        data: lastBlockData,
        isLoading: isLastBlockLoading,
        isError: isErrorLastBlock,
        isFetching: isLastBlockFetching,
    } = useGetRecipeByCategoryQuery({
        limit: 5,
        id: randomSubcategory ? randomSubcategory._id : '67c4a0eced67ca980917d67e',
    });

    return {
        randomCategory,
        lastBlockData,
        isLastBlockLoading,
        isLastBlockFetching,
        isErrorLastBlock,
    };
}
