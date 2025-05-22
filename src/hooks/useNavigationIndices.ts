import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import {
    currentIndexSelector,
    indexNavigationButtonSelector,
} from '~/store/selectors/indexCategoriesSubcategoriesSliceSelector';
import { setIndexButton, setIndexTab } from '~/store/slice/indexCategoriesSubcategoriesSlice';

import { usePathCategoryData } from './usePathCategoryData';

export const useNavigationIndices = () => {
    const dispatch = useDispatch();

    const { category, subcategories } = useParams();

    const currentIndexButton = useSelector(indexNavigationButtonSelector);
    const currentIndex = useSelector(currentIndexSelector);

    const [indexCategory, setIndexCategory] = useState(0);
    const [indexSubcategory, setIndexSubcategory] = useState(0);

    const { keysPathCategory, valuesPathCategory } = usePathCategoryData();

    useEffect(() => {
        if (currentIndexButton === undefined) {
            const index = keysPathCategory.findIndex(([_, slug]) => slug === category);
            if (index !== -1) {
                setIndexCategory(index);
                dispatch(setIndexButton(index));
            }
        } else {
            setIndexCategory(currentIndexButton);
        }
    }, [category, currentIndexButton, dispatch, keysPathCategory]);

    useEffect(() => {
        if (currentIndex === undefined) {
            const valuesArray = valuesPathCategory[indexCategory];
            const index = valuesArray.findIndex((item) => item === subcategories);
            if (index !== -1) {
                setIndexSubcategory(index);
                dispatch(setIndexTab(index));
            }
        } else {
            setIndexSubcategory(currentIndex);
        }
    }, [currentIndex, dispatch, indexCategory, valuesPathCategory, subcategories]);

    return {
        indexCategory,
        indexSubcategory,
        category,
        subcategories,
        currentIndex,
    };
};
