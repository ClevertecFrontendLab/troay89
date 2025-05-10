import { Button, Icon } from '@chakra-ui/react';

import Arrow from '~/components/icons/ArrowSlider';

import styles from './SliderButton.module.css';

type SliderButton = {
    dataTest: string;
    onClick: () => void;
    reverse?: boolean;
};

export const SliderButton = ({ dataTest, reverse, onClick }: SliderButton) => (
    <Button
        data-test-id={dataTest}
        className={`${styles.slider_button} ${reverse && styles.reverse}`}
        colorScheme='teal'
        bg='black'
        display={{ bp95: 'flex', base: 'none' }}
        boxSize={{ bp189: 12, base: 10 }}
        top={{ bp189: '147px', base: '150px' }}
        p={0}
        onClick={onClick}
    >
        <Icon as={Arrow} boxSize='6' />
    </Button>
);
