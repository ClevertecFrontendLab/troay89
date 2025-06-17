import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';

import { dataNavigation } from '~/data/dataNavigation';
import { useGetCategoriesQuery, useGetMeQuery } from '~/store/slice/api/api-slice';
import { setArrayCategory } from '~/store/slice/arrayCategory';
import { setUserProfile } from '~/store/slice/getInfoMe';

import { AccordionMenu } from './components/accordion/AccordionMenu';
import { RightAside } from './components/aside/RightAside';
import { FooterMobile } from './components/footer-mobile/FooterMobile';
import { FooterDesktop } from './components/footerDesktop/FooterDesktop';
import { Header } from './components/header/Header';
import styles from './Layout.module.css';

export const Layout = () => {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const dispatch = useDispatch();

    const { data, error, isLoading } = useGetCategoriesQuery();
    const { data: dataMe, isSuccess: isSuccessMe } = useGetMeQuery();

    const categories = !isLoading && !error && data && data.length ? data : dataNavigation;

    useEffect(() => {
        dispatch(setArrayCategory(categories));
    }, [categories, dispatch]);

    useEffect(() => {
        if (isSuccessMe) {
            dispatch(
                setUserProfile({
                    firstName: dataMe.firstName,
                    secondName: dataMe.lastName,
                    email: dataMe.email,
                    subscribers: dataMe.recipesIds.length,
                    likes: dataMe.likes,
                    bookmarks: dataMe.bookmarks,
                }),
            );
        }
    });

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
};
