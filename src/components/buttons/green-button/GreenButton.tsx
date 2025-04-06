import { Button } from '@chakra-ui/react';

import ArrowButton from '~/components/icons/ArrowButton';

import styles from './GreenButton.module.css';

type GreenButton = {
    changeColor?: boolean;
};

function GreenButton({ changeColor }: GreenButton) {
    return (
        <>
            <Button
                className={`${styles.button} ${changeColor && styles.changeColor}`}
                rightIcon={<ArrowButton />}
            >
                Вся подборка
            </Button>
        </>
    );
}

export default GreenButton;
