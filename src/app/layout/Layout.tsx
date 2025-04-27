import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import AccordionMenu from './components/accordion/AccordionMenu';
import RightAside from './components/aside/RightAside';
import FooterMobile from './components/footer-mobile/FooterMobile';
import FooterDesktop from './components/footerDesktop/FooterDesktop';
import Header from './components/header/Header';
import styles from './Layout.module.css';

function Layout() {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    return (
        <Grid className={styles.main_container}>
            <Header />
            {isDesktop && (
                <GridItem className={styles.navigation} as='aside'>
                    <AccordionMenu />
                    <FooterDesktop />
                </GridItem>
            )}
            <GridItem className={styles.main} as='main'>
                <Outlet />
            </GridItem>
            {isDesktop && <RightAside />}
            <FooterMobile />
        </Grid>
    );
}

export default Layout;
