import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton } from '@chakra-ui/react';

import { DATA_TEST_ID } from '~/constants/dataTestId';

import styles from './ErrorModal.module.css';

type ErrorModalType = {
    onClose: () => void;
    title?: string;
    notification?: string;
};

export const ErrorModal = ({
    onClose,
    title = 'Ошибка сервера',
    notification = 'Попробуйте поискать снова попозже',
}: ErrorModalType) => (
    <Alert
        status='error'
        w={{ base: '328px', bp95: '400px' }}
        justifyContent='space-between'
        background='red.500'
        position='fixed'
        bottom='80px'
        left='50%'
        ml={{ base: '-164px', bp95: '-200px' }}
        zIndex={20}
        data-test-id={DATA_TEST_ID.ERROR_NOTIFICATION}
    >
        <AlertIcon color='white' />
        <Box>
            <AlertTitle className={styles.title}>{title}</AlertTitle>
            <AlertDescription className={styles.message}>{notification}</AlertDescription>
        </Box>
        <CloseButton
            color='white'
            alignSelf='flex-start'
            position='relative'
            right='-14px'
            top='-10px'
            onClick={onClose}
            data-test-id={DATA_TEST_ID.CLOSE_ALERT_BUTTON}
        />
    </Alert>
);
