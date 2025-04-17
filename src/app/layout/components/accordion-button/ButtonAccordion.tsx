import { AccordionButton, AccordionIcon, Box } from '@chakra-ui/react';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router';

import dataCategoryIcons from '~/data/dataCategoryIcons';
import dataPathCategory from '~/data/dataPathCategory';
import { setIndexButton } from '~/store/slice/indexNavigationButtonSlice';
import { setIndexTab } from '~/store/slice/indexTabsSlice';

import styles from './ButtonAccordion.module.css';

type ButtonAccordionProps = {
    category: string;
    index: number;
};

const ButtonAccordion = memo(function ButtonAccordion({ category, index }: ButtonAccordionProps) {
    const dispatch = useDispatch();
    const handleAccordionButtonClick = (index: number) => {
        dispatch(setIndexTab(0));
        dispatch(setIndexButton(index));
    };

    return (
        <AccordionButton
            className={`${styles.accordion_button} ${styles.navigation_button}`}
            _expanded={{
                bg: '#eaffc7',
                font: 'white',
                fontWeight: 700,
            }}
            as={RouterLink}
            to={`/recipes/${Array.from(dataPathCategory.keys())[index][1]}/${Array.from(dataPathCategory.values())[index][0]}`}
            onClick={() => handleAccordionButtonClick(index)}
            data-test-id={category === 'Веганская кухня' && 'vegan-cuisine'}
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
