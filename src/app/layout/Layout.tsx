import { Grid, GridItem } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import Header from './components/header/Header';
import styles from './Layout.module.css';

type LayoutProps = PropsWithChildren;

function Layout({ children }: LayoutProps) {
    return (
        <Grid className={styles['main-container']}>
            <Header />
            <GridItem className={styles.navigation} as='nav'>
                Nav
            </GridItem>
            <GridItem className={styles.main} as='main'>
                {children}
            </GridItem>
            <GridItem className={styles.aside} as='aside'>
                Right Sidebar
            </GridItem>
            <GridItem className={styles.footer} as='footer'>
                Footer
            </GridItem>
        </Grid>
    );
}

export default Layout;
