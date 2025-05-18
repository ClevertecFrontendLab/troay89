import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton } from '@chakra-ui/react';
import { useEffect } from 'react';

import { DATA_TEST_ID } from '~/constants/dataTestId';

import styles from './AlertFailed.module.css';

type ErrorModalType = {
    onClose: () => void;
    title?: string;
    notification?: string;
    position?: 'absolute' | 'fixed';
    left?: string;
    ml?: string;
    ml_bp95?: string;
};

export const ErrorModal = ({
    onClose,
    title = 'Ошибка сервера',
    notification = 'Попробуйте поискать снова попозже',
    position = 'fixed',
    left = '50%',
    ml = '-164px',
    ml_bp95 = '-200px',
}: ErrorModalType) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 15000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <Alert
            status='error'
            w={{ base: '328px', bp95: '400px' }}
            justifyContent='flex-start'
            background='red.500'
            position={position}
            bottom='80px'
            left={left}
            ml={{ base: ml, bp95: ml_bp95 }}
            zIndex={20}
            data-test-id={DATA_TEST_ID.ERROR_NOTIFICATION}
        >
            <AlertIcon color='white' boxSize={6} />
            <Box>
                <AlertTitle className={styles.title}>{title}</AlertTitle>
                <AlertDescription className={styles.message}>{notification}</AlertDescription>
            </Box>
            <CloseButton
                color='white'
                alignSelf='flex-start'
                position='absolute'
                right='2px'
                top='2px'
                onClick={onClose}
                data-test-id={DATA_TEST_ID.CLOSE_ALERT_BUTTON}
            />
        </Alert>
    );
};
