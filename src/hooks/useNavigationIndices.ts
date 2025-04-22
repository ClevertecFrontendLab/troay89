import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import dataRecipes from '~/data/dataRecipes';
import { ApplicationState } from '~/store/configure-store';
import { setIndexButton } from '~/store/slice/indexNavigationButtonSlice';
import { setIndexTab } from '~/store/slice/indexTabsSlice';
import RecipeType from '~/type/RecipeType';

import usePathCategoryData from './usePathCategoryData';

export function useNavigationIndices() {
    const dispatch = useDispatch();

    const { category, subcategories, id } = useParams();

    const currentIndexButton = useSelector(
        (state: ApplicationState) => state.indexNavigationButton.index,
    );
    const currentIndex = useSelector((state: ApplicationState) => state.indexTabs.index);
    const idRecipe = useSelector((state: ApplicationState) => state.indexTabs.idRecipe);

    const [indexCategory, setIndexCategory] = useState(0);
    const [indexSubcategory, setIndexSubcategory] = useState(0);
    const [recipe, setRecipe] = useState<RecipeType>();

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

    useEffect(() => {
        if (idRecipe !== undefined) {
            setRecipe(dataRecipes[+idRecipe]);
        } else if (id !== undefined) {
            setRecipe(dataRecipes[+id]);
        }
    }, [idRecipe]);

    return {
        indexCategory,
        indexSubcategory,
        category,
        subcategories,
        currentIndex,
        currentIndexButton,
        idRecipe,
        recipe,
        id,
    };
}
