import { Button } from '@chakra-ui/react';

import ArrowButton from '~/components/icons/ArrowButton';

import styles from './GreenButton.module.css';

type GreenButtonTypes = {
    text: string;
    changeColor?: boolean;
};

export const GreenButton = ({ text, changeColor }: GreenButtonTypes) => (
    <Button
        className={`${styles.button} ${changeColor && styles.changeColor}`}
        rightIcon={<ArrowButton />}
        h={{ bp189: 12, base: 10 }}
        _hover={{}}
    >
        {text}
    </Button>
);
