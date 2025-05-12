import {
    Button,
    Icon,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

import { noExit } from '~/assets/images/modal-mage';
import { CloseRoundModule } from '~/components/icons/CloseRoundModule';

import styles from './LoginFailedModal.module.css';

type LoginFailedModuleType = {
    isOpen: boolean;
    onRetry: () => void;
    onClose: () => void;
};

export const LoginFailedModule = ({ isOpen, onRetry, onClose }: LoginFailedModuleType) => {
    const message = 'Что-то пошло не так.\nПопробуйте еще раз';
    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay backgroundColor='alpha.300' backdropFilter='blur(4px)' />
                <ModalContent maxW='396px' alignItems='center' m={0}>
                    <Image src={noExit} boxSize='206px' mt={8} />
                    <Icon
                        as={CloseRoundModule}
                        position='absolute'
                        top={6}
                        right={6}
                        boxSize={6}
                        onClick={onClose}
                    />
                    <ModalBody p={8} w='100%'>
                        <ModalHeader
                            as='h1'
                            className={styles.header}
                            pt={0}
                            pb={4}
                            m={0}
                            textAlign='center'
                        >
                            Вход не выполнен
                        </ModalHeader>
                        <Text
                            className={styles.text}
                            textAlign='center'
                            pb={8}
                            whiteSpace='pre-line'
                        >
                            {message}
                        </Text>
                        <Button
                            className={styles.button}
                            maxW='100%'
                            width='100%'
                            px={0}
                            bg='alpha.900'
                            color='white'
                            size='lg'
                            colorScheme='teal'
                            onClick={onRetry}
                        >
                            Повторить
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
