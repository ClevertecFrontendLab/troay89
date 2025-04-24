import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import dataRecipes from '~/data/dataRecipes';
import { ApplicationState } from '~/store/configure-store';

function useShouldShowFilterResults() {
    const filterAllergen = useSelector(
        (state: ApplicationState) => state.arrayResultFilter.resultFilter,
    );
    const recipesFilter = useMemo(() => {
        if (!filterAllergen || filterAllergen.length === 0) {
            return [];
        }
        return dataRecipes
            .filter(
                (recipe) =>
                    !filterAllergen.some((filterStr) => {
                        const firstWord = filterStr.trim().split(/\s+/)[0];
                        return recipe.ingredients.some((ingredient) =>
                            ingredient.title.toLowerCase().includes(firstWord.toLowerCase()),
                        );
                    }),
            )
            .slice(0, 8);
    }, [filterAllergen]);

    const shouldShowFilterResults = !(filterAllergen?.length > 0 && recipesFilter?.length > 0);
    return { shouldShowFilterResults, recipesFilter };
}

export default useShouldShowFilterResults;
