import { useMemo } from 'react';

import { dataPathCategory } from '~/data/dataPathCategory';

export const usePathCategoryData = () => {
    const keysPathCategory = useMemo(() => Array.from(dataPathCategory.keys()), []);
    const valuesPathCategory = useMemo(() => Array.from(dataPathCategory.values()), []);
    return { keysPathCategory, valuesPathCategory };
};
