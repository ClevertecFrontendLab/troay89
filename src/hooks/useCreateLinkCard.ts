import dataRecipes from '~/data/dataRecipes';

import { useNavigationIndices } from './useNavigationIndices';
import usePathCategoryData from './usePathCategoryData';

type useCreateLinkCardProps = {
    id: string;
};

export function useCreateLinkCard({ id }: useCreateLinkCardProps) {
    const { keysPathCategory, valuesPathCategory } = usePathCategoryData();
    const { indexCategory, indexSubcategory, subcategories, id: pathId } = useNavigationIndices();
    const recipe = dataRecipes.find((recipe) => recipe.id === id);
    const category = recipe?.category[0];
    const subcategory = recipe?.subcategory[0];
    const indexCat = keysPathCategory.findIndex(([_, slug]) => slug === category);
    const indexSubCat = valuesPathCategory[indexCat].findIndex((item) => item === subcategory);

    const firstLink = `/recipes/${category}/${subcategory}/${id}`;
    const secondLink = `/recipes/${keysPathCategory[indexCategory][1]}/${valuesPathCategory[indexCategory][indexSubcategory]}/${id}`;

    return { indexSubCat, firstLink, indexCat, secondLink, subcategories, pathId };
}
