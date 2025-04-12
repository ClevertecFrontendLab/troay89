import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useLocation } from 'react-router';

import BreadIcon from '~/components/icons/BreadIcon';

import styles from './Bread.module.css';

function Bread() {
    const location = useLocation();

    const breadcrumbMap: Record<string, string[]> = {
        '/': ['Главная'],
        '/vegan': ['Главная', 'Веганская кухня', 'Вторые блюда'],
        '/juicy': ['Главная', 'Самое сочное'],
    };

    const breadcrumbs = breadcrumbMap[location.pathname] || ['Главная'];

    return (
        <Breadcrumb className={styles.breadcrumb} separator={<BreadIcon boxSize={6} />}>
            {breadcrumbs.map((crumb, index) => (
                <BreadcrumbItem
                    className={styles['breadcrumb_item']}
                    key={index}
                    isCurrentPage={index === breadcrumbs.length - 1}
                >
                    {index === breadcrumbs.length - 1 ||
                    (breadcrumbs.length != 2 && index === breadcrumbs.length - 2) ? (
                        <span
                            className={`${styles.breadcrumb_text} ${index === breadcrumbs.length - 1 && styles.current_page}`}
                        >
                            {crumb}
                        </span>
                    ) : (
                        <BreadcrumbLink className={styles['breadcrumb_link']} href='/'>
                            {crumb}
                        </BreadcrumbLink>
                    )}
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
}

export default Bread;
