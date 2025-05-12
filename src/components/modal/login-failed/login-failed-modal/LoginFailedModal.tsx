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
    useDisclosure,
} from '@chakra-ui/react';

import { noExit } from '~/assets/images/modal-mage';
import { CloseRoundModule } from '~/components/icons/CloseRoundModule';

import styles from './LoginFailedModal.module.css';

export const LoginFailedModule = () => {
    const { onClose } = useDisclosure();
    const message = 'Что-то пошло не так.\nПопробуйте еще раз';
    return (
        <>
            <Modal isCentered isOpen={true} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW='396px' alignItems='center' m={0}>
                    <Image src={noExit} boxSize='206px' mt={8} />
                    <Icon as={CloseRoundModule} position='absolute' top={6} right={6} boxSize={6} />
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
                        >
                            Повторить
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
