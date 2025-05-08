import { AccordionButton, AccordionIcon, Box, useAccordionItemState } from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router';

import {
    setActiveSubcategoryId,
    setIndexButton,
    setIndexTab,
} from '~/store/slice/indexCategorisSubcategoriesSlice';
import { Category } from '~/type/Category';

import styles from './ButtonAccordion.module.css';

type ButtonAccordionProps = {
    category: Category;
    index: number;
};

const ButtonAccordion = memo(function ButtonAccordion({ category, index }: ButtonAccordionProps) {
    const dispatch = useDispatch();
    const { isOpen } = useAccordionItemState();

    const handleAccordionButtonClick = useCallback(() => {
        if (!isOpen) {
            dispatch(setIndexTab(0));
            dispatch(setIndexButton(index));
            const subcategory = category.subCategories?.[0]?._id;
            if (!subcategory) return;
            dispatch(setActiveSubcategoryId(subcategory));
        }
    }, [category.subCategories, dispatch, index, isOpen]);

    const pathSubcategory = category.subCategories && category.subCategories[0].category;
    const pathAccordionButton = `/recipes/${category.category}/${pathSubcategory}`;
    const pathIconAccordionButton = category.icon?.startsWith('/media/i')
        ? `https://training-api.clevertec.ru${category.icon}`
        : category.icon;

    return (
        <AccordionButton
            className={`${styles.accordion_button} ${styles.navigation_button}`}
            _expanded={{
                bg: '#eaffc7',
                font: 'white',
                fontWeight: 700,
            }}
            as={RouterLink}
            to={pathAccordionButton}
            onClick={() => handleAccordionButtonClick()}
            data-test-id={`${category.category}-cuisine`}
        >
            <Box className={styles.item_menu} flex='1' textAlign='left'>
                <img
                    src={pathIconAccordionButton}
                    alt={`${category.title} icon`}
                    className={styles.icon}
                />
                <span className={styles.title_nav}>{category.title}</span>
            </Box>
            <AccordionIcon className={styles.accordion_icon} boxSize={7} />
        </AccordionButton>
    );
});

export default ButtonAccordion;
