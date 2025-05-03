import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getArrayCategorySelector } from '~/store/selectors/arrayCategorySelector';
import { useGetRecipesQuery } from '~/store/slice/app-slice';

export function useGetRandomDataCategory(randomNumber: number) {
    const category = useSelector(getArrayCategorySelector);
    const categoriesFilter = useMemo(
        () => category.filter((cat) => cat.subCategories !== undefined),
        [category],
    );

    const randomCategory = useMemo(() => {
        if (categoriesFilter.length === 0) return null;
        return categoriesFilter[randomNumber];
    }, [categoriesFilter, randomNumber]);

    const subcategoriesIds = useMemo(() => {
        if (randomCategory?.subCategories) {
            return randomCategory.subCategories.map((sub) => sub._id).join(',');
        }
        return null;
    }, [randomCategory]);

    const {
        data: lastBlockData,
        isLoading: isLastBlockLoading,
        error: errorLastBlock,
        isFetching: isLastBlockFetching,
    } = useGetRecipesQuery(
        { limit: 5, subcategoriesIds: subcategoriesIds! },
        { skip: !subcategoriesIds },
    );

    return {
        randomCategory,
        lastBlockData,
        isLastBlockLoading,
        isLastBlockFetching,
        errorLastBlock,
    };
}
