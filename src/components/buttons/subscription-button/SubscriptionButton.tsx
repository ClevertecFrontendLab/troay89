import { Button } from '@chakra-ui/react';

import Subscribe from '~/components/icons/Subscribe';

import styles from './SubscriptionButton.module.css';

type SubscriptionButton = {
    isFavorite: boolean;
    handleToggleSubscription: () => void;
};

export const SubscriptionButton = ({
    isFavorite,
    handleToggleSubscription,
}: SubscriptionButton) => (
    <Button
        className={styles.button}
        leftIcon={<Subscribe />}
        colorScheme='teal'
        size='xs'
        bg={isFavorite ? 'white' : 'alpha.800'}
        color={isFavorite ? 'alpha.800' : 'white'}
        iconSpacing='6px'
        onClick={handleToggleSubscription}
    >
        {isFavorite ? 'Вы подписаны' : 'Подписаться'}
    </Button>
);
