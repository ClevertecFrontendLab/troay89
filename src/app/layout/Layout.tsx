import { Grid, GridItem } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import AccordionMenu from './components/accordion/AccordionMenu';
import RightAside from './components/aside/RightAside';
import FooterMobile from './components/footer-mobile/FooterMobile';
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
            <RightAside />
            <GridItem className={styles.footer} as='footer'>
                <FooterMobile />
            </GridItem>
        </Grid>
    );
}

export default Layout;
