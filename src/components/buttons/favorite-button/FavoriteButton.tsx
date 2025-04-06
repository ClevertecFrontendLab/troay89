import { Button, Icon } from '@chakra-ui/react';

import BookMark from '~/components/icons/BookMark';

import styles from './FavoriteButton.module.css';

function FavoriteButton() {
    return (
        <Button className={styles.button} bg='white' color='blackAlpha.800'>
            <Icon className={styles.icon} as={BookMark} boxSize={4} />
            Сохранить
        </Button>
    );
}

export default FavoriteButton;
