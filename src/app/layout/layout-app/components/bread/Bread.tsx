import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router';

import BreadIcon from '~/components/icons/BreadIcon';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { useNavigationIndices } from '~/hooks/useNavigationIndices';
import { usePathCategoryData } from '~/hooks/usePathCategoryData';
import { nameRecipeSelector } from '~/store/selectors/indexCategoriesSubcategoriesSliceSelector';
import { getSaveUsername } from '~/store/selectors/saveUsernameSelector';
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
    const { keysPathCategory } = usePathCategoryData();

    const activeCategory = keysPathCategory[indexCategory];
    const titleCategory = activeCategory.title;
    const titleSubcategory = activeCategory?.subCategories?.[indexSubcategory].title;
    const pathCategory = activeCategory.category;
    const pathSubcategory = activeCategory?.subCategories?.[indexSubcategory].category;
    const pathFirstSubcategory = activeCategory?.subCategories?.[0]?.category;
    const userName = useSelector(getSaveUsername);

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
        userName,
        titleSubcategory,
        pathSubcategory,
        pathFirstSubcategory,
    );

    return (
        <Breadcrumb
            className={classNames(styles.breadcrumb, { [styles.mobile]: isMobile })}
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
                            className={classNames(styles.breadcrumb_text, {
                                [styles.current_page]: index === breadcrumbs.length - 1,
                            })}
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
