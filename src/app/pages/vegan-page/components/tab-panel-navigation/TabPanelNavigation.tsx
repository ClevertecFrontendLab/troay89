import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import GeneraCard from '~/components/cards/card/GeneralCard';
import dataVeganPageCards from '~/data/dataVeganPageCards';

import styles from './TabPanelNavigation.module.css';

const tabData = [
    { title: 'Закуски', content: <p>Контент для категории "Закуски"</p> },
    { title: 'Первые блюда', content: <p>Контент для категории "Первые блюда"</p> },
    {
        title: 'Вторые блюда',
        content: (
            <Flex className={styles['container_cards']}>
                {dataVeganPageCards.map(
                    ({ image, title, description, label, favorites, like }, index) => (
                        <GeneraCard
                            key={index}
                            image={image}
                            title={title}
                            description={description}
                            favorites={favorites}
                            label={label}
                            like={like}
                        />
                    ),
                )}
            </Flex>
        ),
    },
    { title: 'Гарниры', content: <p>Контент для категории "Гарниры"</p> },
    { title: 'Десерты', content: <p>Контент для категории "Десерты"</p> },
    { title: 'Выпечка', content: <p>Контент для категории "Выпечка"</p> },
    { title: 'Сыроедческие блюда', content: <p>Контент для категории "Сыродельческие блюда"</p> },
    { title: 'Напитки', content: <p>Контент для категории "Напитки"</p> },
];

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
            <Box className={styles['container_tabs']}>
                <Tabs variant='unstyled' defaultIndex={2}>
                    <TabList
                        ref={tabListRef}
                        className={styles['tab_list']}
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
                            <TabPanel
                                className={styles['tab_panel']}
                                key={index}
                                px={0}
                                pt={6}
                                pb={4}
                            >
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
