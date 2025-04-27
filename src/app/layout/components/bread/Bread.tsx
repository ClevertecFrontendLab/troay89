import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router';

import BreadIcon from '~/components/icons/BreadIcon';
import dataNavigation from '~/data/dataNavigation';
import dataRecipes from '~/data/dataRecipes';
import { useNavigationIndices } from '~/hooks/useNavigationIndices';
import usePathCategoryData from '~/hooks/usePathCategoryData';
import { setIndexTab } from '~/store/slice/indexTabsSlice';

import styles from './Bread.module.css';
import { getBreadcrumbs } from './Breadcrumbs';

type BreadProps = Partial<{
    isMobile: boolean;
    onClose: () => void;
}>;

function Bread({ isMobile, onClose }: BreadProps) {
    const dispatch = useDispatch();
    const { indexCategory, indexSubcategory, idRecipe } = useNavigationIndices();
    const { keysPathCategory, valuesPathCategory } = usePathCategoryData();
    const location = useLocation();
    const category = Object.keys(dataNavigation)[indexCategory];
    const subcategory = dataNavigation[category][indexSubcategory];
    const titleRecipe = dataRecipes.find((recipe) => recipe.id === idRecipe)?.title;
    const pathCategory = keysPathCategory[indexCategory][1];
    const pathSubcategory = valuesPathCategory[indexCategory][indexSubcategory];
    const pathFirstSubcategory = valuesPathCategory[indexCategory][0];

    const handleCrumbLink = () => {
        dispatch(setIndexTab(0));
    };

    const breadcrumbs = getBreadcrumbs(
        location.pathname,
        category,
        subcategory,
        titleRecipe,
        pathCategory,
        pathSubcategory,
        pathFirstSubcategory,
        handleCrumbLink,
    );

    return (
        <Breadcrumb
            className={`${styles.breadcrumb} ${isMobile && styles.mobile}`}
            separator={<BreadIcon boxSize={6} />}
            data-test-id='breadcrumbs'
        >
            {breadcrumbs &&
                breadcrumbs.map((crumb, index) => (
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
                                onClick={() => {
                                    crumb.onClick && crumb.onClick();
                                    onClose && onClose();
                                }}
                            >
                                {crumb.title}
                            </BreadcrumbLink>
                        )}
                    </BreadcrumbItem>
                ))}
        </Breadcrumb>
    );
}

export default Bread;
