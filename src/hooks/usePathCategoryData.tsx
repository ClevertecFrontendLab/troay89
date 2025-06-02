import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getArrayCategorySelector } from '~/store/selectors/arrayCategorySelector';

export const usePathCategoryData = () => {
    const categories = useSelector(getArrayCategorySelector);
    const keysPathCategory = useMemo(
        () => categories.filter((cat) => Boolean(cat.subCategories)),
        [categories],
    );
    const valuesPathCategory = useMemo(
        () => categories.filter((cat) => Boolean(!cat.subCategories)),
        [categories],
    );
    return { keysPathCategory, valuesPathCategory };
};
