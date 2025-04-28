import { AccordionButton, AccordionIcon, Box } from '@chakra-ui/react';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router';

import dataCategoryIcons from '~/data/dataCategoryIcons';
import usePathCategoryData from '~/hooks/usePathCategoryData';
import { setIndexButton } from '~/store/slice/indexNavigationButtonSlice';
import { setIndexTab } from '~/store/slice/indexTabsSlice';

import styles from './ButtonAccordion.module.css';

type ButtonAccordionProps = {
    category: string;
    index: number;
};

const ButtonAccordion = memo(function ButtonAccordion({ category, index }: ButtonAccordionProps) {
    const dispatch = useDispatch();
    const { keysPathCategory, valuesPathCategory } = usePathCategoryData();
    const handleAccordionButtonClick = (index: number) => {
        dispatch(setIndexTab(0));
        dispatch(setIndexButton(index));
    };

    const pathCategory = keysPathCategory[index][1];
    const pathSubcategory = valuesPathCategory[index][0];

    return (
        <AccordionButton
            className={`${styles.accordion_button} ${styles.navigation_button}`}
            _expanded={{
                bg: '#eaffc7',
                font: 'white',
                fontWeight: 700,
            }}
            as={RouterLink}
            to={`/recipes/${pathCategory}/${pathSubcategory}`}
            onClick={() => handleAccordionButtonClick(index)}
            data-test-id={`${pathCategory}-cuisine`}
        >
            <Box className={styles.item_menu} flex='1' textAlign='left'>
                {dataCategoryIcons[category] && (
                    <img
                        src={dataCategoryIcons[category]}
                        alt={`${category} icon`}
                        className={styles.icon}
                    />
                )}
                <span className={styles.title_nav}>{category}</span>
            </Box>
            <AccordionIcon className={styles.accordion_icon} boxSize={7} />
        </AccordionButton>
    );
});

export default ButtonAccordion;
