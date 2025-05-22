import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getArrayCategorySelector } from '~/store/selectors/arrayCategorySelector';

export const useGetCountSubcategory = () => {
    const allCategory = useSelector(getArrayCategorySelector);
    const countSubcategory = useMemo(
        () => allCategory.filter((category) => !category.subCategories).length,
        [allCategory],
    );
    return { countSubcategory };
};
