import { Alert, AlertIcon, CloseButton } from '@chakra-ui/react';

type AlertSuccessProps = {
    onClose: () => void;
};

export const AlertSuccess = ({ onClose }: AlertSuccessProps) => (
    <Alert status='success' position='absolute' bottom={20} variant='solid' w='400px' h='48px'>
        <AlertIcon />
        Верификация прошла успешно
        <CloseButton
            onClick={onClose}
            alignSelf='flex-start'
            position='absolute'
            right='0'
            top='0'
        />
    </Alert>
);
