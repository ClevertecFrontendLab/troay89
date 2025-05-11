import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import { LoginPage } from '~/app/pages/login-page/LoginPage';
import { RegistrationOnePage } from '~/app/pages/registration-one-page/RegistrationPageOne';
import { RegistrationTwoPage } from '~/app/pages/registration-two-page/RegistrationPageTwo';

import styles from './AccountTabs.module.css';

export const AccountTabs = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const tabIndex = location.pathname.includes('login') ? 0 : 1;

    const handleTabsChange = (index: number) => {
        const path = index === 0 ? '/account/login' : '/account/registration';
        navigate(path);
    };

    return (
        <Box maxW='461px' mx='auto'>
            <Tabs
                index={tabIndex}
                onChange={handleTabsChange}
                isLazy
                lazyBehavior='unmount'
                variant='unstyled'
            >
                <TabList borderBottom='2px solid' borderColor='gray.200' mb={10} gap='16px'>
                    <Tab
                        className={styles.tab_list}
                        color='lime.800'
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
                    <TabPanel p={0}>
                        {location.pathname.endsWith('finish-registration') ? (
                            <RegistrationTwoPage />
                        ) : (
                            <RegistrationOnePage />
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};
