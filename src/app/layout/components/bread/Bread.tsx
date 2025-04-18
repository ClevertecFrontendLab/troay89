import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router';

import BreadIcon from '~/components/icons/BreadIcon';
import dataNavigation from '~/data/dataNavigation';
import dataPathCategory from '~/data/dataPathCategory';
import { useNavigationIndices } from '~/hooks/useNavigationIndices';
import { setIndexButton } from '~/store/slice/indexNavigationButtonSlice';
import { setIndexTab } from '~/store/slice/indexTabsSlice';

import styles from './Bread.module.css';

type BreadProps = {
    isMobile?: boolean;
};

function Bread({ isMobile }: BreadProps) {
    const dispatch = useDispatch();
    const { indexCategory, indexSubcategory } = useNavigationIndices();
    const location = useLocation();
    const category = Object.keys(dataNavigation)[indexCategory];
    const subcategory = dataNavigation[category][indexSubcategory];
    const pathCategory = Array.from(dataPathCategory.keys())[indexCategory][1];
    const pathSubcategory = Array.from(dataPathCategory.values())[indexCategory][0];
    let breadcrumbs;

    switch (location.pathname) {
        case '/':
            breadcrumbs = [{ title: 'Главная', link: '/' }];
            break;
        case '/juicy':
            breadcrumbs = [{ title: 'Главная', link: '/' }, { title: 'Самое сочное' }];
            break;
        default:
            breadcrumbs = [
                { title: 'Главная', link: '/' },
                { title: category, link: `/recipes/${pathCategory}/${pathSubcategory}` },
                { title: subcategory },
            ];
            break;
    }

    const handleCrumbLink = () => {
        dispatch(setIndexTab(0));
        dispatch(setIndexButton(undefined));
    };

    return (
        <Breadcrumb
            className={`${styles.breadcrumb} ${isMobile && styles.mobile}`}
            separator={<BreadIcon boxSize={6} />}
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
                            onClick={handleCrumbLink}
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
