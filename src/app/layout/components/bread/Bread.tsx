import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

import styles from './Bread.module.css';

function Bread() {
    return (
        <Breadcrumb className={styles.breadcrumb}>
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink className={styles['breadcrumb_link']} href='#'>
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    );
}

export default Bread;
