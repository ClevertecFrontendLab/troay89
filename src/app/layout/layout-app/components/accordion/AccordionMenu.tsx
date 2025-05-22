import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    Box,
    Link,
    List,
    ListItem,
} from '@chakra-ui/react';
import classNames from 'classnames';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router';

import { DATA_TEST_ID } from '~/constants/dataTestId';
import { useNavigationIndices } from '~/hooks/useNavigationIndices';
import { getArrayCategorySelector } from '~/store/selectors/arrayCategorySelector';
import {
    setActiveSubcategoryId,
    setIndexTab,
} from '~/store/slice/indexCategoriesSubcategoriesSlice';

import { ButtonAccordion } from '../accordion-button/ButtonAccordion';
import styles from './AccordionMenu.module.css';

export const AccordionMenu = () => {
    const dispatch = useDispatch();
    const categories = useSelector(getArrayCategorySelector);
    const { indexCategory, indexSubcategory, subcategories } = useNavigationIndices();

    const handleLinkClick = (index: number, subcategoryId: string) => {
        dispatch(setIndexTab(index));
        dispatch(setActiveSubcategoryId(subcategoryId));
    };

    const categoriesFilter = useMemo(
        () => categories.filter((cat) => Boolean(cat.subCategories)),
        [categories],
    );

    return (
        <Accordion
            className={styles.navigation}
            allowToggle
            as='nav'
            data-test-id={DATA_TEST_ID.NAV}
        >
            {categoriesFilter.map((category, index) => (
                <AccordionItem border='none' key={category._id}>
                    <ButtonAccordion category={category} index={index ?? indexCategory} />
                    <AccordionPanel className={styles.accordion_panel} pb={4}>
                        <List className={styles.list} spacing={2}>
                            {category.subCategories &&
                                category.subCategories.map((subcategory, index) => {
                                    const isActive = index === indexSubcategory && subcategories;
                                    return (
                                        <ListItem
                                            className={styles.list_item}
                                            display='flex'
                                            key={subcategory._id}
                                            data-test-id={
                                                isActive ? `${subcategory.category}-active` : ''
                                            }
                                        >
                                            <Box
                                                className={classNames(styles.vert_line, {
                                                    [styles.line_change]: isActive,
                                                })}
                                            />
                                            <Link
                                                className={classNames(styles.item_link, {
                                                    [styles.item_change]: isActive,
                                                })}
                                                onClick={() =>
                                                    handleLinkClick(index, subcategory._id)
                                                }
                                                as={RouterLink}
                                                to={`/recipes/${category.category}/${subcategory.category}`}
                                            >
                                                {subcategory.title}
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
};
