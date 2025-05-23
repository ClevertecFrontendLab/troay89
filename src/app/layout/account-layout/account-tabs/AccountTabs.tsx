import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import { LoginPage } from '~/app/pages/login-page/LoginPage';
import { RegistrationLoginPasswordPage } from '~/app/pages/registration-login-password-page/RegistrationLoginPasswordPage';
import { RegistrationNameEmailPage } from '~/app/pages/registration-name-email-page/RegistrationNameEmailPage';

import styles from './AccountTabs.module.css';

export const AccountTabs = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const tabIndex = location.pathname.includes('login') ? 0 : 1;

    const handleTabsChange = (index: number) => {
        const path = index === 0 ? '/account/login' : '/account/registration';
        navigate(path);
    };

    const curentPage = location.pathname.endsWith('finish-registration') ? (
        <RegistrationLoginPasswordPage />
    ) : (
        <RegistrationNameEmailPage />
    );

    return (
        <Box maxW={{ base: '328px', bp76: '355px', bp115: '451px', bp160: '461px' }} mx='auto'>
            <Tabs
                className={styles.tabs}
                index={tabIndex}
                onChange={handleTabsChange}
                isLazy
                lazyBehavior='unmount'
                variant='unstyled'
            >
                <TabList
                    borderBottom='2px solid'
                    borderColor='gray.200'
                    mb='42px'
                    gap='16px'
                    position='relative'
                    zIndex={20}
                >
                    <Tab
                        className={styles.tab_list}
                        color='lime.800'
                        position='relative'
                        zIndex='1'
                        mb='-2px'
                        _selected={{
                            color: 'lime.700',
                            borderBottom: '2px solid',
                            borderColor: 'lime.700',
                        }}
                    >
                        Вход на сайт
                    </Tab>
                    <Tab
                        className={styles.tab_list}
                        color='lime.800'
                        position='relative'
                        zIndex='1'
                        mb='-2px'
                        _selected={{
                            color: 'lime.700',
                            borderBottom: '2px solid',
                            borderColor: 'lime.700',
                        }}
                    >
                        Регистрация
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={0}>
                        <LoginPage />
                    </TabPanel>
                    <TabPanel p={0}>{curentPage}</TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};
