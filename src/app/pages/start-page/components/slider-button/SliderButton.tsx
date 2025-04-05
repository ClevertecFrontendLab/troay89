import { Button, Icon } from '@chakra-ui/react';

import Arrow from '~/components/icons/arrow';

import styles from './SliderButton.module.css';

type SliderButton = {
    reverse?: boolean;
};

function SliderButton({ reverse }: SliderButton) {
    return (
        <Button className={`${styles['slider_button']} ${reverse && styles.reverse}`}>
            <Icon as={Arrow} boxSize='6' />
        </Button>
    );
}

export default SliderButton;
