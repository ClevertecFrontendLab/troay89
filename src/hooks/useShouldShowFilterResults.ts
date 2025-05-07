import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { getArrayCategorySelector } from '~/store/selectors/arrayCategorySelector';
import {
    allergenFilterSelector,
    listCategorySelector,
    listTypeDishesSelector,
    listTypeMeatsSelector,
    resultSearchSelector,
} from '~/store/selectors/arrayResultFilterSelector';
import { indexNavigationButtonSelector } from '~/store/selectors/indexNavigationButtonSelector';
import { useGetRecipesQuery } from '~/store/slice/app-slice';
import {
    setFetchingFilterRecipes,
    setShouldShowFilterResults,
} from '~/store/slice/overlayPosition';
import RecipeType from '~/type/RecipeType';

function useShouldShowFilterResults(limit: number = 8) {
    const { category } = useParams();
    const filterAllergen = useSelector(allergenFilterSelector);
    const listCategory = useSelector(listCategorySelector);
    const listTypeMeats = useSelector(listTypeMeatsSelector);
    const listTypeDishes = useSelector(listTypeDishesSelector);
    const indexActiveCategory = useSelector(indexNavigationButtonSelector);
    const resultSearch = useSelector(resultSearchSelector);
    const [pageFilter, setPageFilter] = useState(1);
    const [filterRecipes, setFilterRecipes] = useState<RecipeType[]>([]);

    const categories = useSelector(getArrayCategorySelector);
    const categoriesFilter = categories.filter((category) => !category.rootCategoryId);
    const categoryFilter = categoriesFilter.filter((category) =>
        listCategory.includes(category.title),
    );
    const subcategoriesIds =
        category && indexActiveCategory
            ? categoriesFilter[indexActiveCategory].subCategories
                  ?.map((subcategory) => subcategory._id)
                  .flat()
                  .join(',')
            : categoryFilter
                  .map((category) => category.subCategories?.map((subcategory) => subcategory._id))
                  .flat()
                  .join(',');
    const stringTypeMeats = listTypeMeats.join(',');
    const stringTypeDishes = listTypeDishes.join(',');
    const stringFilterAllergen = filterAllergen.join(',');

    const {
        data: dataFilterRecipes,
        isError: isErrorFilterRecipes,
        isLoading: isLoadingFilterRecipes,
        isFetching: isFetchingFilterRecipes,
    } = useGetRecipesQuery(
        {
            page: pageFilter,
            limit: limit,
            meat: stringTypeMeats,
            garnish: stringTypeDishes,
            allergens: stringFilterAllergen,
            subcategoriesIds: subcategoriesIds,
            searchString: resultSearch,
        },
        {
            skip: !(
                stringTypeMeats ||
                stringTypeDishes ||
                stringFilterAllergen ||
                stringFilterAllergen ||
                subcategoriesIds ||
                resultSearch
            ),
        },
    );

    useEffect(() => {
        setPageFilter(1);
    }, [stringTypeMeats, stringTypeDishes, stringFilterAllergen, subcategoriesIds, resultSearch]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setFetchingFilterRecipes(isFetchingFilterRecipes));
    }, [isFetchingFilterRecipes, dispatch]);

    useEffect(() => {
        if (dataFilterRecipes) {
            if (pageFilter === 1) {
                setFilterRecipes(dataFilterRecipes.data);
            } else {
                setFilterRecipes((prev) => [...prev, ...dataFilterRecipes.data]);
            }
        }
    }, [dataFilterRecipes]);

    const handleLoadMoreFilter = () => {
        setPageFilter((prev) => prev + 1);
    };

    const filtersActive =
        filterAllergen.length > 0 ||
        listCategory.length > 0 ||
        listTypeMeats.length > 0 ||
        resultSearch.length > 2 ||
        listTypeDishes.length > 0;
    const shouldShowFilterResults = !(
        filtersActive &&
        dataFilterRecipes &&
        dataFilterRecipes.data &&
        dataFilterRecipes.data?.length > 0
    );

    useEffect(() => {
        dispatch(setShouldShowFilterResults(shouldShowFilterResults));
    }, [dispatch, shouldShowFilterResults]);
    return {
        shouldShowFilterResults,
        filterRecipes,
        isErrorFilterRecipes,
        isLoadingFilterRecipes,
        isFetchingFilterRecipes,
        pageFilter,
        dataFilterRecipes,
        handleLoadMoreFilter,
    };
}

export default useShouldShowFilterResults;
