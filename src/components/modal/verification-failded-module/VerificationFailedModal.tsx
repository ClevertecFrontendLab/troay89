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
import { DATA_TEST_ID } from '~/constants/dataTestId';

import styles from './VerificationFailedModal.module.css';

type VerificationFailedModalType = {
    isShow: boolean;
    onClose: () => void;
};

export const VerificationFailedModal = ({ isShow, onClose }: VerificationFailedModalType) => (
    <>
        <Modal isCentered isOpen={isShow} onClose={onClose}>
            <ModalOverlay backgroundColor='alpha.300' backdropFilter='blur(4px)' />
            <ModalContent
                alignItems='center'
                maxW={{ base: '316px', bp115: '396px' }}
                borderRadius='16px'
                data-test-id={DATA_TEST_ID.EMAIL_VERIFICATION_FAILED_MODAL}
            >
                <Image src={verification} my={8} boxSize={{ base: '108px', bp115: '206px' }} />
                <Icon
                    as={CloseRoundModule}
                    position='absolute'
                    top={6}
                    right={6}
                    boxSize={6}
                    onClick={onClose}
                    data-test-id={DATA_TEST_ID.CLOSE_BUTTON}
                />
                <ModalHeader
                    className={styles.header}
                    textAlign='center'
                    as='h1'
                    my={0}
                    mx={2}
                    pt={0}
                    pb={4}
                >
                    Упс! Что-то пошло не так
                </ModalHeader>
                <ModalBody py={0}>
                    <Text className={styles.firstMessage} textAlign='center' color='alpha.700'>
                        Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться
                        снова.
                    </Text>
                    <Text
                        className={styles.secondMessage}
                        textAlign='center'
                        py={8}
                        color='alpha.700'
                    >
                        Остались вопросы? Свяжитесь
                        <Link textDecor='underline'> с&nbsp;поддержкой</Link>
                    </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
);
