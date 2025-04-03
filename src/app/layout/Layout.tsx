import { Grid, GridItem } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import AccordionMenu from './components/accordion/AccordionMenu';
import FooterDesktop from './components/footerDesktop/FooterDesktop';
import Header from './components/header/Header';
import styles from './Layout.module.css';

type LayoutProps = PropsWithChildren;

function Layout({ children }: LayoutProps) {
    return (
        <Grid className={styles['main_container']}>
            <Header />
            <GridItem className={styles.navigation} as='aside'>
                <AccordionMenu />
                <FooterDesktop />
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
