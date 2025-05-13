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

import { registaration } from '~/assets/images/modal-mage';
import { CloseRoundModule } from '~/components/icons/CloseRoundModule';

import styles from './RegistrationModal.module.css';

type RegistrationModalType = {
    email: string;
    isShow: boolean;
    onClose: () => void;
};

export const RegistrationModal = ({ email, isShow, onClose }: RegistrationModalType) => {
    const title = 'Остался последний шаг.\n Нужно верифицировать ваш e-mail';
    const messageEmail = `Мы отправили вам на почту \n ${email} \n ссылку дляверификации.`;
    return (
        <>
            <Modal isCentered isOpen={isShow} onClose={onClose}>
                <ModalOverlay backgroundColor='alpha.300' backdropFilter='blur(4px)' />
                <ModalContent alignItems='center' maxW='396px'>
                    <Image src={registaration} w='206px' h='206px' my='32px' />
                    <Icon
                        as={CloseRoundModule}
                        position='absolute'
                        top={6}
                        right={6}
                        boxSize={6}
                        onClick={onClose}
                    />
                    <ModalBody px={8} py={0}>
                        <ModalHeader
                            className={styles.header}
                            whiteSpace='pre-line'
                            textAlign='center'
                            px={0}
                            pt={0}
                            pb={4}
                            as='h1'
                            my={0}
                        >
                            {title}
                        </ModalHeader>
                        <Text
                            textAlign='center'
                            pb={8}
                            className={styles.firstMessage}
                            whiteSpace='pre-line'
                        >
                            {messageEmail}
                        </Text>
                        <Text textAlign='center' pb={8} className={styles.secondMessage}>
                            Не пришло письмо? Проверьте папку Спам. <br /> По другим вопросам
                            свяжитесь <Link textDecor='underline'>с поддержкой</Link>
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
