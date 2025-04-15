import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    Box,
    Link,
    List,
    ListItem,
} from '@chakra-ui/react';
import { useLocation } from 'react-router';

import dataNavigation from '~/data/dataNavigation';

import ButtonAccordion from '../accordion-button/ButtonAccordion';
import styles from './AccordionMenu.module.css';

function AccordionMenu() {
    const location = useLocation();
    return (
        <Accordion className={styles.navigation} allowMultiple as='nav'>
            {Object.entries(dataNavigation).map(([category, items]) => (
                <AccordionItem border='none' key={category}>
                    <ButtonAccordion category={category} />
                    <AccordionPanel className={styles.accordion_panel} pb={4}>
                        <List className={styles.list} spacing={2}>
                            {items.map((item) => (
                                <ListItem className={styles.list_item} display='flex' key={item}>
                                    <Box
                                        className={`${styles.vert_line} ${item === 'Вторые блюда' && location.pathname === '/vegan' ? styles.line_change : ''}`}
                                    />
                                    <Link
                                        className={`${styles.item_link} ${item === 'Вторые блюда' && location.pathname === '/vegan' ? styles.item_change : ''}`}
                                    >
                                        {item}
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

export default AccordionMenu;
