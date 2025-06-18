import { usePathCategoryData } from './usePathCategoryData';

export const useBuildLinkRecipe = (categoriesIds: string[]) => {
    const { keysPathCategory, valuesPathCategory } = usePathCategoryData();
    const currentSubcategory = valuesPathCategory.find((subcategories) =>
        categoriesIds.includes(subcategories._id),
    );
    const currentCategory = keysPathCategory.find(
        (category) => category._id === currentSubcategory?.rootCategoryId,
    );

    return { currentSubcategory, currentCategory };
};
