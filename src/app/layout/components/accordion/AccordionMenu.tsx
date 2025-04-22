import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    Box,
    Link,
    List,
    ListItem,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router';

import dataNavigation from '~/data/dataNavigation';
import dataPathCategory from '~/data/dataPathCategory';
import { useNavigationIndices } from '~/hooks/useNavigationIndices';
import { setIndexTab } from '~/store/slice/indexTabsSlice';

import ButtonAccordion from '../accordion-button/ButtonAccordion';
import styles from './AccordionMenu.module.css';

function AccordionMenu() {
    const dispatch = useDispatch();
    const { indexCategory, indexSubcategory, subcategories } = useNavigationIndices();

    const handleTabsChange = (index: number) => {
        dispatch(setIndexTab(index));
    };

    return (
        <Accordion
            className={styles.navigation}
            allowMultiple
            as='nav'
            index={subcategories === undefined ? [] : [indexCategory]}
        >
            {Object.entries(dataNavigation).map(([category, items], index) => (
                <AccordionItem border='none' key={category}>
                    <ButtonAccordion category={category} index={index ?? indexCategory} />
                    <AccordionPanel className={styles.accordion_panel} pb={4}>
                        <List className={styles.list} spacing={2}>
                            {items.map((item, index) => (
                                <ListItem className={styles.list_item} display='flex' key={item}>
                                    <Box
                                        className={`${styles.vert_line} ${index === indexSubcategory ? styles.line_change : ''}`}
                                    />
                                    <Link
                                        className={`${styles.item_link} ${index === indexSubcategory ? styles.item_change : ''}`}
                                        onClick={() => handleTabsChange(index)}
                                        as={RouterLink}
                                        to={`/recipes/${Array.from(dataPathCategory.keys())[indexCategory][1]}/${Array.from(dataPathCategory.values())[indexCategory][index]}`}
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
