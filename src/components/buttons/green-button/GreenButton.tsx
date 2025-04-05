import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

import styles from './GreenButton.module.css';

function GreenButton() {
    return (
        <>
            <Button className={styles.button} rightIcon={<ArrowForwardIcon />}>
                Вся подборка
            </Button>
        </>
    );
}

export default GreenButton;
