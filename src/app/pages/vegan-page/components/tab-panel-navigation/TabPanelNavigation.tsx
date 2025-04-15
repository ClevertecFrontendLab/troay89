import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import tabData from '../tap-data/TabData';
import styles from './TabPanelNavigation.module.css';

function TabPanelNavigation() {
    const tabListRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (tabListRef.current) {
            const tabList = tabListRef.current;
            tabList.scrollLeft = (tabList.scrollWidth - tabList.clientWidth) / 2;
        }
    }, []);

    return (
        <Flex className={styles.container}>
            <Box className={styles.container_tabs}>
                <Tabs variant='unstyled' defaultIndex={2}>
                    <TabList
                        ref={tabListRef}
                        className={styles.tab_list}
                        maxW='fit-content'
                        mx='auto'
                        borderBottom='1px solid'
                        borderColor='gray.800'
                    >
                        {tabData.map((tab, index) => (
                            <Tab
                                key={index}
                                className={styles.tab}
                                _selected={{
                                    color: '#2db100',
                                    borderBottom: '2px solid',
                                    borderColor: '#2db100',
                                }}
                            >
                                {tab.title}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {tabData.map((tab, index) => (
                            <TabPanel className={styles.tab_panel} key={index} px={0} pt={6} pb={4}>
                                {tab.content}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Box>
            <Button className={styles.button}>Загрузить ещё</Button>
        </Flex>
    );
}

export default TabPanelNavigation;
