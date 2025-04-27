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

type BreadProps = {
    isMobile?: boolean;
    onClose?: () => void;
};

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

    let breadcrumbs;

    const handleCrumbLink = () => {
        dispatch(setIndexTab(0));
    };

    if (location.pathname === '/') {
        breadcrumbs = [{ title: 'Главная', link: '/' }];
    } else if (location.pathname === '/the-juiciest') {
        breadcrumbs = [{ title: 'Главная', link: '/' }, { title: 'Самое сочное' }];
    } else if (location.pathname.startsWith('/recipes')) {
        const pathParts = location.pathname.split('/').filter(Boolean);

        if (pathParts.length === 3) {
            breadcrumbs = [
                { title: 'Главная', link: '/' },
                {
                    title: category,
                    link: `/recipes/${pathCategory}/${pathFirstSubcategory}`,
                    onClick: handleCrumbLink,
                },
                { title: subcategory },
            ];
        } else if (pathParts.length === 4) {
            breadcrumbs = [
                { title: 'Главная', link: '/' },
                {
                    title: category,
                    link: `/recipes/${pathCategory}/${pathFirstSubcategory}`,
                    onClick: handleCrumbLink,
                },
                { title: subcategory, link: `/recipes/${pathCategory}/${pathSubcategory}` },
                { title: titleRecipe },
            ];
        }
    }

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
