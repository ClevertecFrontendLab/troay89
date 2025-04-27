import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import dataRecipes from '~/data/dataRecipes';
import {
    allergenFilterSelector,
    listCategorySelector,
    listTypeDishesSelector,
    listTypeMeatsSelector,
    resultSearchSelector,
} from '~/store/selectors/arrayResultFilterSelector';
import RecipeType from '~/type/RecipeType';

function useShouldShowFilterResults() {
    const filterAllergen = useSelector(allergenFilterSelector);
    const listCategory = useSelector(listCategorySelector);
    const listTypeMeats = useSelector(listTypeMeatsSelector);
    const listTypeDishes = useSelector(listTypeDishesSelector);
    const resultSearch = useSelector(resultSearchSelector);

    const recipesFilter: RecipeType[] = useMemo(
        () =>
            dataRecipes
                .filter((recipe) => {
                    const passesAllergen =
                        filterAllergen.length === 0 ||
                        !filterAllergen.some((filterStr) => {
                            const firstWord = filterStr.trim().split(/\s+/)[0];
                            return recipe.ingredients.some((ingredient) =>
                                ingredient.title.toLowerCase().includes(firstWord.toLowerCase()),
                            );
                        });

                    const passesCategory =
                        listCategory.length === 0 ||
                        listCategory.some((catFilter) => recipe.category.includes(catFilter));

                    const passesMeat =
                        listTypeMeats.length === 0 || listTypeMeats.includes(recipe.meat);

                    const passesSide =
                        listTypeDishes.length === 0 || listTypeDishes.includes(recipe.side);

                    const passesSearch =
                        resultSearch.length < 3 ||
                        recipe.title
                            .toLowerCase()
                            .split(/\s+/)
                            .some((word) => word.startsWith(resultSearch.toLowerCase()));
                    return (
                        passesAllergen && passesCategory && passesMeat && passesSide && passesSearch
                    );
                })
                .slice(0, 8),
        [filterAllergen, listCategory, listTypeMeats, listTypeDishes, resultSearch],
    );

    const filtersActive =
        filterAllergen.length > 0 ||
        listCategory.length > 0 ||
        listTypeMeats.length > 0 ||
        resultSearch.length > 2 ||
        listTypeDishes.length > 0;
    const shouldShowFilterResults = !(filtersActive && recipesFilter?.length > 0);
    return { shouldShowFilterResults, recipesFilter };
}

export default useShouldShowFilterResults;
