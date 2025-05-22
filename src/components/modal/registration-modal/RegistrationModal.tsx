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
import { useNavigate } from 'react-router';

import { registaration } from '~/assets/images/modal-mage';
import { CloseRoundModule } from '~/components/icons/CloseRoundModule';
import { DATA_TEST_ID } from '~/constants/dataTestId';

import styles from './RegistrationModal.module.css';

type RegistrationModalType = {
    email: string;
    isShow: boolean;
    onClose: () => void;
};

export const RegistrationModal = ({ email, isShow, onClose }: RegistrationModalType) => {
    const title = 'Остался последний шаг. Нужно верифицировать \nваш\u00A0e-mail';
    const navigate = useNavigate();
    const onCloseRedirict = () => {
        navigate('/account/login');
        onClose();
    };
    return (
        <Modal isCentered isOpen={isShow} onClose={onCloseRedirict}>
            <ModalOverlay backgroundColor='alpha.300' backdropFilter='blur(4px)' />
            <ModalContent
                alignItems='center'
                maxW={{ base: '316px', bp115: '396px' }}
                borderRadius='16px'
                data-test-id={DATA_TEST_ID.SIGN_UP_SUCCESS_MODAL}
            >
                <Image src={registaration} boxSize={{ base: '108px', bp115: '206px' }} my='32px' />
                <Icon
                    as={CloseRoundModule}
                    position='absolute'
                    top={6}
                    right={6}
                    boxSize={6}
                    onClick={onCloseRedirict}
                    data-test-id={DATA_TEST_ID.CLOSE_BUTTON}
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
                        Мы отправили вам на почту{' '}
                        <Text as='span' fontWeight='700'>
                            {email}
                        </Text>{' '}
                        <br />
                        ссылку для верификации.
                    </Text>
                    <Text
                        textAlign='center'
                        pb={8}
                        className={styles.secondMessage}
                        px={{ base: '50px', bp115: '26px' }}
                        color='alpha.600'
                    >
                        Не пришло письмо? Проверьте&nbsp;папку Спам.
                        По&nbsp;другим&nbsp;вопросам&nbsp;свяжитесь{' '}
                        <Link textDecor='underline'>с поддержкой</Link>
                    </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
