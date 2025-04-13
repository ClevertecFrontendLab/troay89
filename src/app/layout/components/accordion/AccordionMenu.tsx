import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Link,
    List,
    ListItem,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router';

import dataCategoryIcons from '~/data/dataCategoryIcons';
import dataNavigation from '~/data/dataNavigation';

import styles from './AccordionMenu.module.css';

function AccordionMenu() {
    const location = useLocation();

    return (
        <Accordion className={styles['navigation']} allowMultiple as='nav'>
            {Object.entries(dataNavigation).map(([category, items]) => (
                <AccordionItem className={styles['accordion_item']} key={category}>
                    <AccordionButton
                        className={styles['accordion_button']}
                        _expanded={{
                            bg: '#eaffc7',
                            font: 'white',
                            fontWeight: 700,
                        }}
                        as={RouterLink}
                        to='/vegan'
                        data-test-id={category === 'Веганская кухня' && 'vegan-cuisine'}
                    >
                        <Box className={styles['item_menu']} flex='1' textAlign='left'>
                            {dataCategoryIcons[category] && (
                                <img
                                    src={dataCategoryIcons[category]}
                                    alt={`${category} icon`}
                                    className={styles.icon}
                                />
                            )}
                            <span className={styles['title_nav']}>{category}</span>
                        </Box>
                        <AccordionIcon className={styles['accordion_icon']} boxSize={7} />
                    </AccordionButton>
                    <AccordionPanel className={styles['accordion_panel']} pb={4}>
                        <List className={styles['list']} spacing={2}>
                            {items.map((item) => (
                                <ListItem className={styles['list_item']} key={item}>
                                    <Box
                                        className={`${styles['vert_line']} ${item === 'Вторые блюда' && location.pathname === '/vegan' ? styles['line_change'] : ''}`}
                                    />
                                    <Link
                                        className={`${styles['item_link']} ${item === 'Вторые блюда' && location.pathname === '/vegan' ? styles['item_change'] : ''}`}
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
