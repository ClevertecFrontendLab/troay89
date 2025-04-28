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
import { useNavigationIndices } from '~/hooks/useNavigationIndices';
import usePathCategoryData from '~/hooks/usePathCategoryData';
import { setIndexTab } from '~/store/slice/indexTabsSlice';

import ButtonAccordion from '../accordion-button/ButtonAccordion';
import styles from './AccordionMenu.module.css';

function AccordionMenu() {
    const dispatch = useDispatch();
    const { indexCategory, indexSubcategory, subcategories } = useNavigationIndices();
    const { keysPathCategory, valuesPathCategory } = usePathCategoryData();

    const handleTabsChange = (index: number) => {
        dispatch(setIndexTab(index));
    };

    return (
        <Accordion className={styles.navigation} allowToggle as='nav' data-test-id='nav'>
            {Object.entries(dataNavigation).map(([category, items], index) => (
                <AccordionItem border='none' key={category}>
                    <ButtonAccordion category={category} index={index ?? indexCategory} />
                    <AccordionPanel className={styles.accordion_panel} pb={4}>
                        <List className={styles.list} spacing={2}>
                            {items.map((item, index) => {
                                const isActive = index === indexSubcategory && subcategories;
                                const categoryPath = keysPathCategory[indexCategory][1];
                                const subcategoryPath = valuesPathCategory[indexCategory][index];
                                return (
                                    <ListItem
                                        className={styles.list_item}
                                        display='flex'
                                        key={item}
                                        data-test-id={isActive ? `${subcategoryPath}-active` : ''}
                                    >
                                        <Box
                                            className={`${styles.vert_line} ${isActive ? styles.line_change : ''}`}
                                        />
                                        <Link
                                            className={`${styles.item_link} ${isActive ? styles.item_change : ''}`}
                                            onClick={() => handleTabsChange(index)}
                                            as={RouterLink}
                                            to={`/recipes/${categoryPath}/${subcategoryPath}`}
                                        >
                                            {item}
                                        </Link>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

export default AccordionMenu;
