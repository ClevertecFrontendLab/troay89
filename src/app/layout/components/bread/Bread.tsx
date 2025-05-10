import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router';

import BreadIcon from '~/components/icons/BreadIcon';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { useNavigationIndices } from '~/hooks/useNavigationIndices';
import { getArrayCategorySelector } from '~/store/selectors/arrayCategorySelector';
import { nameRecipeSelector } from '~/store/selectors/indexCategoriesSubcategoriesSliceSelector';
import { setIndexTab } from '~/store/slice/indexCategoriesSubcategoriesSlice';

import styles from './Bread.module.css';
import { getBreadcrumbs } from './Breadcrumbs';

type BreadProps = Partial<{
    isMobile: boolean;
    onClose: () => void;
}>;

export const Bread = ({ isMobile, onClose }: BreadProps) => {
    const dispatch = useDispatch();
    const { indexCategory, indexSubcategory } = useNavigationIndices();
    const location = useLocation();
    const titleRecipe = useSelector(nameRecipeSelector);
    const categories = useSelector(getArrayCategorySelector);

    const categoriesFilter = useMemo(
        () => categories.filter((category) => Boolean(category.subCategories)),
        [categories],
    );

    const activeCategory = categoriesFilter[indexCategory];
    const titleCategory = activeCategory.title;
    const titleSubcategory = activeCategory?.subCategories?.[indexSubcategory].title;
    const pathCategory = activeCategory.category;
    const pathSubcategory = activeCategory?.subCategories?.[indexSubcategory].category;
    const pathFirstSubcategory = activeCategory?.subCategories?.[0]?.category;

    const handleCrumbLink = () => {
        dispatch(setIndexTab(0));
    };

    const handleClick = (crumbOnClick?: () => void) => {
        if (crumbOnClick) crumbOnClick();
        if (onClose) onClose();
    };

    const breadcrumbs = getBreadcrumbs(
        location.pathname,
        titleCategory,
        pathCategory,
        handleCrumbLink,
        titleRecipe,
        titleSubcategory,
        pathSubcategory,
        pathFirstSubcategory,
    );

    return (
        <Breadcrumb
            className={`${styles.breadcrumb} ${isMobile && styles.mobile}`}
            separator={<BreadIcon boxSize={6} />}
            data-test-id={DATA_TEST_ID.BREADCRUMBS}
        >
            {breadcrumbs.map((crumb, index) => (
                <BreadcrumbItem
                    className={styles.breadcrumb_item}
                    key={index}
                    isCurrentPage={index === breadcrumbs.length - 1}
                >
                    {index === breadcrumbs.length - 1 ? (
                        <span
                            className={`${styles.breadcrumb_text} ${index === breadcrumbs.length - 1 && styles.current_page}`}
                        >
                            {crumb.title}
                        </span>
                    ) : (
                        <BreadcrumbLink
                            className={styles.breadcrumb_link}
                            as={Link}
                            to={crumb.link}
                            onClick={() => handleClick(crumb.onClick)}
                        >
                            {crumb.title}
                        </BreadcrumbLink>
                    )}
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};
