import {
    Icon,
    Image,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

import { verification } from '~/assets/images/modal-mage';
import { CloseRoundModule } from '~/components/icons/CloseRoundModule';

import styles from './VerificationFailedModal.module.css';

type VerificationFailedModalType = {
    isShow: boolean;
    onClose: () => void;
};

export const VerificationFailedModal = ({ isShow, onClose }: VerificationFailedModalType) => (
    <>
        <Modal isCentered isOpen={isShow} onClose={onClose}>
            <ModalOverlay backgroundColor='alpha.300' backdropFilter='blur(4px)' />
            <ModalContent alignItems='center' maxW='396px'>
                <Image src={verification} my={8} w='206px' h='206px' maxW='396px' />
                <Icon
                    as={CloseRoundModule}
                    position='absolute'
                    top={6}
                    right={6}
                    boxSize={6}
                    onClick={onClose}
                />
                <ModalHeader className={styles.header} as='h1' m={0} pt={0} pb={4}>
                    Упс! Что-то пошло не так
                </ModalHeader>
                <ModalBody py={0}>
                    <Text className={styles.firstMessage} textAlign='center'>
                        Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться
                        снова.
                    </Text>
                    <Text className={styles.secondMessage} textAlign='center' py={8}>
                        Остались вопросы? Свяжитесь
                        <Link textDecor='underline'> с поддержкой</Link>
                    </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
);
