import { Button, Icon, Text } from '@chakra-ui/react';

import BookMark from '~/components/icons/BookMark';

import styles from './FavoriteButton.module.css';

function FavoriteButton() {
    return (
        <Button
            className={styles.button}
            color='blackAlpha.800'
            bg='white'
            h={{ bp95: 8, base: 6 }}
            pl={{ bp95: 2.5, base: 0 }}
            pr={{ bp95: 3, base: 0 }}
        >
            <Icon as={BookMark} boxSize={{ bp95: 4, base: 3 }} mr={{ bp95: '9px', base: 0 }} />
            <Text display={{ bp95: 'inline', base: 'none' }}>Сохранить</Text>
        </Button>
    );
}

export default FavoriteButton;
