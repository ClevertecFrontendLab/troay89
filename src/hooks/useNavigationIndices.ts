import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import dataPathCategory from '~/data/dataPathCategory';
import { ApplicationState } from '~/store/configure-store';
import { setIndexButton } from '~/store/slice/indexNavigationButtonSlice';
import { setIndexTab } from '~/store/slice/indexTabsSlice';

export function useNavigationIndices() {
    const dispatch = useDispatch();
    const { category, subcategories } = useParams();
    const currentIndex = useSelector((state: ApplicationState) => state.indexTabs.index);
    const currentIndexButton = useSelector(
        (state: ApplicationState) => state.indexNavigationButton.index,
    );
    const [indexCategory, setIndexCategory] = useState(0);
    const [indexSubcategory, setIndexSubcategory] = useState(0);

    useEffect(() => {
        if (currentIndexButton === undefined) {
            const keysArray = Array.from(dataPathCategory.keys());
            const index = keysArray.findIndex(([_, slug]) => slug === category);
            if (index !== -1) {
                setIndexCategory(index);
                dispatch(setIndexButton(index));
            }
        } else {
            setIndexCategory(currentIndexButton);
        }
    }, [category, currentIndexButton, dispatch]);

    useEffect(() => {
        if (currentIndex === undefined) {
            const valuesArray = Array.from(dataPathCategory.values())[indexCategory];
            const index = valuesArray.findIndex((item) => item === subcategories);
            if (index !== -1) {
                setIndexSubcategory(index);
                dispatch(setIndexTab(index));
            }
        } else {
            setIndexSubcategory(currentIndex);
        }
    }, [currentIndex, dispatch, indexCategory, subcategories]);

    return {
        indexCategory,
        indexSubcategory,
        category,
        subcategories,
        currentIndex,
        currentIndexButton,
    };
}
