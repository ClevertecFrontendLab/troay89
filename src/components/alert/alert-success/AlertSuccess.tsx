import { Alert, AlertIcon, CloseButton, Text } from '@chakra-ui/react';

import styles from './AlertSuccess.module.css';

type AlertSuccessProps = {
    message: string;
    onClose: () => void;
};

export const AlertSuccess = ({ message, onClose }: AlertSuccessProps) => (
    <Alert
        status='success'
        position='absolute'
        bottom={20}
        variant='solid'
        w={{ base: '328px', bp115: '400px' }}
        h='48px'
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
        />
    </Alert>
);
