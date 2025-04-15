import { AccordionButton, AccordionIcon, Box } from '@chakra-ui/react';
import { memo } from 'react';
import { Link as RouterLink } from 'react-router';

import dataCategoryIcons from '~/data/dataCategoryIcons';

import styles from './ButtonAccordion.module.css';

type ButtonAccordionProps = {
    category: string;
};

const ButtonAccordion = memo(function ButtonAccordion({ category }: ButtonAccordionProps) {
    return (
        <AccordionButton
            className={`${styles.accordion_button} ${styles.navigation_button}`}
            _expanded={{
                bg: '#eaffc7',
                font: 'white',
                fontWeight: 700,
            }}
            as={RouterLink}
            to='/vegan'
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
