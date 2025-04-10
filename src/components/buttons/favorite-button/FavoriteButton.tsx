import { Button, Icon, Text } from '@chakra-ui/react';

import BookMark from '~/components/icons/BookMark';

import styles from './FavoriteButton.module.css';

function FavoriteButton() {
    return (
        <Button className={styles.button} bg='white' color='blackAlpha.800'>
            <Icon className={styles.icon} as={BookMark} boxSize={4} />
            <Text className={styles.text}>Сохранить</Text>
        </Button>
    );
}

export default FavoriteButton;
