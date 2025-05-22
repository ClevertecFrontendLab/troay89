import { Alert, AlertIcon, CloseButton, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

import { DATA_TEST_ID } from '~/constants/dataTestId';

import styles from './AlertSuccess.module.css';

type AlertSuccessProps = {
    message: string;
    onClose: () => void;
};

export const AlertSuccess = ({ message, onClose }: AlertSuccessProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 15000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <Alert
            status='success'
            position='absolute'
            bottom={20}
            variant='solid'
            w={{ base: '328px', bp115: '400px' }}
            minH={12}
            data-test-id={DATA_TEST_ID.ERROR_NOTIFICATION}
        >
            <AlertIcon boxSize={6} />
            <Text className={styles.message} color='white'>
                {message}{' '}
            </Text>
            <CloseButton
                onClick={onClose}
                alignSelf='flex-start'
                position='absolute'
                right='1px'
                top='1px'
                data-test-id={DATA_TEST_ID.CLOSE_ALERT_BUTTON}
            />
        </Alert>
    );
};
