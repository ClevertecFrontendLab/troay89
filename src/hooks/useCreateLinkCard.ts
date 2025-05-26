import { useNavigationIndices } from './useNavigationIndices';
import { usePathCategoryData } from './usePathCategoryData';

type useCreateLinkCardProps = {
    id: string;
};

export const useCreateLinkCard = ({ id }: useCreateLinkCardProps) => {
    const { keysPathCategory, valuesPathCategory } = usePathCategoryData();
    const { indexCategory, indexSubcategory, subcategories } = useNavigationIndices();
    const categoryFilter = valuesPathCategory.filter(
        (category) => category.rootCategoryId === keysPathCategory[indexCategory]._id,
    );
    const secondLink = `/recipes/${keysPathCategory[indexCategory].category}/${categoryFilter[indexSubcategory].category}/${id}`;
    return { secondLink, subcategories };
};
