import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';

import dataNavigation from '~/data/dataNavigation';
import { useGetCategoriesQuery } from '~/store/slice/app-slice';
import { setArrayCategory } from '~/store/slice/arrayCategory';

import AccordionMenu from './components/accordion/AccordionMenu';
import RightAside from './components/aside/RightAside';
import FooterMobile from './components/footer-mobile/FooterMobile';
import FooterDesktop from './components/footerDesktop/FooterDesktop';
import Header from './components/header/Header';
import styles from './Layout.module.css';

function Layout() {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const dispatch = useDispatch();

    const { data, error, isLoading } = useGetCategoriesQuery();

    useEffect(() => {
        if (isLoading || error) {
            dispatch(setArrayCategory(dataNavigation));
        } else if (isLoading === false && error === undefined && data !== undefined) {
            dispatch(setArrayCategory(data));
        }
    }, [data, dispatch, error, isLoading]);

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
