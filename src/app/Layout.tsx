import { Grid, GridItem } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import styles from './Layout.module.css';

type LayoutProps = PropsWithChildren;

function Layout({ children }: LayoutProps) {
    return (
        <Grid className={styles.mainContainer}>
            <GridItem className={styles.header} as='header'>
                Header
            </GridItem>
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
