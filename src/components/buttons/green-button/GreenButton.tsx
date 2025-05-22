import { Button } from '@chakra-ui/react';

import ArrowButton from '~/components/icons/ArrowButton';

import styles from './GreenButton.module.css';

type GreenButton = {
    text: string;
    changeColor?: boolean;
};

export const GreenButton = ({ text, changeColor }: GreenButton) => (
    <Button
        className={`${styles.button} ${changeColor && styles.changeColor}`}
        rightIcon={<ArrowButton />}
        colorScheme='blackAlpha'
        h={{ bp189: 12, base: 10 }}
    >
        {text}
    </Button>
);
