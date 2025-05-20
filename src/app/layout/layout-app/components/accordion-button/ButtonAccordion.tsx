import {
    AccordionButton,
    AccordionIcon,
    Box,
    chakra,
    useAccordionItemState,
} from '@chakra-ui/react';
import classNames from 'classnames';
import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router';

import { URLS } from '~/constants/url';
import {
    setActiveSubcategoryId,
    setIndexButton,
    setIndexTab,
} from '~/store/slice/indexCategoriesSubcategoriesSlice';
import { Category } from '~/type/category';

import styles from './ButtonAccordion.module.css';

type ButtonAccordionProps = {
    category: Category;
    index: number;
};

export const ButtonAccordion = memo(function ButtonAccordion({
    category,
    index,
}: ButtonAccordionProps) {
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
        ? `${URLS.IMAGE_URL}${category.icon}`
        : category.icon;

    return (
        <AccordionButton
            className={classNames(styles.accordion_button, styles.navigation_button)}
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
                <chakra.span isTruncated title={category.title} className={styles.title_nav}>
                    {category.title}
                </chakra.span>
            </Box>
            <AccordionIcon className={styles.accordion_icon} boxSize={7} />
        </AccordionButton>
    );
});
