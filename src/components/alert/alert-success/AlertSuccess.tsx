import { Alert, AlertIcon, CloseButton, Text } from '@chakra-ui/react';

import styles from './AlertSuccess.module.css';

type AlertSuccessProps = {
    onClose: () => void;
};

export const AlertSuccess = ({ onClose }: AlertSuccessProps) => (
    <Alert status='success' position='absolute' bottom={20} variant='solid' w='400px' h='48px'>
        <AlertIcon boxSize={6} />
        <Text className={styles.message} color='white'>
            Верификация прошла успешно
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
