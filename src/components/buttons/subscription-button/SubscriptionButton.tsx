import { Box, Button, Tooltip } from '@chakra-ui/react';

import Subscribe from '~/components/icons/Subscribe';
import { DATA_TEST_ID } from '~/constants/dataTestId';

import styles from './SubscriptionButton.module.css';

type SubscriptionButton = {
    isFavorite: boolean;
    handleToggleSubscription: () => void;
};

export const SubscriptionButton = ({
    isFavorite,
    handleToggleSubscription,
}: SubscriptionButton) => {
    const labelText = 'Нажмите, если хотите отписаться';
    return (
        <Tooltip
            className={styles.tooltip}
            label={
                isFavorite && (
                    <Box as='span' whiteSpace='pre-line'>
                        {`${labelText}`}
                    </Box>
                )
            }
            aria-label='Subscription tooltip'
            placement='bottom'
            hasArrow
            data-test-id={DATA_TEST_ID.BLOG_TOOLTIP}
            bg='alpha.900'
            borderRadius='4px'
            maxW='144px'
        >
            <Button
                variant='outline'
                className={styles.button}
                leftIcon={<Subscribe />}
                colorScheme='teal'
                size='xs'
                bg={isFavorite ? 'white' : 'alpha.800'}
                color={isFavorite ? 'alpha.800' : 'white'}
                iconSpacing='6px'
                onClick={handleToggleSubscription}
                data-test-id={
                    isFavorite
                        ? DATA_TEST_ID.BLOG_TOGGLE_UNSUBSCRIBE
                        : DATA_TEST_ID.BLOG_TOGGLE_SUBSCRIBE
                }
            >
                {isFavorite ? 'Вы подписаны' : 'Подписаться'}
            </Button>
        </Tooltip>
    );
};
