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

import dataCategoryIcons from '~/data/dataCategoryIcons';
import dataNavigation from '~/data/dataNavigation';

import styles from './AccordionMenu.module.css';

function AccordionMenu() {
    return (
        <Accordion className={styles['navigation']} allowMultiple as='nav'>
            {Object.entries(dataNavigation).map(([category, items]) => (
                <AccordionItem className={styles['accordion_item']} key={category}>
                    <AccordionButton
                        className={styles['accordion_button']}
                        as='span'
                        _expanded={{
                            bg: '#eaffc7',
                            font: 'white',
                            fontWeight: 700,
                        }}
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
                                <ListItem key={item}>
                                    <Link className={styles['item_link']} href='/'>
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
