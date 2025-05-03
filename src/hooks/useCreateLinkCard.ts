import { useNavigationIndices } from './useNavigationIndices';
import usePathCategoryData from './usePathCategoryData';

type useCreateLinkCardProps = {
    id: string;
};

export function useCreateLinkCard({ id }: useCreateLinkCardProps) {
    const { keysPathCategory, valuesPathCategory } = usePathCategoryData();
    const { indexCategory, indexSubcategory, subcategories } = useNavigationIndices();
    const secondLink = `/recipes/${keysPathCategory[indexCategory][1]}/${valuesPathCategory[indexCategory][indexSubcategory]}/${id}`;

    return { secondLink, subcategories };
}
