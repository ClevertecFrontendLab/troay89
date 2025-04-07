import { Button } from '@chakra-ui/react';

import ArrowButton from '~/components/icons/ArrowButton';

import styles from './GreenButton.module.css';

type GreenButton = {
    text: string;
    changeColor?: boolean;
};

function GreenButton({ text, changeColor }: GreenButton) {
    return (
        <>
            <Button
                className={`${styles.button} ${changeColor && styles.changeColor}`}
                rightIcon={<ArrowButton />}
            >
                {text}
            </Button>
        </>
    );
}

export default GreenButton;
