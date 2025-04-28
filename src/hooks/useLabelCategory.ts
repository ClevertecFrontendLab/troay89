import { useEffect, useState } from 'react';

import dataPathCategory from '~/data/dataPathCategory';

type useLabelCategoryTypes = {
    categories: string[];
};

function useLabelCategory({ categories }: useLabelCategoryTypes) {
    const [arrayCategory, setArrayCategory] = useState<string[]>([]);

    useEffect(() => {
        const category = Array.from(dataPathCategory.keys());
        const array = category
            .map(([rus, eng]) => (categories.includes(eng) ? rus : null))
            .filter((item) => item !== null);
        setArrayCategory(array);
    }, [categories]);

    return { arrayCategory };
}

export default useLabelCategory;
