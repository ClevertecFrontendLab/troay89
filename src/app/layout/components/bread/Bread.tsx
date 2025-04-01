import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

import styles from './Bread.module.css';

function Bread() {
    return (
        <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink className={styles['bread-crumb']} href='#'>
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    );
}

export default Bread;
